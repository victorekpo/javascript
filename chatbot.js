const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let inputs = [];

function dialogue() {
  rl.question('What\'s on your mind? (Type "exit" to quit): ', (answer) => {
    if (answer.toLowerCase() === 'exit') {
      console.log('Goodbye!');
      rl.close();
      return;
    }

    inputs.push(answer);

    // Check if the user asked if they said something specific
    if (answer.toLowerCase().startsWith('did i say')) {
      const phrase = answer.substring(9).trim(); // Extract the phrase after "did I say"
      if (inputs.includes(phrase)) {
        console.log('Yes, you did say:', phrase);
      } else {
        console.log('No, you did not say:', phrase);
      }
    } else {
      console.log('You said:', answer);
    }

    console.log('Previous inputs:', inputs);

    dialogue(); // Recursive call for next dialogue
  });
}

dialogue(); // Start the dialogue
