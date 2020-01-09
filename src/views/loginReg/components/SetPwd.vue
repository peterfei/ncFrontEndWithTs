<template>
  <div class="set-pwd-box">
    <div>
      <el-input
        placeholder="请输入密码"
        v-model="pwdInput"
        type="password"
      ></el-input>
    </div>
    <div>
      <el-input
        placeholder="请再次输入密码"
        v-model="pwdInputAgain"
        type="password"
      ></el-input>
    </div>
    <div class="tip" v-if="!checkSame">两次密码不一致</div>

    <div class="submit-block">
      <el-button @click="completeSet" :class="{ active: checkSame }"
        >确定</el-button
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator'
import LoginRegHead from './components/LoginRegHead.vue'
@Component
export default class SetPwd extends Vue {
  public pwdInput: string = '' //输入密码
  public pwdInputAgain: string = '' //再次输入密码

  // 判断两次密码是否相同
  get checkSame() {
    return this.pwdInputAgain == this.pwdInput
  }

  // 点击确定
  @Emit('complete')
  completeSet() {
    return this.checkSame
  }
}
</script>

<style lang="scss" scoped>
$orange-color: #ff783c;
$orangeHoverColor: #ff6520;
$notAllow: #edeeef;
.set-pwd-box {
  div {
    ::v-deep .el-input__inner {
      height: 44px;
      margin-bottom: 20px;
    }
  }
  .submit-block {
    position: absolute;
    width: 344px;
    bottom: 30px;
    .el-button {
      color: #909499;
      border: none;
      height: 44px;
      width: 100%;
      background: $notAllow;
      cursor: not-allowed;
    }
    .el-button.active {
      background: $orange-color;
      color: #fff;
      cursor: pointer;
      &:hover {
        background: $orangeHoverColor;
        color: #fff;
      }
    }
  }
  .tip {
    font-size: 13px;
    color: #e03333;
  }
}
</style>
