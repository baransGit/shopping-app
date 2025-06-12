// Proxy for CSS module mocks
module.exports = new Proxy(
  {},
  {
    get: function (target, property) {
      // Return the property name directly
      return property;
    },
  }
);
