import "normalize.css";
import VueApplication from './vue-inject';
import classloader from './.classloader';
import Start from './app/view/start';

import axios from 'axios';

function mountAxios(app) {
  // axios.defaults.baseURL = 'https://api.example.com';
  // axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
  // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  // 添加一个请求拦截器
  axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

  // 添加一个响应拦截器
  axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });

  app.axios = axios.create();
}


let client = app => {
  mountAxios(app);
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