
import { allUserRutes } from './componentConf'

export default  [
    {
        path: '/index',
        name: 'index',
        meta: {
            title: '首页',
            icon: 'home',
        },
        hiddenMenu: true,
        redirect: '/login',
        component: () => import('@/layouts/BasicLayout.vue'),
        children: [
            ...allUserRutes
        ]
    },
    {
        path: '/',
        name: 'empty',
        redirect:'/login',
    },
    {
        path: '/login',
        name: 'login',
        hiddenMenu: true,
        component: () => import('@/views/login')
    },
    {
        path: '*',
        name: '404',
        hiddenMenu: true,
        component: () => import('@/views/error/404.vue')
    },
]