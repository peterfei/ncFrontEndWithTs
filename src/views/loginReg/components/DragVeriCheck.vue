<template>
  <div>
    <drag-veri @verifySuccess="verifySuccess"></drag-veri>
    <div class="verify-code" v-if="verifyBoxIsShow == true">
      <el-input placeholder="验证码" v-model="verifyInput" @input="codeChange">
      </el-input>
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
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import DragVeri from './DragVeri.vue'

@Component({
  components: {
    DragVeri
  }
})
export default class DragVeriCheck extends Vue {
  public countDownNums: number = 60 //验证码倒计时
  public pwdInput: string = '' //密码输入
  public pwdInputType: string = 'password' //密码输入框默认type
  public verifyInput: any = '' //输入验证码的框
  public canSendCode: boolean = true //是否可以发送验证码
  public timer: any = null //定时器
  public verifyBoxIsShow: boolean = false //是否显示验证码框
  public canNext: boolean = false //是否可以下一步

  public verifySuccess(val: boolean) {
    this.verifyBoxIsShow = val
    // this.$emit('dragVeriCheck', this.verifyIs)
  }

  // 点击获取验证码
  public getCode() {
    if (this.canSendCode == true) {
      this.countDown()
      this.canSendCode = false
      // this.canNext = true
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

  public codeChange() {
    console.log('变了', this.pwdInput)
    this.canNext = this.verifyInput != '' ? true : false
    this.$emit('canNext', this.canNext)
  }
}
</script>

<style lang="scss" scoped>
$orange-color: #ffbd9f;
.drag {
  margin-bottom: 20px;
  margin-top: 20px;
}
.verify-code {
  margin-bottom: 20px;
  position: relative;
  ::v-deep .el-input__inner {
    height: 44px;
  }
  .verify-code-show {
    position: absolute;
    right: 15px;
    z-index: 500;
    cursor: pointer;
    top: 13px;
    font-size: 14px;
    color: #ff783c;
    .send-code {
    }
    .change-count {
      color: #ccc;
    }
  }
}
</style>
