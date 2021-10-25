<template>
  <div class="preview_container">
    <div class="login_left">
      <img class="img_icon" :src="ss_icon" alt="" />
      <img class="img_text" :src="ss_text" alt="" />
    </div>
    <div class="login_right">
      <div class="new_login">
        <p class="top_title">运营管理后台</p>
        <div class="ipt_boxs">
          <div class="first_box com_box">
            <a-input
              @pressEnter="pressEnterLogin"
              @change="e => valTrim(e)"
              v-model.trim="username"
              class="ipt_com"
              placeholder="用户名"
            />
          </div>
          <div class="second_box com_box">
            <a-input
              autoComplete="off"
              @pressEnter="pressEnterLogin"
              @change="e => valTrim(e)"
              :type="pawdtype"
              v-model.trim="password"
              class="ipt_com"
              placeholder="密码"
            />
            <span @click="isShow()"
              ><img class="icon" :src="pwdImg" alt=""
            /></span>
          </div>
        </div>
        <div
          @click="handleLogin()"
          class="not_login_btn"
          :class="isLogin ? 'login_btn' : ''"
        >
          Log In
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import { Api } from "@/api";
export default {
  //组件名字
  name: "preview",
  props: {},
  components: {},
  computed: {
    ...mapState({
      userInfo: (state) => state.base.userInfo,
    }),
    isLogin() {
      return this.username.length && this.password.length;
    },
  },
  // vue数据集中管理
  data() {
    return {
      username_msg: "",
      password_msg: "",
      username: "", //admin
      password: "", //123abc
      seeImg: require("../../assets/img/passwd/see.png"),
      notSeeImg: require("../../assets/img/passwd/not_see.png"),
      pawdtype: "",
      pwdImg: "text",
      ss_icon: require("../../assets/img/ss_icon.png"),
      ss_text: require("../../assets/img/ss_text.png"),
    };
  },
  //函数写这里
  methods: {
    ...mapMutations("base", ["setUserInfo"]),
    valTrim(e){
        e.target.value = e.target.value.trim();
        return e
    },
    isShow(val) {
      (this.pawdtype = this.pawdtype === "password" ? "text" : "password"),
        (this.pwdImg =
          this.pawdtype === "password" ? this.notSeeImg : this.seeImg);
    },
    pressEnterLogin() {
      if (!this.username.length) {
        return false;
      }
      if (!this.password.length) {
        return false;
      }
      this.handleLogin();
    },
    handleLogin() {
      if (!this.username) {
        this.username_msg = "请输入正确账户名";
        return;
      }
      if (!this.password) {
        this.password_msg = "请输入正确密码";
        return;
      }
      let params = {
        username: this.username,
        password: this.password,
      };
      Api.login(params)
        .then((res) => {
          if (res && Object.keys(res).length) {
            const userInfo = JSON.parse(JSON.stringify(res));
            localStorage.setItem(
              // 海外项目运营后台用户信息标识
              "vueVisualization",
              JSON.stringify({ ...userInfo })
            );
            this.setUserInfo({ ...userInfo });
            this.$router.push({ path: "/welcome/index" });
          }
        })
        .catch((err) => {
        });
    },
  },
  watch: {},

  created() {
    this.pwdImg = this.seeImg;
    let _ = this;
    if (_.userInfo && _.userInfo.token) {
      let path = "/welcome/index";
      _.$router.push(path);
      return;
    }
  },
  //过滤器
  filters: {},
  //页面渲染之后
  mounted() {},
  beforeDestroy() {},
};
</script>


<style lang="scss" scoped>
.preview_container {
  display: flex;
  height: 100%;
  position: relative;
  .login_left {
    min-width: 544px;
    background: #e5e5e5;
    position: relative;
    .img_icon {
      width: 103px;
      height: 74px;
      position: absolute;
      top: 70px;
      left: 10%;
      transform: translate(-10%, 0);
    }
    .img_text {
      width: 444px;
      height: 152px;
      position: absolute;
      bottom: 100px;
      left: 50%;
      transform: translate(-50%, 0);
    }
  }
  .login_right {
    width: 100%;
  }
  .new_login {
    // width: 368px;
    // height: 273px;
    position: absolute;
    top: 37%;
    left: 60%;
    transform: translate(-60%, -37%);
    .top_title {
      font-size: 36px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #000000;
      margin-bottom: 0;
    }
    .ipt_boxs {
      .com_box {
        .ipt_com {
          width: 300px;
          height: 45px;
          box-sizing: border-box;
          border-radius: 5px;
          margin-bottom: 16px;
        }
        p {
          color: red;
        }
      }
      .first_box {
        margin-top: 60px;
      }
      .second_box {
        position: relative;
        .icon {
          width: 14px;
          height: 14px;
          cursor: pointer;
          position: absolute;
          top: 40%;
          right: 15px;
          transform: translate(0, -50%);
        }
      }
    }
    .not_login_btn {
      width: 300px;
      height: 45px;
      font-size: 14px;
      font-weight: 400;
      color: #ffffff;
      line-height: 45px;
      text-align: center;
      background: rgba(50, 112, 245, 0.5);
      box-shadow: 0px 2px 6px rgba(50, 112, 245, 0.45);
      border-radius: 4px;
      font-family: PingFangSC-Semibold, PingFang SC;
      pointer-events: none;
      margin-top: 64px;
    }
    .login_btn {
      pointer-events: auto;
      cursor: pointer;
      background: #3270f5;
    }
  }
}
</style>