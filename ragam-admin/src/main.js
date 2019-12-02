import Vue from 'vue';
import { rtdbPlugin } from 'vuefire';

import Buefy from 'buefy';
import App from './App.vue';
import router from './router';
import { auth } from './firebase';

import 'buefy/dist/buefy.css';

Vue.config.productionTip = false;

Vue.use(rtdbPlugin);
Vue.use(Buefy);

let app = '';
auth.onAuthStateChanged(() => {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      router,
      render: h => h(App),
    }).$mount('#app');
  }
});
