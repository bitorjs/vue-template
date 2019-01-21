import Application from '@bitores/vue';
import start from './app.vue'
let client = app => {
  // app.watch(require.context('./app', true, /^((?!\/view\/).)+\.(vue|js)$/));
}

new Application().start(client, start); //