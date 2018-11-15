import 'reflect-metadata';
import metakeys from './metakeys';
const decorators = {}
metakeys.map(key => {

  decorators[key] = (path) => (target, name, descriptor) => {
    Reflect.defineMetadata(key, {
      path,
      prototype: name,
      method: key
    }, target, name);
  }
})

export default decorators;