<template>
  <div class="materials">
    <!-- type == 0 图文 -->
    <div v-if="type == 0">
      <div class="align-center">{{ title }}</div>
      <div class="materials-content" v-html="content"></div>
    </div>
    <!-- type == 1 文档 -->
    <div class="clearfix" v-if="type == 1">
      <div class="title">{{ JSON.parse(content).title }}</div>
      <el-button type="success" @click="downLoad"
        ><i class="icon iconfont"></i>下载</el-button
      >
    </div>
    <!-- type == 2 链接 -->
    <div v-if="type == 2">{{ content }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import Cloud from '@/api/cloud'
@Component({
  components: {}
})
export default class CourseMaterials extends Vue {
  @Prop({ default: () => ({}) }) chapter!: object
  @Prop({ default: 0 }) type!: number
  @Prop({ default: '' }) title!: string
  @Prop({ default: () => [] }) content!: Array<any>
  @Prop({ default: 0 }) resource_id!: number
  downLoadUrl: string = ''
  //文件下载
  downLoad() {
    Cloud.getDownLoad(this.resource_id).then((res: any) => {
      this.downLoadUrl = res.download_url
      console.log('下载地址', this.downLoadUrl)
      let a = document.createElement('a')
      a.href = this.downLoadUrl
      a.click()
    })
  }
}
</script>

<style scoped>
.materials {
  padding: 50px 70px;
  background: #fff;
}
.align-center {
  text-align: center;
}
.materials-content {
  margin-top: 20px;
  border: 1px solid #eee;
  padding: 10px;
}
.el-button--success {
  background: #40c78d;
  border: 1px solid #40c78d;
  font-size: 12px;
  padding: 8px 10px;
  text-align: center;
  float: right;
  margin-top: 30px;
}
.title {
  font-size: 14px;
  color: #242b33;
}
</style>
