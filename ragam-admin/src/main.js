import Vue from 'vue';
import { rtdbPlugin } from 'vuefire';
import linkify from 'vue-linkify';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faEye,
  faPhoneAlt,
  faChevronDown,
  faAngleRight,
  faAngleLeft,
  faEyeSlash,
  faEdit,
  faTrash,
  faEnvelope,
  faCog,
  faLock,
  faCalendarAlt,
  faChevronUp,
  faTasks,
  faImages,
  faComment,
  faCubes,
  faSearch,
  faExclamationCircle,
  faUpload,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import Buefy from 'buefy';
import App from './App.vue';
import router from './router';
import { auth, analytics } from './firebase';

import 'buefy/dist/buefy.css';

Vue.config.productionTip = false;

library.add(faEye, faChevronDown, faTasks, faImages, faCubes, faSearch,
  faCalendarAlt, faChevronUp, faPhoneAlt, faExclamationCircle, faComment, faAngleRight,
  faAngleLeft, faEyeSlash, faEdit, faTrash, faEnvelope, faCog, faLock, faUpload);

Vue.component('vue-fontawesome', FontAwesomeIcon);

Vue.directive('linkified', linkify);
Vue.use(rtdbPlugin);
Vue.use(Buefy, {
  defaultIconComponent: 'vue-fontawesome',
  defaultIconPack: 'fas',
});

let app = '';
auth.onAuthStateChanged((user) => {
  if (user) {
    analytics.setUserId(user.uid);
    analytics.setUserProperties({ level: 'ADMIN' });
  }
  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      router,
      render: h => h(App),
    }).$mount('#app');
  }
});
