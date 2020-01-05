<template>
  <div class="materials">
    <!-- type == 0 图文 -->
    <div v-if="type == 0">
      <div class="align-center">{{ title }}</div>
      <div class="materials-content" v-html="content"></div>
    </div>
    <!-- type == 1 文档 -->
    <div class="clearfix" v-if="type == 1">
      <el-button type="success"><i class="icon iconfont"></i>下载</el-button>
    </div>
    <!-- type == 2 链接 -->
    <div v-if="type == 2"></div>
  </div>
</template>

<script>
export default {
  name: 'CourseMaterials',
  props: {
    chapter: {},
    type: {},
    title: {},
    content: {}
  },
  data() {
    return {}
  },
  methods: {}
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
</style>
