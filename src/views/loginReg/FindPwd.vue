<template>
  <div class="login-box">
    <login-reg-head :title="boxTitle"></login-reg-head>

    <!-- 找回密码模块 -->
    <div class="find-pwd-block" v-if="step == 1">
      <div>
        <el-input
          v-model="usernameInput"
          placeholder="请输入手机号或邮箱"
        ></el-input>
      </div>
      <drag-veri-check @canNext="nextPage"></drag-veri-check>
      <div class="nextPage">
        <el-button :class="{ active: this.veryCheck == true }" @click="goSetPwd"
          >下一步</el-button
        >
      </div>
    </div>

    <!-- 设置密码模块 -->
    <div class="set-pwd-block" v-if="step == 2">
      <set-pwd @complete="completePwd"></set-pwd>
    </div>

    <div class="complete-block" v-if="step == 3">
      <complete></complete>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import LoginRegHead from './components/LoginRegHead.vue'
import DragVeriCheck from './components/DragVeriCheck.vue'
import SetPwd from './components/SetPwd.vue'
import Complete from './components/completeResPwd.vue'

@Component({
  components: {
    LoginRegHead,
    DragVeriCheck,
    SetPwd,
    Complete
  }
})
export default class Login extends Vue {
  public boxTitle: string = '找回密码'
  public usernameInput: string = '' //账号
  public pwdInput: string = '' //密码
  public step: number = 1 //页面步骤
  public veryCheck: boolean = false
  mounted() {}

  // 是否可以点击下一步
  nextPage(val: any) {
    this.veryCheck = val
  }

  // 完成重置密码
  completePwd(val: any) {
    if (val != false) {
      this.step++
    }
  }

  // 点击去设置密码
  public goSetPwd() {
    this.step++
  }
}
</script>

<style lang="scss" scoped>
$orange-color: #ff783c;
$orangeHoverColor: #ff6520;
$inputBackground: #f7f9fa;
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
        background: $inputBackground;
        border: 1px solid #e3e6e8;
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
