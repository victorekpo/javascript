// This library helps you to build neural networks.
// Neural networks are many algorithms that work as one, simply saying. They reflect the behavior of biological neurons that are great at recognizing patterns.

const brain = require('brain.js');
// Build a default neural net
const net = new brain.NeuralNetwork();

// This is where we specify our data: input and the result(output)
// the data is an array of examples(input and output).
// And then the network trains on them.
net.train([
  // we tell it: if "r" from RGB scheme is 0.03, and "g" is 0.7
  // then the output should be "black"
  { input: { r: 0.03, g: 0.7 }, output: { black: 1 } },

  // notice that we skip some values from RGB, in this case we
  // missed "g"
  { input: { r: 0.16, b: 0.2 }, output: { white: 1 } },

  // here we point out all the RGB values
  { input: { r: 0.5, g: 0.5, b: 1.0 }, output: { white: 1 } },
]);

// This is how we run the network to get a prediction
const output = net.run({ r: 1, g: 0.4, b: 0 }); // { white: 0.81, black: 0.18 }
console.log(output);

// https://metacognitive.me/how-to-do-text-classification-with-javascript/