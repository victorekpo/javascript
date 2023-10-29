const { dockStart } = require('@nlpjs/basic');

const phrase = "US, China Agree to Work on Setting Up Biden, Xi November Meeting";

(async () => {
  const dock = await dockStart();
  const nlp = dock.get('nlp');
  await nlp.train();
  const response = await nlp.process('en', phrase);
  console.log(response);
})();
