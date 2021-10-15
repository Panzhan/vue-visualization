<template>
    <div class="n_basic_layout">
        <!-- 左侧菜单 -->
        <LSMenu class="l_s_menu"></LSMenu>
        <!-- 顶部路由信息 -->
        <RouterInfo class="router_info"></RouterInfo>
        <!-- 路由出口 -->
        <div class="router_view_container">
            <!-- <keep-alive :include="keepAliveWhiteList">
                <router-view></router-view>
            </keep-alive> -->
            <router-view />
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex";
import { keepAliveWhiteList } from "../config/interceptors/constant";
import LSMenu from './LeftSideMenu'
import RouterInfo from './RouterInfo'
export default {
    name: "BasicLayout",
    components: {
        LSMenu,
        RouterInfo
    },
    data() {
        return {
            keepAliveWhiteList: keepAliveWhiteList
        };
    },
    computed: {
        ...mapState({
            userInfo: (state) => state.base.userInfo,
        }),
    },
    watch: {
    },
    mounted() {
    },
    // 销毁定时器
    beforeDestroy() {
    },
    created() {

    },
    methods: {
        
    },
};
</script>
<style lang='scss' scoped>
.n_basic_layout{
    height: 100%;
    overflow: hidden;
    background: #EFEFF4;
    .l_s_menu{
        float: left;
    }
    .router_info{
        float: top;
        margin-left: 232px;
    }
    .router_view_container{
        // margin: 32px 32px 0 264px; // 路由出口默认配置
        // height: calc(100vh - 136px); // 路由出口默认配置
        padding: 32px; // 路由出口默认配置
        max-height: calc(100% - 76px); // 路由出口默认配置,减去高度为路由信息高度
        overflow-y: scroll;
        overflow-x: hidden;
    }
}
</style>
