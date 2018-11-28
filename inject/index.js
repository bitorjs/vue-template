import 'reflect-metadata';
import Vue from 'vue'
import decorators from 'bitorjs-decorators';
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

    this.use((ctx) => {
      ctx.params = {};
      let routes = this.match(ctx.url);
      console.log(routes)
      let route = routes[0];
      if (route) {
        ctx.params = route.params;
        route.handle(route.params)
      }
    })
  }

  mountVue() {
    this.store = new Store('app', '$');
    Vue.prototype.store = this.store;
    Vue.prototype.$store = this.store;
    Vue.prototype.$bitor = this;
    this.mountRequest();
  }

  mountRequest() {
    decorators.methods.forEach((method) => {
      this.ctx[method] = Vue.prototype[method] = (url) => {
        let routes = this.match(url, method);
        console.log(routes)
        let route = routes[0];
        if (route && !route.params['0']) {
          return route.handle(route.params)
        } else {
          return null;
        }
      }
    })
  }

  createVueRoot(vueRootComponent, htmlElementId) {

    const innerPage = {
      name: 'webview-container',
      updated() {
        console.log('updated')
        let _innerPage = this.$refs.innerPage;
        let updateProps = _innerPage.$options.updateProps;
        if (updateProps) {
          updateProps.call(_innerPage, this.$root.props)
        }
      },
      render(h) {
        console.log('render')
        let vnode = null;
        if (Object.prototype.toString.call(this.$root.webview) === '[object String]') {
          vnode = h('span', this.$root.webview);
        } else {
          vnode = h(this.$root.webview, {
            props: this.$root.props,
            ref: 'innerPage'
          });
        }
        return vnode;
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

      this.registerRoute(path, {
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