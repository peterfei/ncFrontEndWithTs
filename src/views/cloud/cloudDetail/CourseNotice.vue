<template>
  <div class="courseNotice">
    <span class="notice-new"></span>
    <div
      class="noiceContent"
      :class="{ active: !index }"
      v-for="(item, index) in notices"
      :key="index"
    >
      <div v-if="notices != ''">
        <div class="title">
          {{ item.title }}
        </div>
        <div class="noice-content">
          {{ item.content }}
        </div>
        <div class="noice-time">时间：{{ item.created_at }}</div>
      </div>
      <div v-else>
        暂无内容
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({})
export default class CourseNotice extends Vue {
  @Prop({ default: () => {} }) notices!: object
}
// export default {
//   name: 'CourseNotice',
//   props: {
//     notices: {}
//   },
//   data() {
//     return {
//       // noiceList: [
//       //   {
//       //     title: '上课啦，注意开课时间',
//       //     content: '第三讲的作业，仍然一部分为10道选择题，另一部分是选择一首欧词进行分析。交后由大家互评批改。',
//       //     time: '2019-07-09 11：11',
//       //     index: 0,
//       //   },
//       //   {
//       //     title: '上课啦，注意开课时间',
//       //     content: '第三讲的作业，仍然一部分为10道选择题，另一部分是选择一首欧词进行分析。',
//       //     time: '2019-07-09 11：11',
//       //     index: 1,
//       //   },
//       // ],
//     }
//   },
//   methods: {}
// }
</script>

<style lang="scss" scoped>
.courseNotice {
  width: 860px;
  position: relative;
}
.noiceContent {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 5px 10px 0px rgba(230, 230, 230, 1);
  border-radius: 5px;
  padding: 28px;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}
.noiceContent .title {
  font-size: 14px;
  color: #4c5258;
  font-weight: bold;
  margin-bottom: 5px;
}
.noiceContent .noice-content {
  font-size: 12px;
  color: rgba(76, 82, 88, 1);
  line-height: 22px;
  margin-bottom: 24px;
}
.noiceContent .noice-time {
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
</style>
