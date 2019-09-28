import Vue from 'vue'
import App from './App.vue'
import VueTheMask from 'vue-the-mask'
import vueResource from 'vue-resource'
import router from './router'; 
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false
Vue.use(vueResource)
Vue.use(VueTheMask)

new Vue({
  vuetify,
  VueTheMask,
  router,
  vueResource,
  render: h => h(App)
}).$mount('#app')
