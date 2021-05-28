import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import '@/assets/iconfont/iconfont.css'
import _ from 'lodash'
Vue.config.productionTip = false
Vue.prototype._ = _
new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
