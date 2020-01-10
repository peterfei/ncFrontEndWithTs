<template>
  <div class="course-notice">
    <span class="notice-new"></span>
    <div v-if="notices != ''">
      <div
        class="noice-con"
        :class="{ active: !index }"
        v-for="(item, index) in notices"
        :key="index"
      >
        <div class="title">
          {{ item.title }}
        </div>
        <div class="noice-content">
          {{ item.content }}
        </div>
        <div class="noice-time">时间：{{ item.created_at }}</div>
      </div>
    </div>
    <div class="no-data" v-else>暂无内容</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({})
export default class CourseNotice extends Vue {
  @Prop({ default: () => ({}) }) notices!: object
}
</script>

<style lang="scss" scoped>
.course-notice {
  width: 860px;
  position: relative;
}
.noice-con {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 5px 10px 0px rgba(230, 230, 230, 1);
  border-radius: 5px;
  padding: 28px;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}
.noice-con .title {
  font-size: 14px;
  color: #4c5258;
  font-weight: bold;
  margin-bottom: 5px;
}
.noice-con .noice-content {
  font-size: 12px;
  color: rgba(76, 82, 88, 1);
  line-height: 22px;
  margin-bottom: 24px;
}
.noice-con .noice-time {
  font-size: 12px;
  color: rgba(182, 186, 191, 1);
  text-align: right;
}
.notice-new {
  background: url('./../../../assets/image/bg/new.png') no-repeat;
  display: inline-block;
  width: 48px;
  height: 48px;
  position: absolute;
}
.no-data {
  width: 100%;
  background: #fff;
  padding: 28px;
  color: #4c5258;
}
</style>
