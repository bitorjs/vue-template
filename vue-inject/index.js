import 'reflect-metadata';
import Vue from 'vue'
import decorators from './decorators';
import Application from 'bitorjs-application'
import Store from '../../store';

export default class extends Application {
  constructor() {
    super()

    this.mountVue();
    this.createDirectives(this, Vue);

    this.ctx.render = (webview, props) => {
      this.$vue.webview = webview;
      this.$vue.props = props;
      this.$vue.__update = 0;
    }

    this.use((ctx, next) => {
      ctx.params = {};
      let routes = this.$route.match(ctx.url);
      console.log(routes)
      if (routes[0]) {
        console.log(ctx)
        ctx.params = routes[0].params;
        let r = routes[0].handle(routes[0].params)
        console.log(r)
      }
      next()
    }).use(function (ctx, dispatch) {
      console.log('middleware end')
    })
  }

  mountVue() {
    this.store = new Store('app', '$', () => {
      this.$vue.__update += 1;
      console.log(this.$vue.__update)
    });
    Vue.prototype.store = this.store;
    Vue.prototype.$store = this.store;
    Vue.prototype.$bitor = this;
    this.mountRequest();
  }

  mountRequest() {
    decorators.methods.forEach((method) => {
      this.ctx[method] = Vue.prototype[method] = (url) => {
        let routes = this.$route.match(url, method);
        console.log(routes)
        if (routes[0]) {
          return routes[0].handle(routes[0].params)
        }
      }
    })
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

  createDirectives(app, Vue) {

    ['redirect', 'replace', 'reload'].forEach(name => {
      Vue.directive(name, {
        bind(el, binding) {
          if (el.__click_Callback__) el.removeEventListener('click', el.__click_Callback__);
          el.__click_Callback__ = () => {
            const url = el.url;
            switch (name) {
              case 'reload':
                app.reload && app.reload();
                break;
              default:
                app[name](url);
            }
          };
          el.addEventListener('click', el.__click_Callback__);
          el.url = binding.value;
        },
        unbind(el) {
          if (el.__click_Callback__) el.removeEventListener('click', el.__click_Callback__);
          if (el.url) delete el.url;
        },
        update(el, binding) {
          el.url = binding.value;
        },
        componentUpdated(el, binding) {
          el.url = binding.value;
        }
      });
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


  registerController(controller) {
    const instance = new controller(this.ctx)

    decorators.iterator(controller, (prefix, subroute) => {
      let path;
      if (prefix.path && prefix.path.length > 1) { //:   prefix='/'
        subroute.path = subroute.path === '/' ? '(/)?' : subroute.path;
        subroute.path = subroute.path === '*' ? '(.*)' : subroute.path;
        path = `${prefix.path}${subroute.path}`
      } else {
        path = `${subroute.path}`
      }

      this.$route.register(path, {
        method: subroute.method.toLowerCase()
      }, instance[subroute.prototype].bind(instance))
    })
  }

  registerComponent(component) {
    if (!(component instanceof Object)) {
      throw new TypeError('component must be Vue instance')
    }

    Vue.component(component.name, component);
  }

  registerPlugin(plugin) {
    plugin(this);
  }
}