const modules = [];
var defaultModuleName = 'app';
var defaultModulePrefix = '$';
var apiMethod = ['use', 'getModules', 'getData'];

function isString(f) {
  return Object.prototype.toString.call(f) === '[object String]';
}

export default class {

  constructor(moduleName, prefix, callback) {
    if (Store.instance === undefined) {
      if (!(this instanceof Store)) return new Store(moduleName);
      if (isString(moduleName)) defaultModuleName = moduleName.trim();
      if (isString(prefix)) defaultModulePrefix = prefix.trim();
      modules.push(defaultModuleName);

      Store.instance = new Vue({
        data() {
          return {
            [defaultModuleName]: {}
          }
        }
      })
    }

    return Store.instance;
  }

}