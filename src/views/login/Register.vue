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
    </div>
    <div>
      <el-button>注册</el-button>
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
  public verifySuccess(val: boolean) {
    console.log('验证通过！！！=', val)
  }
}
</script>

<style lang="scss" scoped>
$orange-color: #ff783c;
.register-box {
  .register-form {
    .el-input {
      margin-bottom: 20px;
      ::v-deep .el-input__inner {
        height: 44px;
      }
    }
  }
}
</style>
