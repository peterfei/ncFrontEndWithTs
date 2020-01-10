<template>
  <div class="courses">
    <div class="title">相关课程</div>
    <div class="course-list" v-for="item in relatedCourse" :key="item.id">
      <img :src="item.cover" alt="" />
      <div class="course-content">
        <div class="up">{{ item.description }}</div>
        <div class="down">
          <i class="icon iconfont icon-guankanshu mr3"></i>
          <span>{{ item.study_count }} 人参加</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({})
export default class RelevantCourses extends Vue {
  @Prop({ default: () => ({}) }) relatedCourse!: object
}
// export default {
//   name: 'RelevantCourses',
//   props: {
//     relatedCourse: {}
//   },
//   data() {
//     return {
//       items: [
//         {
//           src:
//             'http://static.ibodao.com/Public/uploads/images/2019/0215/5c661a4a1f265.png',
//           info: '从入门到精通 淘宝直通车高级进阶系列课程',
//           number: '1233人参加'
//         },
//         {
//           src:
//             'http://static.ibodao.com/Public/uploads/images/2019/0215/5c661a4a1f265.png',
//           info: '从入门到精通 淘宝直通车高级进阶系列课程',
//           number: '1233人参加'
//         }
//       ]
//     }
//   },
//   methods: {}
// }
</script>

<style lang="scss" scoped>
.courses {
  display: flex;
  flex-direction: column;
  margin-top: 28px;
}
.courses .title {
  font-size: 15px;
  font-weight: bold;
  color: rgba(36, 43, 51, 1);
  margin-bottom: 20px;
}
.courses .course-list {
  display: flex;
  flex-direction: row;
  margin-bottom: 18px;
}
.courses .course-list img {
  width: 100px;
  height: 75px;
  border-radius: 5px;
  background: #eee;
  margin-right: 10px;
}
.courses .course-list .course-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
}
.courses .course-list .course-content .up {
  font-size: 14px;
  color: rgba(36, 43, 51, 1);
  line-height: 22px;
}
.courses .course-list .course-content .down {
  font-size: 12px;
  color: rgba(138, 145, 153, 1);
}
.courses .course-list .course-content .down .mr3 {
  margin-right: 3px;
}
.courses .course-list .course-content .down i {
  font-size: 10px;
}
</style>
