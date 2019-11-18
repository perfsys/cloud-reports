import Vue from 'vue'
import Router from 'vue-router'
import filds from './components/form'
import header from './components/header/header';
import report from './components/report';
import test from './components/test';




Vue.use(Router);



const routes = [
    {
        path: '/',
        components: {
            default: filds,
            header,
        }
    },
    {
        path: '/report',
        name:'Developer report',
        components: {
            default: report,
            header,
        }
    },
    {
        path: '/test',
        name: 'test',
        components: {
            default: test,
            header,
        }
    }

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
