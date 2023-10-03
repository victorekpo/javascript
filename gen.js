const types = ["credit", "debit"];
const categories = ["Income", "Rent", "Food", "Gas", "Light", "Phone", "Misc"];
const desc = "Test transaction";
const person = "victor001";

const getRandString = (arr) => {
  const max = arr.length;
  const randNum = Math.floor((Math.random() * max) + 0);
  return arr[randNum]
};

a=getRandString(types)
console.log(a)
