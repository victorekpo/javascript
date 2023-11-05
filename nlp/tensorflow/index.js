const tf = require('@tensorflow/tfjs-node');

// need vectorRepresentations

const data = {
  // assume we already have vector representations of the text examples
  inputs: vectorRepresentations,
  // imagine we have such 3 classes
  output: [0, 0, 2, 1, 2, 1, 0, 1],
}

// tensors are TensorFlow vectors to simplify the internal
// processing for the library
const inputTensors = tf.tensor(data.inputs);
const outputTensors = tf.tensor(data.outputs);

const model = tf.sequential();

// 1st layer: a 1d convolutional network
model.add(tf.layers.conv1d({
  filters: 100,
  kernelSize: 3,
  strides: 1,
  activation: 'relu',
  padding: 'valid',
  inputShape: [MAX_WORDS_LENGTH, GLOVE_VECTOR_DIMENSIONS],
}));

// transform 2d input into 1d
model.add(tf.layers.globalMaxPool1d({}));

// the final layer with one neuron
model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));

// here are some tuning, read in the TF docs for more
model.compile({
  optimizer: tf.train.adam(LEARNING_RATE),
  loss: 'binaryCrossentropy',
  metrics: ['accuracy'],
});

// print the model architecture
model.summary();

// train the model
(async () => {
  await model.fit(inputs, answers, {
    // the default size, how many inputs to process per time
    batchSize: 32,

    // how many times to "process", simply put
    epochs: EPOCHS,

    // the fraction of the inputs to be in the validation set:
    // the set, which isn't trained on, but participates in calculating
    // the model's metrics such as accuracy and loss
    validationSplit: 0.2,

    // shuffle inputs randomly to have a different starting seed every time
    shuffle: true,
  });

// save the model to load in the future and run classifications
  await model.save('file://./myModel');
})();
// https://metacognitive.me/how-to-do-text-classification-with-javascript/