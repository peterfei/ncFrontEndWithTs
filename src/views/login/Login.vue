<template>
  <div class="login-reg">
    <div class="head">
      <login-head :title="title"></login-head>
      <!-- <span class="title">账号登录</span> -->
    </div>

    <div class="login-box" v-if="loginIs == true">
      <div class="login-form">
        <div>
          <el-input v-model="username" placeholder="手机号/邮箱"></el-input>
        </div>
        <div>
          <el-input v-model="pwd" placeholder="密码"></el-input>
        </div>
        <div class="loginbtn-block">
          <el-button>登录</el-button>
        </div>
      </div>

      <div class="find-pwd-sign">
        <el-col :span="12"
          ><span class="sign" @click="regist">没有账号？立即注册</span></el-col
        >
        <el-col :span="12"
          ><span class="forget" @click="findPwd">忘记密码</span></el-col
        >
      </div>
    </div>
    <div class="register-box" v-if="loginIs == false">
      <register-block></register-block>
    </div>

    <div></div>

    <!-- 第三方登录 -->
    <div class="party-login">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import LoginHead from './LoginHead.vue'
import RegisterBlock from './Register.vue'

@Component({
  components: {
    LoginHead,
    RegisterBlock
  }
})
export default class Login extends Vue {
  public username: string = '' //账号
  public loginIs: boolean = true //判断是登录页还是注册页
  public pwd: string = '' //密码
  public title: string = '账号登录'

  //点击找回密码
  public findPwd() {}

  //点击注册
  public regist() {
    this.title = '账号注册'
    this.loginIs = false
  }
}
</script>

<style lang="scss" scoped>
$orange-color: #ff783c;
.login-reg {
  width: 404px;
  height: 493px;
  margin: 0 auto;
  margin-top: 100px;
  padding: 26px 30px 30px 30px;
  background: #fff;
  position: relative;

  .login-form {
    margin-top: 50px;
    margin-bottom: 15px;
    .el-input {
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
      }
    }
  }
  .find-pwd-sign {
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
</style>
