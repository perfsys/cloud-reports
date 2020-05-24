import Vue from 'vue';
import Router from 'vue-router';
import header from './components/header/header';
import linkedInReport from './components/linked-in-report/linked-in-report';
import developmentReport from './components/development-report/development-report';
import test from './components/test';


Vue.use(Router);

const routes = [
    {path: '/', redirect: '/development'},
    {
        path: '/linked-in',
        name: 'LinkedIn',
        components: {
            default: linkedInReport,
            header,
        }
    },
    {
        path: '/lead-generation',
        name: 'Lead generation',
        components: {
            default: test,
            header,
        }
    },
    {
        path: '/development',
        name: 'Developer report',
        components: {
            default: developmentReport,
            header,
        }
    },

];

const router = new Router({
    routes,
    path: "/"

    // mode: 'abstract'
});

router.beforeEach((to, from, next) => {
    next()
});

export default router
