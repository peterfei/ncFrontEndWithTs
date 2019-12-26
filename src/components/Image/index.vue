<template>
  <el-image :src="cSrc" v-bind="$attrs" v-on="$listeners"></el-image>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'

@Component({
  name: 'IbdImage'
})
export default class Image extends Vue {
  @Prop({ type: String, default: '' }) src: string

  // 后期根据图片域名及组件宽度和高度自适应添加压缩参数
  get cSrc() {
    return this.src
  }
}
</script>

<style lang="scss" scoped></style>
