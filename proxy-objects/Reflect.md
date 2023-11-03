Reflect is a nice way of intercepting the original target object and running some methods similar to Object.[method];
Reflect is not mandatory, you can access the original object as the first argument in the proxy method arguments as well, i.e. target[property] is the same as Reflect.get(target, property); 
Whatever method you choose, be consistent!
Docs
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect#static_methods

```
const p = new Proxy(
  {},
  {
    deleteProperty(targetObject, property) {
      // Custom functionality: log the deletion
      console.log("Deleting property:", property);

      // Execute the default introspection behavior
      return Reflect.deleteProperty(targetObject, property);
    },
  },
);
```

```
let target;
target={};
Reflect.has(target,'') // false
target={a:1};
Reflect.has(target,'a') // true
target={a:1};
Reflect.has(target,'b') // false
target={a:1};
Reflect.ownKeys(target); // ['a'] similar to Object.keys
target={a:1};
Reflect.set(target, "b", 2); // true // similar to Object.defineProperty
console.log(target) // { a: 1, b: 2 }
```