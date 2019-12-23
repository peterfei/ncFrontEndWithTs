<template>
  <div class="course-stu-content course-box-shadow">
    <div>
      <div class="df flex-b fcolor-4c">
        <span class="already-study  fbold"
          >已学: {{ studyStatus.percentage | getTimer('percent') }}%
        </span>
        <!-- {{studyStatus.percentage?studyStatus.percentage:0}}% -->
        <span class="spend-time fs14"
          >学习耗时:
          {{
            (studyStatus.watch_time ? studyStatus.watch_time : 0)
              | getTimer('characters')
          }}
        </span>
      </div>
      <!-- 进度条 -->
      <div class="progress">
        <el-progress
          :text-inside="true"
          :stroke-width="18"
          :percentage="
            parseInt(studyStatus.percentage ? studyStatus.percentage : 0, 10)
          "
          status="exception"
          color="#FF783CFF"
        >
        </el-progress>
      </div>
    </div>

    <div class="fs14 fcolor-4c">
      上次学到：{{ studyStatus.last_watch ? studyStatus.last_watch.title : '' }}
    </div>
    <!-- 继续学习 -->
    <div class="continue-btn-box">
      <router-link
        tag="button"
        class="continue-btn"
        :to="{
          path: `/video/${packageId}/${
            studyStatus.last_watch ? studyStatus.last_watch.id : ''
          }`
        }"
        >继续学习</router-link
      >
      <!-- <el-button class="continue-btn">继续学习</el-button> -->
    </div>
    <!-- 讲师部分 -->
    <div class="status-lecturer">
      <div class="littleBtitle up">
        讲师
      </div>
      <div class="down">
        <img
          src="../../../../../public/image/test/aa.jpg"
          alt=""
          class="head-img"
        />
        <span class="lecturer-name">{{ lectuerName }}</span>
        <i></i>
      </div>
      <div class="lecturer-detail">
        {{ lectuerIntro }}
      </div>
    </div>
    <div>
      <div class="littleBtitle this-lecturer-posi">该讲师的其他课程</div>
      <!-- 其他课程 -->
      <recommend-course
        v-for="course in lectureCourseList"
        :rateScore="course.good_comments"
        :viewsCount="course.learners_count"
        :cover="course.cover"
        :title="course.name"
        :key="course.id"
        :id="course.id"
      ></recommend-course>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

import RecommendCourse from './RecommendCourse.vue'
@Component({
  components: {
    RecommendCourse
  }
})
export default class StudyStatus extends Vue {
  @Prop({ type: Object, required: true, default: () => {} })
  studyStatus!: object
  @Prop({ type: [Number, String], required: true }) packageId: string | number
  @Prop({ default: '' }) lectuerName!: string
  @Prop({ default: '' }) lectuerIntro!: string
  @Prop({ type: Array, default: [] }) courses!: []
  @Prop({ type: Array, default: [] }) lectureCourseList: []
}
</script>

<style lang="scss" scoped>
.course-stu-content {
  width: 340px;
  padding: 30px;
  position: relative;
  border-radius: 10px;
  top: -201px;
  z-index: 200;
  background: #fff;
  box-shadow: 0px 0px 13px 3px #4c434329 !important;
  .progress {
    margin-top: 10px;
    margin-bottom: 30px;
  }
  .continue-btn-box {
    margin-top: 15px;
  }
  .continue-btn {
    width: 280px;
    height: 50px;
    background: #ffd300;
    color: #993c1e;
    font-size: 20px;
    border: none;
    cursor: pointer;
    transition: 0.3s;
    border-radius: 5px;
    &:hover {
      background: #ffb21f;
    }
  }
}
.littleBtitle {
  font-size: 16px;
  color: #07111b;
  font-weight: bold;
}
.status-lecturer {
  .head-img {
    width: 50px;
    height: 50px;
    background: #aaa;
    display: inline-block;
    border-radius: 50%;
    margin-right: 20px;
  }
  .lecturer-name {
    font-size: 16px;
    color: #555555;
    font-weight: bold;
  }
  .up {
    margin-top: 30px;
  }
  .down {
    margin-top: 20px;
    margin-bottom: 18px;
  }
}
.lecturer-detail {
  color: #4c5258;
  font-size: 12px;
  line-height: 22px;
}
.this-lecturer-posi {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
