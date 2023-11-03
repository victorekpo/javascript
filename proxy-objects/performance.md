Performance Tests

Article # 1
https://bug1172313.bmoattachments.org/attachment.cgi?id=8616443
https://bugzilla.mozilla.org/show_bug.cgi?id=1172313
-Issue closed with speed being okay

Article #2

Recently, I have seen in the react-hook-form implementation, that Bill decided not to use Proxy anymore for the tracking of who watch the state of the form because of performances reasons.

Are the performances so bad? Let’s try to measure the performance cost when retrieving the value of a simple property.

I will use the benchmark library. Here is the script I will run:

const Benchmark = require("benchmark");

const suite = new Benchmark.Suite();

const person = {
firstName: "Bob",
lastName: "TheSponge",
};

const personProxy = new Proxy(person, {});

suite
.add("native", () => {
person.firstName;
})
.add("proxy", () => {
personProxy.firstName;
})
.on("cycle", (event) =>
console.log(event.target.toString())
)
.run({ async: true });
The result is the following one:

Performance result

Of course, the native implementation is faster because it just accesses the property. The proxy implementation is largely slower than the native one. But I think it’s not so bad.

If you search on the internet about, performances of proxy, some people say that it’s a tool for development and should not be used in production. Personally, I think it depends on your use case, the amount of data you want to process with Proxy and the performance you want to have. You can test that with a Proof Of Concept (POC). There are libraries that rely on proxies, which proves that this can be used in production. Let see two of them.

It’s good to note that the “selling point” of react-hook-form is the performance, so it makes sense not to use Proxy.


Real use case
SolidJS
SolidJS is a declarative library to build UI, that relies on fine-grained reactivity. It does not use a virtual DOM (contrary to React). The way of writing the code is quite similar to React:

JSX
Component
state => signal
useEffect => createEffect
useMemo => createMemo
…
But there is no hook rules, you should not destructure your props, every component executes ones then it will execute side effect when a used reactive primitive has changed. It uses Proxy for store which is the equivalent of React reducers. If you don’t know SolidJS, go check it has a promising future.

For example here is a simple Counter component:

import { createSignal } from 'solid-js';

function Counter() {
const [count, setCount] = createSignal(0);
const increment = () => setCount(count() + 1);

return (
<button type="button" onClick={increment}>
{count()}
</button>
);
}

ImmerJS
ImmerJS allows us to create immutable data structures, but giving us the possibility to change its data in a mutable way.

For example, you will be able to do:

import product from "immer";

const person = {
firstName: "Bob",
lastName: "TheSponge",
};

const newPerson = produce(person, (p) => {
p.firstName = "Patrick";
p.lastName = "Star";
});

// Will return false
console.log(newPerson === person);
It’s a convenient way to simplify changes without mutates an object, and without to make a lot of copy.

const person = {
firstName: "Bob",
lastName: "TheSponge",
address: {
type: "pineapple",
city: "Bikini bottom",
},
};

// It prevents us to make things like
const newPerson = {
...person,
address: {
...person.address,
// Note the uppercase
type: "Pineapple",
},
};
Redux Toolkit uses it under the hood to make reducers easier to implement.

Conclusion
Proxy enables a lot of features, thanks to them, you can extract some logic that will be reusable. Some libraries use them to optimize your code execution. For example react-tracked and proxy-memoize that use, proxy-compare under the hood, will reduce your re-render. These libraries are developed by Dai Shi who also made the use-context-selector library that I demystified in the article use-context-selector demystified. But I would recommend you to use them uniquely when it’s necessary.

There is a TC39 proposal to add natively Decorators to javascript, looks promising, which will enable some other possibilities. For example to log / measure performance of function, … in an easy way: with a @Logger or @Performance (with the right implementation behind these annotations).

Source: https://www.romaintrotard.com/posts/proxy-in-js-what-the-hell#other-traps

