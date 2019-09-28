import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue';
import Detalhes from './views/Detalhes.vue';

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes:[
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/detalhes/:videoId',
            name: 'detalhes',
            component: Detalhes
        }
    ]
})
