import Vue from 'vue';
import App from '@/App.vue';
import '@/plugins/vue-leaflet';
import '@/plugins/base';
import '@/plugins/vee-validate';
import '@/plugins/axiosApi';
import '@/plugins/socket';
import '@/plugins/vuesax';
import '@/plugins/vue-kinesis';
import vuetify from '@/plugins/vuetify';
import i18n from '@/plugins/i18n';
import store from '@/store';// /!\ Call after plugins/axiosApi /!\
import router from '@/router';
import qs from 'qs';
import moment from 'vue-moment';
import VuePageTransition from 'vue-page-transition';
//import '@mdi/font/css/materialdesignicons.css'
//import vuescroll from 'vuescroll';

Vue.config.productionTip = false;
Vue.prototype.$appName = 'IT RPG SOFTWARE'

Vue.use(qs.stringify); // querystringify
Vue.use(moment);
Vue.use(VuePageTransition);
//Vue.use(vuescroll);

export const bus = new Vue();

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')