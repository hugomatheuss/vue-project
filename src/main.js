// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import Vuex from 'vuex';
import money from 'v-money'

Vue.use(Vuex);

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.prototype.$urlAPI = 'https://afternoon-atoll-08010.herokuapp.com/api/'

var store = {
  state: {
    user: sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null,
    product: '',
    products:[]
  },
  getters: {
    getUser: state => {
      return state.user;
    },
    getToken: state => {
      return state.user.access_token;
    },
    getProduct: state => {
      return state.product;
    },
    getProducts: state => {
      return state.products;
    }
  },
  mutations: {
    setUser(state, u) {
      state.user = u;
    },
    setProduct(state, p) {
      state.product = p;
    },
    setProducts(state, p) {
      state.products = p;
    },
    deleteProduct(state, id) {
      let index = state.products.findIndex(product => product.id == id);
      state.products.splice(index, 1);
    }
  }
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: new Vuex.Store(store),
  router,
  components: { App },
  template: '<App/>'
})
