import classloader from './.classloader';
import C from './app/controllers/index'
import VueApplication from './vue-inject';
import A from './app/controllers/demo';
import D from './vue-inject/decorators';

import ClientA from './plugins/pluginA/app'

let client = app => {
  app.registerPlugin(ClientA);
  app.on('ready', () => {
    const ctrls = classloader['controllers'];
    for (const key in ctrls) {
      if (ctrls.hasOwnProperty(key)) {
        const c = ctrls[key];
        app.registerController(c);
      }
    }
  })
}

new VueApplication().start(client);