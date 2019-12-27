<template>
  <el-image
    :src="cSrc"
    v-bind="$attrs"
    v-on="$listeners"
    :style="cStyle"
  ></el-image>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'

@Component({
  name: 'IbdImage'
})
export default class Image extends Vue {
  @Prop({ type: [String, Number] }) width: string | number
  @Prop({ type: [String, Number] }) height: string | number
  @Prop({ type: String, default: '' }) src: string

  get cStyle() {
    if (!this.width && !this.height) {
      return {}
    }
    const reg = /^\d+$/
    const width = reg.test(this.width.toString())
      ? this.width + 'px'
      : this.width
    const height = reg.test(this.height.toString())
      ? this.height + 'px'
      : this.height
    return { width, height }
  }

  // 后期根据图片域名及组件宽度和高度自适应添加压缩参数
  get cSrc() {
    return this.src
  }
}
</script>

<style lang="scss" scoped></style>
