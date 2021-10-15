import Vue from 'vue';
import Router from 'vue-router';
import Routes from '@/routes';
import store from "@/store";
import {
    ROUTER_DEFAULT_CONFIG
} from '@/config';

Vue.use(Router);

const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

let createRouter = () => new Router({
    ...ROUTER_DEFAULT_CONFIG,
    routes: Routes,
    scrollBehavior: () => ({
        y: 0
    }),
    mode: 'history',
});

const router = createRouter();
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher
}

// 免token可进入的页面
const whiteList = ["/", "/login", '/404',];

router.beforeEach((to, from, next) => {
    if (whiteList.indexOf(to.fullPath) !== -1) {
        next();
        return
    }
    store.commit("setRouteTitle", to.name);
    store.commit("setRoutePath", to.fullPath);
    store.getters["base/getUserInfo"]
    if((store.getters["base/getUserInfo"] || {}).token){
        store
            .dispatch("base/getMenuList")
            .then((res)=>{
                const userPath = store.getters["pagePermissions"]
                // 新增欢迎页
                userPath.push('/welcome/index')
                setTimeout(()=>{
                    let isPush = userPath.some((it)=>{
                        return to.fullPath.split('?')[0] == it
                    })
                    if(isPush){
                        next()
                    }else{
                        next('/404')
                        return
                    }
                })
            })
    }else{
        // localStorage 信息被清除
        store.commit("clearState");
        if (whiteList.indexOf(to.fullPath) !== -1) {
            // 免token可进入的页面
            next();
        }else{
            // 跳转至登陆页面
            next("/login")
        }
    }
})
export default router;
