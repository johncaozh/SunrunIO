// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import elementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueLazyload from 'vue-lazyload'
import array from './config/array'
import iconFont from '../dist/iconfont.css'
import filter from './config/filter'
import commonCss from '../dist/css/common.css'
import cardCss from '../dist/css/card.css'
import sessionStore from "./config/sessionStore"

Vue.config.productionTip = false
Vue.use(elementUI);
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '../static/img/broken-image.png',
  loading: '../static/img/loading-image.svg',
  attempt: 3
})

router.beforeEach(function (to, from, next) {
  if (to.path.indexOf("/manager/") !== -1) {
    if (!sessionStore.getLogonUser()) {
      next("/login");
      return;
    }
  }

  next();
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
