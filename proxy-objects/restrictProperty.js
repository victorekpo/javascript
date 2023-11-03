const data = {};

const newProxy = new Proxy(data, {
  set: function (target, key, value) {
    if (key === "current") {
      Reflect.set(target, key, value);
      return true;
    }
    throw new Error('not found');
  }
});

newProxy.current = 1;
newProxy.point = 1; // Throws error