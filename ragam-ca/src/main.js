import Vue from 'vue';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/analytics';
import { rtdbPlugin } from 'vuefire';
import VueClipboard from 'vue-clipboard2';

import App from './App.vue';
import router from './router';

Vue.config.productionTip = false;


firebase.initializeApp({
  apiKey: 'AIzaSyDRTSjI8HDXiLQSCOu2cY4j-ZVdFisqow8',
  authDomain: 'ragam-ca.firebaseapp.com',
  databaseURL: 'https://ragam-ca.firebaseio.com',
  projectId: 'ragam-ca',
  storageBucket: 'ragam-ca.appspot.com',
  messagingSenderId: '432438280307',
  appId: '1:432438280307:web:1a4a8bad9a917a83abea06',
  measurementId: 'G-5FQNLKVSS4',
});
firebase.analytics();

Vue.use(rtdbPlugin);
Vue.use(VueClipboard);

let app = '';
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      router,
      render: h => h(App),
    }).$mount('#app');
  }
});
