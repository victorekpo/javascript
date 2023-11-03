// Create a simple logger object
const logger = {
  log: (level, message) => {
    console.log(`[${level}]: ${message}`);
  },
  error: (message) => {
    logger.log('ERROR', message);
  },
  name: "Logger is my name"
};

// Create a proxy for the logger
const loggerProxy = new Proxy(logger, {
  get: function (target, property) {
    // Intercept method access (get) and customize behavior
    if (property in target && typeof Reflect.get(target,property) === 'function') { // more Reflect methods for scalability https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect#static_methods
      // console.log("TARGET", target); // the object itself
      // console.log("PROPERTY", property); // the property / attribute / method being accessed
      // console.log("MAP", target[property]) // the value of the property / attribute / method being accessed
      return (...args) => {
        target.log(property.toUpperCase(), ...args);
      };
    } else if (property in target && typeof target[property] !== 'function') {
      // console.log("HIT ELSE IF 1 CASE")
      return Reflect.get(target,property);
    } else if (!(property in target)) {
      // console.log("HIT ELSE IF 2 CASE")
      return () => {
        target.log('ERROR', `Method "${property}" does not exist.`);
      };
    }
  },
});

// Using the logger proxy
loggerProxy.log('info', 'This is an info message');
loggerProxy.error('This is an error message');
loggerProxy.unknownMethod('This is an example of an unknown method');
console.log(loggerProxy.name);