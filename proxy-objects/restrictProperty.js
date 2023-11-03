const data = {};

const newProxy = new Proxy(data, {
  set: function (target, key, value) {
    if (key === "current") {
      Reflect.set(target, key, value);
      return true;
    }
     console.error('not found');
     return false;
  }
});

newProxy.current = 1;
newProxy.point = 1; // Throws error
console.log(newProxy.current);
console.log(newProxy.point);