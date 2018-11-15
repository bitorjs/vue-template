import 'reflect-metadata';
import Vue from 'vue'
import metakeys from './metakeys';
import Application from '../../application/Application'
// import client from '../app';

class VueApplication extends Application {
  constructor() {
    super()


    this.ctx.render = (webview, props) => {
      this.$vue.webview = webview;
      this.$vue.props = props;
    }

    this.use((ctx, next) => {
      let routes = this.$route.match(ctx.url);
      console.log(routes)
      if (routes[0]) {
        routes[0].handle()
      }
      next()
    }).use(function (ctx, dispatch) {
      console.log('middleware end')
    })

    // this.registerPlugin(client);
  }

  mountVue() {
    Vue.prototype.$bitor = this;
  }

  createVueRoot(vueRootComponent, htmlElementId) {

    const innerPage = {
      name: 'webview-container',
      render(h) {
        if (Object.prototype.toString.call(this.$root.webview) === '[object String]') {
          return h('span', this.$root.webview);
        }
        return h(this.$root.webview, {
          props: this.$root.props
        });
      }
    }

    Vue.component(innerPage.name, innerPage);

    return new Vue({
      el: htmlElementId,
      data() {
        return {
          webview: null,
          props: null
        }
      },
      render: h => h(vueRootComponent ? vueRootComponent : innerPage)
    })
  }

  start(client, htmlElementId, vueRootComponent) {
    htmlElementId = htmlElementId || '#root';
    this.registerPlugin(client)
    this.emit('ready');
    this.$vue = this.createVueRoot(vueRootComponent, htmlElementId)
    this.startServer()
    this.emit('after-server');
  }


  registerRoutes(classname) {
    const c = new classname(this.ctx)
    let routes = {};
    const prefix = Reflect.getMetadata('namespace', classname) || '';

    const ownPropertyNames = Object.getOwnPropertyNames(classname['prototype']);
    ownPropertyNames.forEach(propertyName => {
      metakeys.reduce((ret, cur) => {
        let subroute = Reflect.getMetadata(cur, classname['prototype'], propertyName);
        if (subroute) {
          let path;

          if (prefix.path && prefix.path.length > 1) { //:   prefix='/'
            subroute.path = subroute.path === '/' ? '(/)?' : subroute.path;
            subroute.path = subroute.path === '*' ? '(.*)' : subroute.path;
            path = `${prefix.path}${subroute.path}`
          } else {
            path = `${subroute.path}`
          }

          this.$route.register(path, {
            method: subroute.method.toLowerCase(),
            // end: subroute.path !== '/'
          }, c[subroute.prototype].bind(c))
        }
      }, '')
    })
  }

  registerController(controller) {
    this.registerRoutes(controller)
  }

  registerComponent(component) {
    if (!(component instanceof Object)) {
      throw new TypeError('component must be Vue instance')
    }

    Vue.component(component.name, component);
  }

  registerDirective(name, option) {
    Vue.directive(name, option)
  }

  registerPlugin(plugin) {
    plugin(this);
  }
}

// new VueApplication().start()

export default VueApplication;