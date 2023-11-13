const { dockStart } = require('@nlpjs/basic');

const phrase = "US Senate votes to ban Russian energy imports over the Ukraine invasion, sends ban back to House.";

(async () => {
  const dock = await dockStart();
  const nlp = dock.get('nlp');
  await nlp.train();
  const response = await nlp.process('en', phrase);
  console.log(response);
})();
