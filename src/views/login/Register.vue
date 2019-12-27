<template>
  <div class="register-box">
    <div class="register-form">
      <div>
        <el-input
          v-model="username"
          placeholder="请输入手机号或邮箱"
        ></el-input>
      </div>
      <drag-veri @verifySuccess="verifySuccess"></drag-veri>
      <div class="verify-code">
        <el-input placeholder="验证码" v-model="verifyInput"> </el-input>
        <div class="verify-code-show">
          <span v-if="canSendCode == true" class="send-code" @click="getCode"
            >发送短信验证码</span
          >
          <span v-if="canSendCode == false" class="change-count"
            >{{ countDownNums }} s 后再次获取验证码</span
          >
        </div>
      </div>
    </div>
    <div class="next-reg-block">
      <el-button :class="{ active: verifyIs == true }">注册</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import DragVeri from './DragVeri.vue'

@Component({
  components: {
    DragVeri
  }
})
export default class Register extends Vue {
  public username: string = '' //手机号或邮箱
  public verifyIs: boolean = false
  public countDownNums: number = 60 //验证码倒计时
  public canSendCode: boolean = true //是否可以发送验证码
  public timer: any = null //定时器
  public verifyInput: any = '' //输入验证码的框
  public verifySuccess(val: boolean) {
    this.verifyIs = val
  }
  // 点击获取验证码
  public getCode() {
    if (this.canSendCode == true) {
      this.countDown()
      this.canSendCode = false
    }
  }
  // 倒计时方法
  public countDown() {
    this.timer = setInterval(() => {
      if (this.countDownNums > 0) {
        this.countDownNums--
      } else {
        clearInterval(this.timer)
        this.canSendCode = true
        this.countDownNums = 60
      }
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
$orange-color: #ff783c;
.register-box {
  .register-form {
    .el-input {
      margin-bottom: 20px;
      margin-top: 20px;
      ::v-deep .el-input__inner {
        height: 44px;
      }
    }
    .verify-code {
      margin-bottom: 20px;
      position: relative;
      .verify-code-show {
        position: absolute;
        right: 15px;
        z-index: 500;
        cursor: pointer;
        top: 33px;
        font-size: 14px;
        color: #ff783c;
        .send-code {
        }
        .change-count {
          color: #ccc;
        }
      }
    }
  }
  .next-reg-block {
    position: absolute;
    bottom: 30px;
    .el-button {
      width: 344px;
      height: 44px;
      font-size: 16px;
      color: #909499;
      background: #edeeef;
      border: none;
    }
    .el-button.active {
      background: $orange-color;
      color: #fff;
    }
  }
}
</style>
