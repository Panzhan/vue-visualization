<template>
    <div class="fo-box" :is="currentComponent">
        <Preview></Preview>
    </div>
</template>

<script>
import Preview from "./preview";
export default {
    name: 'login',
    data() {
        return {
            currentComponent: Preview,
        };
    },
    components: { Preview },
    mounted() {
        this.currentComponent = Preview;
    },
};
</script>


<style lang="scss" scoped>
html,
body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    background: #fff;

    a {
        text-decoration: none;
    }
}

.hidden {
    height: 100%;
    overflow: hidden;
}

.black {
    width: 100%;
    height: 1080px;
    background: #232323;
    padding-top: 70px;
}
.nav {
    width: 100%;
    height: 70px;
    border-bottom: 1px solid #505050;
    padding: 0 60px;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 5;
    @include flex(flex, space-between, center, no-wrap);
    .about {
        @include flex(flex, flex-start, center);
        height: 100%;
        .ul {
            height: 100%;
            list-style: none;
            @include flex(flex, flex-start);
            margin: 0;
            font-size: 16px;
            li {
                height: 100%;
                margin-left: 70px;
                @include flex(flex, center, center);
                a {
                    color: white;
                    font-weight: bold;
                    font-family: Poppins-Regular;
                }
            }
        }
        .login {
            width: 68px;
            height: 40px;
            outline: none;
            border: none;
            margin-left: 100px;
            font-family: Poppins-Bold;
            color: #232322;
            cursor: pointer;
        }
        .user-info {
            margin-left: 100px;
            height: 100%;
            @include flex(flex, flex-start, center);
            img {
                width: 30px;
                height: 30px;
            }
            span {
                color: #fff;
                margin-left: 10px;
                font-size: 14px;
            }
        }
        .dowanload {
            position: relative;
            .qrcode {
                display: none;
            }
            &.active {
                .qrcode {
                    display: block;
                    position: absolute;
                    width: 180px;
                    height: 180px;
                    left: 50%;
                    bottom: -180px;
                    transform: translateX(-50%);
                    img {
                        display: block;
                        width: 100%;
                    }
                }
            }
        }
    }
    &.scroll {
        background: rgb(255, 255, 255);
        border-bottom: 1px solid #e6e6e6;
        .about {
            .ul {
                li {
                    a {
                        color: #232323;
                    }
                }
            }
            .user-info {
                span {
                    color: #232323;
                }
            }
        }
        .login {
            background: #232323;
            color: #fff;
        }
    }
}

