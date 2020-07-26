import Vue from "vue";
import App from "./App.vue";
import VueAxios from "vue-axios";
import Carousel3d from 'vue-carousel-3d';
Vue.use(Carousel3d)
import axios from "axios";
//import('~vue-ionicons/ionicons.scss')
import AllIosIcon from 'vue-ionicons/dist/ionicons-ios.js'
Vue.use(AllIosIcon)

import routes from "./routes";
import VueRouter from "vue-router";

import { PopoverPlugin } from 'bootstrap-vue'
Vue.use(PopoverPlugin)


Vue.use(VueRouter);
const router = new VueRouter({
  routes,
});

import Vuelidate from "vuelidate";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import {
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
  JumbotronPlugin,
  CarouselPlugin,
  IconsPlugin,
  VBHoverPlugin,
} from "bootstrap-vue";
[
  FormGroupPlugin,
  FormPlugin,
  FormInputPlugin,
  ButtonPlugin,
  CardPlugin,
  NavbarPlugin,
  FormSelectPlugin,
  AlertPlugin,
  ToastPlugin,
  LayoutPlugin,
  JumbotronPlugin,
  CarouselPlugin,
  IconsPlugin,
  VBHoverPlugin,

].forEach((x) => Vue.use(x));
Vue.use(Vuelidate);

import VueCookies from 'vue-cookies';
Vue.use(VueCookies)
// Vue.$cookies.config(60 * 60 * 24 ,'')



axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);
// sent cookie to server
// axios.defaults.withCredentials = true;
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

const shared_data = {
  username: localStorage.username,
  lastSearch: localStorage.lastSearch,
  login(username) {
    localStorage.setItem("username", username);
    this.username = username;
    console.log("login", this.username);
  },
  async logout() {
    console.log("logout");
    localStorage.removeItem("username");
    localStorage.removeItem("lastSearch");
    this.username = undefined;
    this.lastSearch = undefined;
    localStorage.removeItem('vuex');
  },
  search(searchResult){
    localStorage.setItem("lastSearch", JSON.stringify(searchResult));
    this.lastSearch = JSON.stringify(searchResult);
  }
};
// console.log(shared_data);
// Vue.prototype.$root.store = shared_data;

new Vue({
  router,
  data() {
    return {
      store: shared_data,
    };
  },
  methods: {
    toast(title, content, variant = null, append = false) {
      this.$bvToast.toast(`${content}`, {
        title: `${title}`,
        toaster: "b-toaster-top-center",
        variant: variant,
        solid: true,
        appendToast: append,
        autoHideDelay: 3000,
      });
    },
  },
  render: (h) => h(App),
}).$mount("#app");
