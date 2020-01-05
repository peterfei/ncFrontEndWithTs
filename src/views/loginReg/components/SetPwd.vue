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

    <div class="submit-block">
      <el-button>确定</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import LoginRegHead from './components/LoginRegHead.vue'
@Component
export default class SetPwd extends Vue {
  public pwdInput: string = '' //输入密码
  public pwdInputAgain: string = '' //再次输入密码
}
</script>

<style lang="scss" scoped>
$orange-color: #ff783c;
$orangeHoverColor: #ff6520;
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
      color: #fff;
      border: none;
      height: 44px;
      width: 100%;
      background: $orange-color;
      &:hover {
        background: $orangeHoverColor;
      }
    }
  }
}
</style>
