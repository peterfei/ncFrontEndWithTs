<template>
  <div class="course-introduction">
    <div class="introduction">
      <div class="title">课程推介</div>
      <div class="course-content">
        {{ intro_remark }}
      </div>
    </div>
    <div class="objectives">
      <div class="title">授课目标</div>
      <div class="course-content">
        {{ target }}
      </div>
    </div>
    <div class="summary">
      <div class="title">课程概述</div>
      <div class="course-content">
        {{ summary }}
      </div>
    </div>
    <div class="data">
      <div class="title">参考资料</div>
      <div class="course-content">
        {{ consult_data }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({})
export default class CourseIntroduction extends Vue {
  @Prop({ default: () => ({}) }) intro_remark!: object // 子组件接收到父组件传过来的对象
  @Prop({ default: () => {} }) target!: Array<object>
  @Prop({ default: () => {} }) summary!: Array<object>
  @Prop({ default: () => {} }) consult_data!: Array<object>
}
</script>

<style lang="scss" scoped>
.course-introduction {
  margin-top: 20px;
  width: 860px;
}
.introduction,
.objectives,
.summary,
.data {
  // box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 5px 10px 0px rgba(230, 230, 230, 1);
  padding: 28px;
  margin-bottom: 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
}
.introduction .title,
.objectives .title,
.summary .title,
.data .title {
  font-size: 14px;
  font-weight: bold;
  color: rgba(76, 82, 88, 1);
  margin-bottom: 6px;
}
.introduction .course-content,
.objectives .course-content,
.summary .course-content,
.data .course-content,
.course-content .courseLi {
  font-size: 12px;
  color: rgba(76, 82, 88, 1);
  line-height: 22px;
}
.course-content ul {
  margin-left: 0px;
  margin-right: 0px;
  padding-left: 0px;
  padding-right: 0px;
}
.course-content .courseLi {
  margin-bottom: 10px;
}
.mt9 {
  margin-top: 9px;
}
.hidden {
  display: none;
}
</style>