.first-title {
    width: 967px;
    height: 82px;
    font-family: Poppins-Bold;
    margin: 100px auto 48px;
    font-size: 50px;
    line-height: 70px;
    text-align: center;
    color: white;
}
.first-text {
    width: 1200px;
    height: 72px;
    font-family: Poppins-Regular;
    font-size: 26px;
    line-height: 36px;
    margin: 0 auto;
    text-align: center;
    color: #fff;
    span {
        padding: 0 30px;
    }
}
.banner {
    position: relative;
    margin: 20px auto 0;
    width: 1200px;
    .pc {
        display: block;
        //  width: 960px;
        // height: 480px;
        margin: 0 auto;
        box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.3);
    }
    .video {
        position: absolute;
        width: 366px;
        height: 220px;
        top: 246px;
        left: 0;
        z-index: 2;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
    }
    .phone {
        position: absolute;
        width: 194px;
        height: 420px;
        right: 20px;
        top: 146px;
        z-index: 2;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
    }
}
#detail {
    width: 100%;
    height: 850px;
    background: #f0f0f0;
    .detail-content {
        width: 1200px;
        margin: 0 auto;
        position: relative;
    }
    .number {
        width: 1100px;
        height: 180px;
        position: absolute;
        top: -90px;
        left: 50px;
        background: white;
        margin: 0 auto;
        z-index: 2;
    }
    .sec-number {
        display: flex;
        padding-top: 50px;
        justify-content: space-evenly;
        align-items: center;
        .txt {
            font-weight: bold;
            font-family: Poppins-Bold;
        }
    }
    .bold {
        font-family: Poppins-Bold;
        text-align: center;
        width: 160px;
        height: 59px;
        font-size: 36px;
        line-height: 54px;
        margin: 0;
        color: #232323;
    }
    .second {
        width: 207px;
    }
    p {
        text-align: center;
        font-size: 18px;
        line-height: 27px;
        font-family: Poppins-Regular;
        color: #232323;
    }
    .paint {
        display: block;
        position: absolute;
        width: 530px;
        height: 400px;
        top: 150px;
        left: 70px;
    }

    .sbs {
        position: absolute;
        width: 540px;
        height: 400px;
        padding: 60px 50px 0;
        top: 180px;
        right: 0;
        background: #232323;

        .sbs-title {
            //   width: 360px;
            //   height: 86px;
            font-family: Poppins-Bold;
            font-size: 26px;
            line-height: 39px;
            color: #fff;
            margin-bottom: 20px;
        }
        .sbs-text {
            width: 412px;
            height: 192px;
            font-family: Poppins-Regular;
            p {
                font-size: 16px;
                line-height: 24px;
                color: #fff;
                text-align: left;
                font-style: normal;
                margin: 0;
                padding-left: 28px;
                position: relative;
                box-sizing: border-box;
                &::before {
                    content: "";
                    width: 8px;
                    height: 8px;
                    border-radius: 4px;
                    background: #fff;
                    position: absolute;
                    left: 0;
                    top: 7px;
                }
            }
        }
    }
    .green {
        position: absolute;
        width: 330px;
        height: 190px;
        background: #46becd;
        top: 550px;
        left: 85px;
        padding: 32px 30px 0;
        font-size: 16px;
        // img{
        //   display: block;
        // }
        .green-tit {
            font-family: Poppins-Bold;

            width: 119px;
            height: 43px;
            font-size: 26px;
            color: #fff;
            margin: 10px 0 0px 14px;
        }
        .green-text {
            width: 230px;
            height: 78px;
            font-family: Poppins-Regular;
            margin: 10px 0 0 45px;
            color: #fff;
        }
    }
    .green-img {
        vertical-align: top;
    }
    .green-sec {
        position: absolute;
        width: 330px;
        height: 190px;
        background: #46becd;
        top: 550px;
        left: 435px;
        padding: 32px 30px 0;
        font-size: 16px;
        .green-tit {
            font-family: Poppins-Bold;

            width: 122px;
            height: 43px;
            font-size: 26px;
            color: #fff;
            margin: 0 0 0px 14px;
        }
        .green-text {
            width: 230px;
            height: 78px;
            font-family: Poppins-Regular;
            margin: 10px 0 0 45px;
            color: #fff;
        }
    }
    .green-thr {
        position: absolute;
        width: 330px;
        height: 190px;
        background: #46becd;
        top: 550px;
        left: 785px;
        padding: 32px 30px 0;
        font-size: 16px;
        // img{
        //   display: block;
        // }
        .green-tit {
            font-family: Poppins-Bold;
            width: 134px;
            height: 43px;
            font-size: 26px;
            color: #fff;
            margin: 10px 0 0px 14px;
        }
        .green-text {
            width: 230px;
            height: 78px;
            font-family: Poppins-Regular;
            margin: 10px 0 0 45px;
            color: #fff;
        }
    }
}
.green-tit {
    height: auto !important;
    line-height: 32px;
    margin: 0 0 0 12px !important;
    display: inline-block;
}
.step {
    width: 100%;
    height: 738px;
    background: #fff;
    box-sizing: border-box;
    padding-top: 110px;

    .step-title {
        font-family: Poppins-Bold;
        font-size: 40px;
        line-height: 60px;
        text-align: center;
        margin: 0 auto 72px;
        color: #232323;
    }
    .step-photo {
        @include flex(flex, flex-start, center);
        width: 1160px;
        margin: 0 auto;
    }
    .arrow {
        display: inline-block;
        width: 0px;
        height: 0px;
        border-top: 20px solid transparent;
        border-bottom: 20px solid transparent;
        border-left: 40px solid #000;
        margin: 0 30px 150px;
        // margin-top: 80px;
    }
    .photo-title {
        font-family: Poppins-Bold;
        font-size: 26px;
        text-align: center;
        line-height: 43px;
        color: #000;
        margin-top: 28px;
        margin-bottom: 14px;
    }
    .com {
        width: 300px;
        text-align: center;
    }
    .photo-text {
        font-size: 16px;
        line-height: 26px;
        color: #000;
        font-weight: normal;
        font-family: Arial, Helvetica, sans-serif;
    }
}
.icon {
    width: 100%;
    height: 780px;
    background: #f5f5f5;
    .icon-title {
        font-family: Poppins-Bold;
        font-size: 40px;
        line-height: 60px;
        text-align: center;
        padding-top: 120px;
        margin-bottom: 60px;
        color: #232323;
    }
    .brand {
        display: flex;
        justify-content: space-between;
        width: 1200px;
        margin: 0 auto 34px;
    }
    .second-icon {
        display: flex;
        justify-content: space-between;
        width: 1106px;
        margin: 0 auto 8px;
    }
    .third-icon {
        display: flex;
        justify-content: space-between;
        width: 1106px;
        margin: 0 auto;
    }
}
.join {
    width: 100%;
    height: 432px;
    background: #fff;
    box-sizing: border-box;
    padding-top: 110px;

    .join-title {
        font-family: Poppins-Bold;
        font-size: 36px;
        text-align: center;
        width: 1000px;
        // height: 118px;
        margin: 0 auto 64px;
        line-height: 54px;
        color: #232323;
    }
    .joinus {
        display: block;
        font-family: Poppins-Bold;
        width: 260px;
        height: 70px;
        font-size: 20px;
        line-height: 30px;
        text-align: center;
        background: #232323;
        color: #fff;
        margin: 0 auto;
        outline: none;
    }
}
#contact {
    width: 100%;
    background: #232323;
    padding-top: 90px;
    overflow: hidden;
}
.contact-title {
    width: 232px;
    height: 66px;
    font-family: Poppins-Bold;
    color: #fff;
    font-size: 40px;
    margin: 0 auto 36px;
    text-align: center;
}
.code {
    width: 180px;
    height: 180px;
    margin: 0 auto 60px;
    img {
        display: block;
        width: 100%;
    }
}
.address {
    font-size: 16px;
    color: #fff;
    text-align: center;
    line-height: 22px;
    margin-bottom: 80px;
    font-family: PingFang SC;
    div,
    a {
        font-weight: normal !important;
    }

    img {
        width: 18px;
        height: 18px;
    }
}
.email {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 145px;
    img {
        display: inline-table;
        margin-right: 30px;
    }
    span {
        display: inline-table;
        font-family: Poppins-Bold;
        font-size: 26px;
        line-height: 39px;
        color: #fff;
    }
}
.bottom {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;

    li {
        span {
            text-decoration: none;
            font-family: Poppins-Regular;
            font-size: 18px;
            line-height: 27px;
            color: white;
            cursor: pointer;
        }
        &.bottom-logo {
            margin-left: 180px;
            margin-top: -10px;
        }
        &.inc {
            text-decoration: none;
            font-family: Poppins-Regular;
            font-size: 18px;
            line-height: 27px;
            color: white;
        }
    }
}

.mask {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 10;
    background-color: #000000;
    opacity: 0.6;
}
// 内容层 z-index要比遮罩大，否则会被遮盖
.videomasks {
    max-width: 1200px;
    position: fixed;
    left: 50%;
    top: 50%;
    z-index: 20;
    transform: translate(-50%, -50%);
}
.videomasks video {
    width: 100%;
    height: 100%;
}
</style>