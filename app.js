import "normalize.css";
import VueApplication from './vue-inject';
import classloader from './.classloader';
import Start from './app/view/start';


let client = app => {
  app.on('ready', () => {
    // 自动注入 controller
    const ctrls = classloader['controllers'];
    for (const key in ctrls) {
      if (ctrls.hasOwnProperty(key)) {
        const c = ctrls[key];
        app.registerController(c);
      }
    }

    // 自动注入 全局组件
    const comps = classloader['components'];
    for (const key in comps) {
      if (comps.hasOwnProperty(key)) {
        const c = comps[key];
        app.registerComponent(c);
      }
    }



  })
}

// new VueApplication().start(client);
// or
new VueApplication().start(client, null, Start);