<template>
  <div class="login-box">
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
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component
export default class LoginBox extends Vue {
  public username: string = ''
  public pwd: string = ''

  public regist() {}
  public findPwd() {}

  mounted() {}
}
</script>

<style lang="scss" scoped>
$orange-color: #ff783c;
.login-box {
  .login-form {
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
