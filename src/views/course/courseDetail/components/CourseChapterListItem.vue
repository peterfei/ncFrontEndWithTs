<template>
  <div class="course-chapter-list-item">
  <el-card class="box-card" :body-style="boxStyle">
    <div class="course-list-content">
      <div slot="header" class="clearfix">
        <div class="chapter-title">{{chapterName}}</div>
        <div class="chapter-text">{{chapterDescription}}
        </div>
      </div>
        <slot></slot>
    </div>
  </el-card>
  </div>
</template>


<script>
export default {
  props: {
    listItem: {},
    chapterName: {

    },
    chapterDescription: {

    },
    listindex: {

    },
  },
  data() {
    return {
      boxStyle: {
        padding: '0',
      },
    };
  },
  components: {},
};
</script>


<style lang="scss" scoped>
.course-chapter-list-item{
  margin-bottom: 10px;
}
.course-list-content {
  width: 840px;
  padding: 30px;

  border-radius: 10px;
  .chapter-title {
    font-size: 16px;
    color: $dark-black;
    margin-bottom: 15px;
    font-weight: bold;
  }
  .chapter-text {
    color: $dusky-black;
    font-size: 12px;
    margin-bottom: 20px;
    line-height: 22px;
  }
}

// 重写覆盖样式
.el-card__body{
  padding: 0;
  width: 840px;
}
.box-card{
  width: 840px;
  border-radius: 10px;
}
</style>
