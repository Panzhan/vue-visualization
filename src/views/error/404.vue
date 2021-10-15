<template>
    <div class="err_page">
        <div class="content">  
            <div>
                <img class="first" :src="notFoundImg" alt="">
            </div> 
            <div class="right">
                <img class="com_img second" :src="textImgL" alt="">
                <img class="com_img third" :src="textImgS" alt=""><br>
                <a-button style="width: 100px;height: 50px" type="primary" @click="pushHome"
                    >返回首页</a-button
                >
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "error",
    data(){
        return {
            notFoundImg: require('../../assets/img/404/not_fond_img.png'),
            textImgL: require('../../assets/img/404/textL.png'),
            textImgS: require('../../assets/img/404/textS.png')
        }
    },
    methods: {
        pushHome() {
            this.$router.push({ path: "/welcome/index" });
        },
    },
};
</script>
<style lang="scss">
.err_page {
    height: 100%;
    padding: auto;
    position: relative;
    .content{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        .right{
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-left: 20px;
        }
    }
}
@media all and (min-width: 1920px) {
    .first{
        min-width: 153px;
        min-height: 173px;
    }
    .second{
        min-width: 720px;
        min-height: 67px;
    }
    .third{
        min-width: 576px;
        min-height: 34px;
    }
    .com_img{
        margin: 40px 0;
    }
}
// 中屏幕（1440px～1919px）
@media all and (min-width: 1441px) and (max-width: 1919px) {
    .first{
        max-width: 153px;
        max-height: 173px;
    }
    .second{
        min-width: 720px;
        min-height: 67px;
    }
    .third{
        min-width: 576px;
        min-height: 34px;
    }
    .com_img{
        margin: 20px 0;
    }
}
//(1440px以下)
@media all and (max-width: 1440px) {
    .first{
        max-width: 100px
    }
    .second{
        max-width: 720px;
        max-height: 67px;
    }
    .third{
        max-width: 576px;
        max-height: 34px;
    }
    .com_img{
        margin: 10px 0;
    }
}
</style>