<template>
  <div class="course-lecturer">
    <div class="title">
      课程主讲师人
    </div>
    <div v-if="periodical.lecturer && periodical.lecturer.length">
      <div class="lecturer">
        <img :src="periodical.lecturer[0]['author']" alt="" />
        <div class="author-box">
          <span class="author">
            {{ periodical.lecturer[0]['realname'] }}
          </span>
          <span class="job">
            {{ periodical.lecturer[0]['role'] }}
          </span>
        </div>
      </div>
      <div class="introduction">
        {{ periodical.lecturer[0]['shorthand'] }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({})
export default class CourseLecturer extends Vue {
  @Prop({ default: () => {} }) periodical!: object
  // updated() {
  //   console.log('bbbbb', JSON.stringify(this.periodical))
  // }
  // mounted() {
  //   console.log('aaaaa', JSON.stringify(this.periodical))
  // }
}
// export default {
//   name: 'CourseLecturer',
//   props: {
//     periodical: {}
//   },
//   data() {
//     return {
//       src: '',
//       author: '唐晓燕',
//       job: '教授',
//       info:
//         ' 管理学博士，副教授，苏州经贸职业技术学院电子商务与物流学院副院长,江苏高校“青蓝工程”优秀青年骨干教师培养对象,江苏高等学校在线开放课程《电子商务理论与实务》立项建设负责人,主要从事跨境电子商务、农村电子商务,'
//     }
//   },
//   methods: {}
// }
</script>

<style lang="scss" scoped>
.course-lecturer {
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #e8e8e8;
  padding-bottom: 24px;
}
.course-lecturer .title {
  font-size: 16px;
  color: rgba(7, 17, 27, 1);
  font-weight: bold;
}
.course-lecturer .lecturer {
  display: flex;
  flex-direction: row;
  margin-top: 18px;
  margin-bottom: 14px;
  align-items: center;
}
.course-lecturer .lecturer img {
  width: 60px;
  height: 60px;
  background-color: #eee;
  border-radius: 50%;
  margin-right: 10px;
}
.course-lecturer .lecturer .author-box {
  display: flex;
  flex-direction: column;
}
.course-lecturer .lecturer .author-box .author {
  font-size: 14px;
  color: #555;
  font-weight: bold;
}
.course-lecturer .lecturer .author-box .job {
  color: #8b9199;
  font-size: 12px;
  margin-top: 6px;
}
.course-lecturer .introduction {
  color: #4c5258;
  font-size: 12px;
  width: 300px;
  line-height: 22px;
}
</style>
