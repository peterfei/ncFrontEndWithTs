<template>
  <div class="login-box">
    <login-reg-head :title="boxTitle"></login-reg-head>
    <!-- 登录模块 -->
    <div class="login-form-block" v-if="routeType === undefined">
      <div class="login-form">
        <div>
          <el-input
            v-model="usernameInput"
            placeholder="手机号/邮箱"
          ></el-input>
        </div>
        <div>
          <el-input v-model="pwdInput" placeholder="密码"></el-input>
        </div>
        <div class="loginbtn-block">
          <el-button>登录</el-button>
        </div>
      </div>

      <div class="find-pwd-sign el-row">
        <el-col :span="12"
          ><span class="sign" @click="regist">没有账号？立即注册</span></el-col
        >
        <el-col :span="12"
          ><span class="forget" @click="findPwd">忘记密码</span></el-col
        >
      </div>
    </div>
    <!-- 找回密码模块 -->
    <div class="find-pwd-block" v-if="routeType == 'findpwd'">
      <div>
        <el-input
          v-model="usernameInput"
          placeholder="请输入手机号或邮箱"
        ></el-input>
      </div>
      <drag-veri-check></drag-veri-check>
      <div class="nextPage">
        <el-button class="active" @click="goSetPwd">下一步</el-button>
      </div>
    </div>

    <!-- 设置密码模块 -->
    <div class="set-pwd-block" v-if="routeType == 'setpwd'">
      <set-pwd></set-pwd>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import LoginRegHead from './components/LoginRegHead.vue'
import DragVeriCheck from './components/DragVeriCheck.vue'
import SetPwd from './components/SetPwd.vue'

@Component({
  components: {
    LoginRegHead,
    DragVeriCheck,
    SetPwd
  }
})
export default class Login extends Vue {
  public boxTitle: string = '账号登录'
  public usernameInput: string = '' //账号
  public pwdInput: string = '' //密码
  public routeType: string = '' //
  public pageType: string = '' //页面加载模块
  mounted() {}

  @Watch('$route', { immediate: true, deep: true })
  // 判断当前页面是登录进入还是注册进入
  onUrlChange(to: { name: string; query: { type: string } }) {
    this.routeType = to.query.type
    console.log(this.routeType)
    if (this.routeType == 'findpwd') {
      this.boxTitle = '找回密码'
    } else if (this.routeType == 'setpwd') {
      this.boxTitle = '设置密码'
    } else {
      this.boxTitle = '账号登录'
    }
  }
  // 点击立即注册
  public regist() {
    this.$router.push({
      path: `/reg/`,
      query: {
        type: ''
      }
    })
  }
  // 点击找回密码
  public findPwd() {
    this.$router.push({
      path: `/login/`,
      query: {
        type: 'findpwd'
      }
    })
  }
  // 点击去设置密码
  public goSetPwd() {
    this.$router.push({
      path: `/login/`,
      query: {
        type: 'setpwd'
      }
    })
  }
}
</script>

<style lang="scss" scoped>
$orange-color: #ff783c;
$orangeHoverColor: #ff6520;
$gray: #edeeef;
.login-box {
  width: 404px;
  height: 493px;
  margin: 0 auto;
  margin-top: 100px;
  padding: 26px 30px 30px 30px;
  background: #fff;
  position: relative;
  .login-form-block {
    margin-top: 50px;
    margin-bottom: 15px;
    ::v-deep .el-input__inner {
      margin-bottom: 20px;
      height: 44px;
    }
    .loginbtn-block {
      .el-button {
        background: $orange-color;
        width: 100%;
        color: #fff;
        font-size: 16px;
        height: 44px;
        border: none;
      }
    }
    .find-pwd-sign {
      margin-top: 15px;
      span {
        font-size: 14px;
        color: #909499;
        display: inline-block;
        width: 100%;
        cursor: pointer;
        &:hover {
          color: $orange-color;
          transition: 0.4s;
        }
      }
      span.sign {
        text-align: left;
      }
      span.forget {
        text-align: right;
      }
    }
  }

  .find-pwd-block {
    ::v-deep .el-input {
      .el-input__inner {
        height: 44px;
      }
    }
    .nextPage {
      position: absolute;
      bottom: 30px;
      width: 343px;
      ::v-deep .el-button {
        width: 100%;
        background: $gray;
        cursor: not-allowed;
        border: none;
        color: #909499;
        height: 44px;
        &:hover {
          color: #909499;
        }
      }
      .el-button.active {
        background: $orange-color;
        color: #fff;
        cursor: pointer;
        &:hover {
          transition: 0.4s;
          background: $orangeHoverColor;
        }
      }
    }
  }
}
</style>
