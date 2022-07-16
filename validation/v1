const schema = {
  name: value => /^([A-Z][a-z\-]* )+[A-Z][a-z\-]*( \w+\.?)?$/.test(value),
  age: value => parseInt(value) === Number(value) && value >= 18,
  phone: value => /^(\+?\d{1,2}-)?\d{3}-\d{3}-\d{4}$/.test(value)
};

schema.name.required = true;
schema.age.required = true;

let info = {
  // name: 'John Doe',
  age: '',
  phone: '123-456-7890'
};

const validate = (object, schema) => Object
  .entries(schema)
  .map(([key, validate]) => [
    key,
    !validate.required || (key in object),
    validate(object[key])
  ])
  .filter(([_, ...tests]) => !tests.every(Boolean))
  .map(([key, invalid]) => new Error(`${key} is ${invalid ? 'invalid' : 'required'}.`));

const errors = validate(info, schema);

if (errors.length > 0) {
  for (const { message } of errors) {
    console.log(message);
  }
} else {
  console.log('info is valid');
}
