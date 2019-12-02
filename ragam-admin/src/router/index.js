import Vue from 'vue';
import VueRouter from 'vue-router';

import { auth } from '../firebase';

import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import VerifyCA from '@/views/VerifyCA.vue';
import Tasks from '../views/Tasks.vue';
import Feedback from '../views/Feedback.vue';
import CAList from '../views/CAList.vue';
import Posters from '../views/Posters.vue';
import Config from '../views/Config.vue';
import Leaderboard from '../views/Leaderboard.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    redirect: '/login',
  },
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/verify/:id',
    name: 'VerifyCA',
    component: VerifyCA,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/tasks',
    name: 'Tasks',
    component: Tasks,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/config',
    name: 'Config',
    component: Config,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/feedback',
    name: 'Feedback',
    component: Feedback,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/list',
    name: 'CAList',
    component: CAList,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/leaderboard',
    name: 'Leaderboard',
    component: Leaderboard,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/posters',
    name: 'Posters',
    component: Posters,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  const { currentUser } = auth;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('login');
  else if (!requiresAuth && currentUser) next('home');
  else next();
});

export default router;
