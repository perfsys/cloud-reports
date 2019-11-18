import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuelidate from "vuelidate";
import Antd from 'ant-design-vue';
import BootstrapVue from 'bootstrap-vue';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import 'ant-design-vue/dist/antd.css';


Vue.use(Vuelidate);
Vue.use(Antd);
Vue.use(BootstrapVue);


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
