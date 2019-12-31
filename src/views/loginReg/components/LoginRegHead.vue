<template>
  <div class="login-head">
    <div class="head">
      <span class="title">
        {{ title }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component
export default class LoginHead extends Vue {
  @Prop({ default: '' }) title: string
}
</script>

<style lang="scss" scoped>
$orange-color: #ff783c;
.login-head {
  .head {
    border-radius: 1px;
    border-bottom: 1px solid #dfe2e5;
    padding-bottom: 17px;
    margin-bottom: 55px;
    .title {
      font-size: 16px;
      font-family: MicrosoftYaHei;
      line-height: 19px;
      color: #303133;
      opacity: 1;
    }
  }
}
</style>
