<template>
    <a-card :bordered="false" style="overflow-x: scroll;height: calc(100vh - 140px)">
        <img class="bg_img" :src="bgIMg" alt="">
        <span>Welcome To vueVisualization</span>
    </a-card>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import store from '@/store'

export default {
    name: "welcomePage",
    components: {
    },
    data() {
        return {
            bgIMg: require('../../assets/img/welcome/welcome.png')
        };
    },
    computed: {
    },
    created() {
    },
    methods: {
        
    },
};
</script>

<style lang="scss" scoped>
.bg_img{
    margin: 133px auto 0;
    display: block;
}
span{
    display: block;
    font-family: PingFang SC;
    font-style: normal;
    font-weight: 600;
    font-size: 36px;
    line-height: 50px;
    color: #3270F5;
    text-align: center;
    margin: 148px 0 0 0;
}
// 大屏幕（1920px+）
@media all and (min-width: 1920px) {
    .bg_img{
        min-width: 800px;
    }
}
// 中屏幕（1440px～1919px）
@media all and (min-width: 1441px) and (max-width: 1919px) {
    .bg_img{
        max-width: 800px;
        margin: 60px auto 0;
    }
    span{
        margin: 100px 0 0 0;
    }
}
//(1440px以下)
@media all and (max-width: 1440px) {
    .bg_img{
        max-width: 600px;
        margin: 35px auto 0;
    }
    span{
        margin: 70px 0 0 0;
    }
}
</style>
