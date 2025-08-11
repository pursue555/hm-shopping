import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/utils/vant-ui'
import '@/styles/common.less'
import { Toast, Dialog } from 'vant'
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false
Vue.prototype.$toast = Toast

Vue.use(Dialog)
Vue.use(VueLazyload, {})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
