<template>
    <div class="router_info">
        <span class="top_text">
            <span class="click_router" @click.stop="handleGoToFaPath()" v-if="faTitle">{{faTitle}}</span>
            <span v-if="chiTitle"><span> > </span>{{chiTitle}}</span>
            <span v-if="!faTitle && !chiTitle">{{activeRouterTitle}}</span>
        </span>
    </div>
</template>

<script>
import Mixin from '@/utils/mixin'
export default {
    name: "RouterInfo",
    data() {
        return {
            faTitle: this.activeRouterTitle,
            faPath: '',
            chiTitle: '',
            chiPath: '',
        }
    },
    mixins: [Mixin],
    created(){
        console.log('permissions',this.permissions)
        console.log('pagePermissions',this.pagePermissions)
    },
    watch:{
        routePath: {
            handler(nl, ol) {
                this.faTitle = ''
                this.faPath = ''
                this.chiTitle = ''
                this.chiPath = ''
                if(nl){
                    this.getFaByPath(nl)
                }
            },
            immediate: true
        },
    },
    computed: {
    },
    methods: {
        handleGoToFaPath(){
            if(!this.chiTitle || !this.chiPath) return
            this.$router.push(this.faPath);
        },
        // 过滤path上的参数
        filterPathQuery(path){
            if(path.indexOf('?') !== -1){
                return path.split('?')[0]
            }
            return path
        },
        getFaByPath(val){
            this.menuList.forEach(faItem => {
                faItem.children && faItem.children.length && faItem.children.forEach(chiItem=>{
                    // 一级页面
                    if(chiItem.path == val){
                        this.faTitle = chiItem.name
                        this.faPath = chiItem.path
                    }else{
                        chiItem.children && chiItem.children.length && chiItem.children.forEach(graItem=>{
                            // 二级隐藏页面
                            if(graItem.path == this.filterPathQuery(val)){
                                this.faTitle = chiItem.name
                                this.faPath = chiItem.path
                                this.chiTitle = graItem.name
                                this.chiPath = graItem.path
                            }
                        })
                    }
                })
            });
        }
    },
};
</script>
<style lang="scss" scoped>
.router_info{
    position: relative;
    border: 1px solid red;
    width: 100%;
    height: 76px;
    border: 1px solid #E5E5EA;
    line-height: 76px;
    background: #FFFFFF;
    .top_text{
        font-size: 18px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #007AFF;
        margin-left: 35px;
        &::before {
            position: absolute;
            width: 3px;
            height: 16px;
            content: "";
            top: 30px;
            left: 23px;
            background: #007AFF;
        }
        .click_router{
            cursor: pointer;
        }
    }
}
</style>