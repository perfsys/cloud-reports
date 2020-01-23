import Vue from 'vue'
import Router from 'vue-router'
import header from './components/header/header';
import marketingReport from './components/marketing-report/marketing-report'
import developmentReport from './components/development-report/development-report';
import test from './components/test';


Vue.use(Router);

const routes = [
    {path: '/', redirect: '/marketing'},
    {
        path: '/marketing',
        name: 'Marketing',
        components: {
            default: marketingReport,
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
