<template>
    <div class="left_side_menu" style="width: 232px">
        <!-- <a-button
            type="primary"
            style="margin-bottom: 16px"
            @click="toggleCollapsed"
        >
            <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
        </a-button> -->
        <UserInfo></UserInfo>
        <a-menu
            :default-selected-keys="[current]"
            :default-open-keys="[current]"
            :selected-keys="[current]"
            :mode="mode"
            :theme="theme"
            @click="handleClick"
        >
            <template v-for="(item, index) in menuListTree">
                <a-sub-menu :key="item.key">
                    <span slot="title">
                        <MenuIcon :menuPath="index"></MenuIcon>
                    <span>{{item.name}}</span></span>
                    <template v-for="itemChild in item.children">
                        <a-menu-item 
                            style="margin-left: 14px" 
                            @click="handleGoTo(itemChild)" 
                            :key="itemChild.id"
                        > {{itemChild.name}} </a-menu-item>
                    </template>
                </a-sub-menu>
            </template>
        </a-menu>
        <LogOut class="logout"></LogOut>
    </div>
</template>

<script>
import UserInfo from './UserInfo'
import LogOut from './LogOut'
import MenuIcon from './MenuIcon.vue'
import { mapState, mapGetters, mapMutations } from "vuex";
import store from '@/store'
import { menuList, ICONIDMAP } from './config/index'
export default {
    name: "LeftSideMenu",
    props:{
        theme: {
            type: String,
            default: 'light'
        },
        mode: {
            type: String,
            default: 'inline'
        },
    },
    components: {
        UserInfo,
        LogOut,
        MenuIcon
    },
    computed: {
        routePath: ()=>{
            return store.state.routePath
        },
        // 接口返回菜单列表
        ...mapState('base', ['menuList', 'allMenuList']),
        menuListTree(){
            //menuList 后端过滤后菜单
            //allMenuList 后端全菜单
            //menuListConf 本地配置菜单
            return this.menuList
        }
    },
    created(){
        this.setCurrent(this.routePath, this.menuListTree)
    },
    data() {
        return {
            collapsed: false,
            menuListConf: menuList,
            ICONIDMAP: ICONIDMAP,
            current: '',
        }
    },
    methods: {
        // 页面刷新 保证选中状态
        setCurrent(value, arr){
            arr.forEach((item,index)=>{
                arr[index].children.forEach(element => {
                    if(element.path == value){
                        this.current = element.id
                    }
                });
            })
        },
        handleGoTo(val){
            this.$router.push(val.path);
        },
        toggleCollapsed() {
            this.collapsed = !this.collapsed;
        },
        handleClick(e) {
            this.current = e.key;
        },
    },
};
</script>
<style lang="scss" scoped>
.left_side_menu{
    position: relative;
    height: 100%;
    overflow-y:scroll;
    overflow-x: hidden;
    background: #fff;
    padding-bottom: 160px;
    .menu_title{
        margin-left: 16px;
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(255, 255, 255, 0.6);
        align-self: center;
    }
    .logout{
        width: 232px;
        height: 160px;
        position: fixed;
        bottom: 0;
        padding-top: 60px;
        background: #FFFFFF;
    }
}
.ant-menu.ant-menu-inline .ant-menu-item-selected, .ant-menu-submenu-popup.ant-menu-inline .ant-menu-item-selected {
    background: rgba(50, 112, 245, 0.1);
    border-right: 20px solid #3270f5;
}
</style>