<template>
  <div class="profile-box">
    <!-- 公共头部 -->
    <login-reg-head :title="titles[step]"></login-reg-head>

    <!-- 温馨提示模块 -->
    <div class="tips" v-if="step == 0">
      <tip-complete @next="goUploadStep"></tip-complete>
    </div>
    <!-- 选择角色模块 -->
    <div class="character-select-block" v-if="step == 1">
      <character-choose
        v-model="userRole"
        @next="goUploadStep"
      ></character-choose>
      <!-- @change="userRole = $event" -->
    </div>
    <!-- 上传资料模块 -->
    <div class="upload-info-block" v-if="step == 2">
      <upload-info
        v-model="userProfileUrl"
        @prev="goUploadStep"
        @next="goUploadStep"
      ></upload-info>
    </div>

    <!-- 注册成功模块 -->
    <div class="reg-complete-block" v-if="step == 3">
      <complete-file></complete-file>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import LoginRegHead from './components/LoginRegHead.vue'
import CharacterChoose from './components/CharacterChoose.vue'
import UploadInfo from './components/uploadInfo.vue'
import completeFile from './components/completeFile.vue'
import tipComplete from './components/tipComplete.vue'

@Component({
  components: {
    LoginRegHead,
    CharacterChoose,
    UploadInfo,
    completeFile,
    tipComplete
  }
})
export default class Register extends Vue {
  public userRole: number = 0 //选择角色
  public boxTitle: string = '温馨提示'
  public userProfileUrl: string = '' //上传图片地址
  public canNext: boolean = false //是否可以点击下一步
  public step: number = 0 //第几个页面
  public userName: string = '' //用户真实姓名
  public titles: string[] = ['温馨提示', '选择角色', '上传资料', '完善资料']

  mounted() {
    // this.changeTitle()
  }

  // userRoleSet(val: number) {
  //   this.userRole = val
  // }

  // 页面跳转
  goUploadStep(obj: any) {
    if (obj.stepStatus == 'next') {
      this.step++
      this.userName = obj.userName
    } else {
      this.step--
    }
    // this.changeTitle()
  }

  // 页面标题改变
  // changeTitle() {
  //   if (this.step === 0) {
  //     this.boxTitle = '温馨提示'
  //   } else if (this.step === 1) {
  //     this.boxTitle = '选择角色'
  //   } else if (this.step === 2) {
  //     this.boxTitle = '上传资料'
  //   } else if (this.step === 3) {
  //     this.boxTitle = '完善资料'
  //   }
  // }

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
.profile-box {
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
