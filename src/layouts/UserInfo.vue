<template>
    <div v-if="Object.keys(localUserInfo).length" class="user_info">
        <img class="img_box" :src="localUserInfo.headimgurl" alt="">
        <span class="wel_text">Hello，{{localUserInfo.realname}}</span>
        <div class="user_type">
            {{localUserInfo.name}}
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
    name: "UserInfo",
    computed:{
        ...mapState({
            userInfo: state => state.base.userInfo
        }),
        localUserInfo(){
            if(!Object.keys(this.userInfo).length){
                const localUserInfo = JSON.parse(localStorage.getItem('vueVisualization'))
                return localUserInfo
            }
            return this.userInfo
        }
    },
    data() {
        return {}
    },
    created(){},
    methods: {},
};
</script>
<style lang="scss" scoped>
.user_info{
    height: auto;
    width: 232px;
    background: #fff;
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
    .img_box{
        width: 36px;
        height: 36px;
        border: 1px solid rgb(207, 207, 207);
        display: block;
        margin: 24px auto 8px;
        border-radius: 50%;
    }
    .wel_text{
        text-align: center;
        display: block;
        font-family: PingFang SC;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
    }
    .user_type{
        width:fit-content;
        width:-webkit-fit-content;
        width:-moz-fit-content;
        padding: 1px 5px;
        color: #3270F5;
        margin: 7px auto;
        background: rgba(50, 112, 245, 0.03);
        border: 1px solid rgba(50, 112, 245, 0.5);
        box-sizing: border-box;
        border-radius: 2px;
        font-family: PingFang SC;
        font-style: normal;
        font-weight: 600;
        font-size: 12px;
    }
}
</style>