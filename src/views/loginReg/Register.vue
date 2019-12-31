<template>
  <div class="register-box">
    <!-- 公共头部 -->
    <login-reg-head :title="boxTitle"></login-reg-head>
    <!-- 输入密码的注册模块 -->
    <div class="register-form-block" v-if="routeType == ''">
      <div>
        <el-input
          v-model="username"
          placeholder="请输入手机号或邮箱"
        ></el-input>
      </div>
      <drag-veri-check @canNext="canNextBoolean"></drag-veri-check>

      <div class="pwd-input-block" v-if="pwdInputBoxShow == true">
        <!-- <el-input :type="pwdType" v-model="pwdInput" ref="pwdInput"></el-input> -->
        <el-input
          @input="pwdChange"
          v-model="pwdInput"
          placeholder="请输入密码"
          show-password
        ></el-input>
      </div>
      <div class="next-reg-block">
        <el-button
          :class="{ active: canNext == true }"
          @click="goChooseCharacter"
          >注册</el-button
        >
      </div>
    </div>

    <div class="character-select-block" v-if="routeType == 'character'">
      <character-choose></character-choose>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import LoginRegHead from './components/LoginRegHead.vue'
import DragVeriCheck from './components/DragVeriCheck.vue'
import CharacterChoose from './components/CharacterChoose.vue'
@Component({
  components: {
    LoginRegHead,
    DragVeriCheck,
    CharacterChoose
  }
})
export default class Register extends Vue {
  public boxTitle: string = '账号注册'
  public username: string = '' //手机号或邮箱
  public routeType: string = '' //页面参数类型
  public canNext: boolean = false //是否可以点击下一步
  public pwdInput: string = '' //密码输入
  public pwdInputBoxShow: boolean = false
  public pwdInputType: string = 'password' //密码输入框默认type
  @Watch('$route', { immediate: true, deep: true })
  // 判断当前页面路由变化
  onUrlChange(to: { name: string; query: { type: string } }) {
    this.routeType = to.query.type
    console.log(this.routeType)
    if (this.routeType == 'findpwd') {
      this.boxTitle = '找回密码'
    } else if (this.routeType == 'setpwd') {
      this.boxTitle = '设置密码'
    } else if (this.routeType == 'character') {
      this.boxTitle = '选择角色'
    } else {
      this.boxTitle = '账号登录'
    }
  }

  // 滑块验证码返回值是否可以进行下一步
  public canNextBoolean(val: boolean) {
    if (val == false) {
      this.pwdInput = ''
    }
    this.pwdInputBoxShow = val
  }
  public pwdChange() {
    this.canNext = this.pwdInput != '' ? true : false
  }

  public goChooseCharacter() {
    this.$router.push({
      path: `/reg/`,
      query: {
        type: 'character'
      }
    })
  }
}
</script>

<style lang="scss" scoped>
$orange-color: #ff783c;
$orangeHoverColor: #ff6520;
.register-box {
  width: 404px;
  height: 493px;
  margin: 0 auto;
  margin-top: 100px;
  padding: 26px 30px 30px 30px;
  background: #fff;
  position: relative;
  .register-form-block {
    .el-input {
      // margin-bottom: 20px;
      // margin-top: 20px;
      ::v-deep .el-input__inner {
        height: 44px;
      }
    }

    .pwd-input-block {
      margin-top: 20px;
      position: relative;
      ::v-deep .el-input__suffix-inner {
        position: relative;
        top: 2px;
        right: 5px;
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
      cursor: not-allowed;
    }
    .el-button.active {
      background: $orange-color;
      color: #fff;
      cursor: pointer;
      &:hover {
        background: $orangeHoverColor;
      }
    }
  }
}
</style>
