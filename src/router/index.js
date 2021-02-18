import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/add-recepie/:id?',
    name: 'AddRecepie',
    component: () => import(/* webpackChunkName: "add-recepie" */ '../views/AddRecepie.vue'),
  },
  {
    path: '/edit-recepie/:id?',
    name: 'EditRecepie',
    component: () => import(/* webpackChunkName: "edit-recepie" */ '../views/EditRecepie.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
