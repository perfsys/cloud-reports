import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuelidate from "vuelidate";
import Antd from 'ant-design-vue';
import BootstrapVue from 'bootstrap-vue';
import VueLogger from 'vuejs-logger';
import axios from './axios'
import VueAxios from 'vue-axios'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faMinus, faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import 'ant-design-vue/dist/antd.css';
import 'vue-search-select/dist/VueSearchSelect.css'

library.add(faPlus)
library.add(faMinus)
library.add(faCheck)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(Vuelidate);
Vue.use(Antd);
Vue.use(BootstrapVue);

const options = {
    isEnabled: true,
    logLevel : process.env.NODE_ENV === 'production' ? 'error' : 'debug',
    stringifyArguments : false,
    showLogLevel : true,
    showMethodName : true,
    separator: '|',
    showConsoleColors: true
};

Vue.use(VueLogger, options);
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
