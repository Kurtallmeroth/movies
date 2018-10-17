import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/index';
import Vuetify from 'vuetify';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueMoment from 'vue-moment';
import VueNumeric from 'vue-numeric';

Vue.use(Vuetify);
Vue.use(Router);
Vue.use(VueAxios, axios);
Vue.use(VueMoment);
Vue.use(VueNumeric);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
    },
  ],
});
