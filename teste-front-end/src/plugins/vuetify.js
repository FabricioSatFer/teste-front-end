import Vue from 'vue';
import Vuetify, {
  VCard,
  VRating,
  VToolbar,
}  from 'vuetify/lib';
import '@mdi/font/css/materialdesignicons.css'
import { Ripple } from 'vuetify/lib/directives'

Vue.use(Vuetify, {
  components: {
    VCard,
    VRating,
    VToolbar,
  },
  directives: {
    Ripple,
  },
});

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
});
