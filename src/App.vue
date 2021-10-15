<template>
    <a-config-provider :locale="locale">
        <div id="app">
            <router-view />
        </div>
    </a-config-provider>
</template>

<script>
// 使用中文 test2
import zhCN from "ant-design-vue/lib/locale-provider/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";

if (window.addEventListener) {
    window.addEventListener(
        "resize",
        function () {
            setHtmlFontSize();
        },
        false
    );
}
function setHtmlFontSize() {
    var deviceWidth;
    //  1366是设计稿的宽度，当大于1366时采用1366宽度，比例也是除以13.66 //
    deviceWidth =
        document.documentElement.clientWidth > 1366
            ? 1366
            : document.documentElement.clientWidth;
    document.getElementsByTagName("html")[0].style.cssText =
        "font-size:" + deviceWidth / 13.66 + "px !important";
}
export default {
    name: "app",
    data() {
        return {
            locale: zhCN,
        };
    },
    created() {
        setHtmlFontSize();
        this.bindEvent();
    },
    methods: {
        bindEvent() {
            // level success' | 'error' | 'info' | 'warning' | 'warn' | 'loading'
            window.GLOBAL.vbus.$on("message", (level, content, onClose) => {
                const message = this.$message;
                message[level](content, onClose);
            });
            // 在接口统一处理用到
            window.GLOBAL.vbus.$on("router", (router) => {
                this.$router.push(router);
            });
        },
    },
};
</script>
<style  lang="scss" >
// @import "./assets/font/font.css";
</style>
