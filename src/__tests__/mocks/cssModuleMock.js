// CSS modül mockları için proxy
const cssModuleMock = new Proxy(
  {},
  {
    get: function (target, key) {
      if (key === "__esModule") {
        return true;
      }
      // Özellik adını direkt olarak döndürüyoruz
      return key;
    },
  }
);

module.exports = cssModuleMock;
