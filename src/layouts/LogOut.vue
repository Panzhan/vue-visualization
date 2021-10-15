<template>
    <div class="logout">
        <div @click="handleLogout" class="btn">退出登录</div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import store from '@/store'
export default {
    name: "LogOut",
    props:{
        userInfo: Object
    },
    data() {
        return {
        }
    },
    computed: {
    },
    methods: {
        handleLogout(){
            store.commit('clearState')
            localStorage.removeItem('vueVisualization')
            this.$router.push('/login')
        }
    },
};
</script>
<style lang="scss" scoped>
.logout{
    .btn{
        width: 104px;
        height: 36px;
        border: 1px solid #FF4D4F;
        box-sizing: border-box;
        border-radius: 24px;
        margin: 0 auto;
        text-align: center;
        line-height: 36px;
        font-family: PingFang SC;
        font-style: normal;
        font-weight: 600;
        font-size: 14px;
        color: #FF4D4F;
    }
}
</style>