const arr = [1,2,3,4];

const arrProxy = new Proxy(arr, {
  get: function (target, key) {
    if (typeof key === "string" && key.includes(":")) {
      let [start, end] = key.split(":");
      if (start === "") {
        start = 0;
      } else if (end === "") {
        end = target.length;
      } else {
        start = parseInt(start, 10);
        end = parseInt(end, 10);
      }
      return target.slice(Number(start),Number(end));
      // return Reflect.apply(Array.prototype.slice, target, [start, end]);
    }
    return Reflect.get(target, key);
  }
});

console.log(arrProxy["1:3"]) // [2,3]