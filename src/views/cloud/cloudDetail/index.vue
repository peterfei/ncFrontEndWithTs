<template>
  <div class="cloudDetal">
    <!-- {{getIntroduct}} -->
    <div>
      <!-- <detail-banner :getIntroduct="getIntroduct"
      :periodical="periodical" @changePeriod="onChangePeriod"></detail-banner> -->
      <detail-banner
        :periodical="periodical"
        :package_title="periodical.package_title"
        :description="periodical.description"
        :duration="periodical.duration"
        :date_week="periodical.date_week"
        :base_price="periodical.base_price"
        :now_week="periodical.now_week"
        :study_count="periodical.study_count"
        :begin_date="periodical.begin_date"
        :end_date="periodical.end_date"
        :is_free="periodical.is_free"
        :is_buy="periodical.is_buy"
        :all_issue="periodical.all_issue"
        @changePeriod="onChangePeriod"
        @issueChange="getIssueChange"
        ><!--父组件接收子组件传过来的值（当前期数选中id参数）-->
      </detail-banner>
    </div>
    <div
      style="width:100%;display: flex;flex-direction: row;justify-content: space-between;"
    >
      <div class="tab_head">
        <el-tabs
          @tab-click="handleClick"
          v-model="activeName"
          style="margin-bottom:10px;"
        >
          <el-tab-pane
            v-for="tab in tabs"
            :key="tab.index"
            :label="tab.label"
            :name="tab.name"
          >
            <!-- 课程介绍 -->
            <template v-if="tab.type === 'introduction'">
              <course-introduction
                :periodical="periodical"
                :intro_remark="periodical.intro_remark"
                :target="periodical.target"
                :summary="periodical.summary"
                :consult_data="periodical.consult_data"
              >
              </course-introduction>
            </template>

            <!-- 学习大纲 -->
            <template v-if="tab.type === 'outline'">
              <learning-syllabus
                :Syllabuses="Syllabuses"
                :title="Syllabuses.title"
                :description="Syllabuses.description"
              ></learning-syllabus>
            </template>

            <!-- 公告 -->
            <template v-if="tab.type === 'notice'">
              <course-notice :notices="notices"></course-notice>
            </template>

            <!-- 评分规则 -->
            <template v-if="tab.type === 'rule'">
              <scoring-rules
                :periodical="periodical"
                :scoring_rules="periodical.scoring_rules"
              >
              </scoring-rules>
            </template>

            <!-- 课程评价 -->
            <template v-if="tab.type === 'comment'">
              <course-evaluation
                :evaluations="evaluations"
                @submitComment="submitComment"
                @support="support"
                :supports="supports"
                :operation="supports.operation"
              ></course-evaluation>
            </template>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="common-info">
        <!-- <common-info
          :periodical="periodical"
          :score_num="periodical.score_num"
          :avg_score="periodical.avg_score"
        ></common-info>
        <course-lecturer :periodical="periodical"></course-lecturer>
        <teaching-team
          :periodical="periodical"
          :lecturer="periodical.lecturer"
        ></teaching-team>
        <relevant-courses :relatedCourse="relatedCourse"></relevant-courses> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// import { constants } from 'crypto';
import DetailBanner from './components/DetailBanner.vue'
// import CommonInfo from './components/CommonInfo.vue'
// import CourseLecturer from './components/CourseLecturer.vue'
// import TeachingTeam from './components/TeachingTeam.vue'
// import RelevantCourses from './components/RelevantCourses.vue'
// import CourseIntroduction from './CourseIntroduction.vue'
// import LearningSyllabus from './LearningSyllabus.vue'
// import CourseNotice from './CourseNotice.vue'
// import ScoringRules from './ScoringRules.vue'
// import CourseEvaluation from './CourseEvaluation.vue'
import Cloud from '@/api/cloud'
import { Component, Vue } from 'vue-property-decorator'
export interface DetileTabs {
  label: string
  type: string
  name: string
}
@Component({
  components: {
    DetailBanner
  }
})
export default class cloudDetal extends Vue {
  id: any
  activeName: string = 'first'
  getIntroduct: Array<any> = []
  relatedCourse: Array<any> = []
  periodical: Array<any> = []
  date_week: string
  notices: Array<any> = []
  evaluations: Array<any> = []
  Syllabuses: Array<any> = []
  supports: Array<any> = []
  issuesId: any
  last_issue_id: string
  course_id: any
  public tabs: Array<DetileTabs> = [
    {
      label: '课程介绍',
      type: 'introduction',
      name: 'first'
    },
    {
      label: '学习大纲',
      type: 'outline',
      name: 'second'
    },
    {
      label: '公告',
      type: 'notice',
      name: 'third'
    },
    {
      label: '评分规则',
      type: 'rule',
      name: 'four'
    },
    {
      label: '课程评价',
      type: 'comment',
      name: 'five'
    },
    {
      label: '证书',
      type: 'certificate',
      name: 'six'
    }
  ]
  mounted() {
    this.id = this.$route.params.id // 从路由中获取期id
    this.course_id = this.$route.params.course_id // 从路由中获取课程包id
    const issueId = this.$route.query.issue_id
    this.getPeriodical(issueId) // 课程包详情-期数展示
    if (issueId) {
      this.issuesId = issueId
      // this.getIssueInfo(issueId)
    }
  }
  // 改变期刊号
  onChangePeriod(issueId: any) {
    this.$router.push({
      query: {
        issue_id: issueId
      }
    })
  }
  // 期刊
  getPeriodical(issueId: any) {
    //Cloud.MoocList.getPeriodical(this.id).then((rec: any) => {
    //  this.periodical = rec
    //  if (!issueId) {
    //    this.issuesId = rec.last_issue_id
    //    // this.getIssueInfo(this.issuesId)
    //  }
    //})
  }
}
// export default {
//   components: {
//     DetailBanner,
//     CommonInfo,
//     CourseLecturer,
//     TeachingTeam,
//     RelevantCourses,
//     CourseIntroduction,
//     LearningSyllabus,
//     CourseNotice,
//     ScoringRules,
//     CourseEvaluation
//   },
//   data() {
//     return {
//       id: '',
//       activeName: 'first',
//       getIntroduct: [],
//       relatedCourse: [],
//       periodical: [],
//       date_week: '',
//       notices: [],
//       evaluations: [],
//       Syllabuses: [],
//       supports: [],
//       issuesId: '',
//       last_issue_id: '',
//       tabs: [
//         {
//           label: '课程介绍',
//           type: 'introduction',
//           name: 'first'
//         },
//         {
//           label: '学习大纲',
//           type: 'outline',
//           name: 'second'
//         },
//         {
//           label: '公告',
//           type: 'notice',
//           name: 'third'
//         },
//         {
//           label: '评分规则',
//           type: 'rule',
//           name: 'four'
//         },
//         {
//           label: '课程评价',
//           type: 'comment',
//           name: 'five'
//         },
//         {
//           label: '证书',
//           type: 'certificate',
//           name: 'six'
//         }
//       ]
//     }
//   },
//   mounted() {
//     this.id = this.$route.params.id // 从路由中获取期id
//     this.course_id = this.$route.params.course_id // 从路由中获取课程包id
//     // console.log('课程', this.$route.params.course_id);
//     const issueId = this.$route.query.issue_id
//     // console.log('iss_id', issueId);
//     this.getPeriodical(issueId) // 课程包详情-期数展示
//     if (issueId) {
//       this.issuesId = issueId
//       this.getIssueInfo(issueId)
//     }
//     // this.getPeriodical();// 课程包详情-期数展示
//     // this.getNotice(); // 公告
//   },
//   methods: {
//     // 改变期刊号
//     onChangePeriod(issueId) {
//       this.$router.push({
//         query: {
//           issue_id: issueId
//         }
//       })
//     },
//     // 获取期刊信息
//     getIssueInfo(issueId) {
//       this.getNotice(issueId) // 公告
//       // this.getComment(issueId);// 评价
//       this.getRelatedcourse(issueId) // 相关课程
//       // this.getListDetail(issueId);// 课程包详情
//       // this.notices(issueId);
//     },
//     handleClick(tab) {
//       // console.log('aiaiai', tab, event);
//       if (tab.label === '评分规则') {
//         this.getPeriodical()
//       }
//       if (tab.label === '公告') {
//         this.getNotice()
//       }
//       if (tab.label === '课程介绍') {
//         this.getPeriodical()
//       }
//       if (tab.label === '学习大纲') {
//         this.getSyllabuses()
//       }
//       if (tab.label === '课程评价') {
//         this.getComment()
//       }
//     },
//     // 学习大纲
//     getSyllabuses() {
//       Cloud.MoocList.getSyllabuses(this.id).then(res => {
//         this.Syllabuses = res
//         // console.log('学习大纲', this.Syllabuses);
//       })
//     },
//     // 相关课程
//     getRelatedcourse() {
//       // this.course_id课程包id
//       Cloud.MoocList.getRelatedcourse(this.course_id).then(rec => {
//         this.relatedCourse = rec
//       })
//     },
//     // 期刊
//     getPeriodical(issueId) {
//       Cloud.MoocList.getPeriodical(this.id).then(rec => {
//         this.periodical = rec
//         if (!issueId) {
//           this.issuesId = rec.last_issue_id
//           this.getIssueInfo(this.issuesId)
//         }
//       })
//     },
//     // 公告
//     getNotice() {
//       Cloud.MoocList.getNotice(this.id).then(rec => {
//         this.notices = rec.data
//         // console.log('公告', this.notices);
//       })
//     },
//     // 改变期数
//     getIssueChange(currentIssue) {
//       // console.log('接收参数', currentIssue);
//       // （接收子组件传的参数(当前期数选中id参数)）
//       this.issuesId = currentIssue
//       Cloud.MoocList.getPeriodical(currentIssue).then(rec => {
//         console.log('期数改变了哦===============', rec)
//         this.periodical = rec
//         this.notices = rec
//         // this.getNotice(); // 公告
//         // this.getSyllabuses(); // 大纲
//         this.Syllabuses = rec
//         this.evaluations = rec
//         this.getIntroduct = rec
//       })
//     },
//     // 提交评论信息
//     submitComment(commentData) {
//       // console.log('期id的', this.id);
//       const postObj = {
//         id: this.id, // 期刊id
//         score: commentData.score, // 分数
//         content: commentData.content // 评论内容
//       }
//       Cloud.MoocList.getAddComment(postObj).then(rec => {
//         console.log('新增评论信息', rec)
//         this.$notify({
//           title: '评论发布成功',
//           type: 'success'
//         })
//         this.getComment() // 发布评论信息后，刷新评论列表
//       })
//     },
//     // 评价
//     getComment() {
//       const commentListObj = {
//         qi_id: this.id, // 期刊id
//         c_id: this.course_id // 课程包id
//       }
//       // console.log('期id的', this.id);
//       // console.log('课程包的id', this.course_id);
//       Cloud.MoocList.getComment(commentListObj).then(rec => {
//         this.evaluations = rec.data
//         console.log('评论ID', rec.data)
//       })
//     },
//     // 点赞
//     support(supportData) {
//       const sObj = {
//         id: supportData.id // 接收到 评论ID
//       }
//       // console.log('idddddddddd', supportData.id);
//       Cloud.MoocList.getSupport(sObj).then(rec => {
//         this.supports = rec
//         this.evaluations = this.evaluations.map(item => {
//           // 用map遍历this.evaluations
//           const obj = item
//           // console.log('发布发布发布发布', obj.id, supportData.id);
//           if (obj.id === supportData.id) {
//             // console.log('______', item);
//             if (item.is_favorite === 1) {
//               return { ...obj, is_favorite: 0, like_count: item.like_count - 1 }
//             }
//             if (item.is_favorite === 0) {
//               return { ...obj, is_favorite: 1, like_count: item.like_count + 1 }
//             }
//           }
//           return obj
//         })
//         // this.$message({
//         //   title: '点赞成功!',
//         //   type: 'success',
//         // });
//       })
//     }
//   }
// }
</script>

<style lang="scss" scoped>
.cloudDetal {
  width: 1200px;
  margin: 0 auto;
}
.tab_head {
  margin-top: 20px;
  width: 860px;
  &::v-deep .el-tabs__nav-wrap:after {
    background: unset;
  }
  &::v-deep .el-tabs__item {
    font-weight: bold;
    color: #93999fff;
    font-size: 15px;
  }
  & &::v-deep .el-tabs__item.is-active {
    color: #07111bff;
  }
  &::v-deep .el-tabs__active-bar {
    background: #07111bff;
    // width: 24px!important;
  }
  &::v-deep .el-tabs__content {
    overflow: unset;
  }
}
.main {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.tabs-router {
  width: 860px;
}
.common-info {
  width: 300px;
  margin-top: 64px;
}
</style>
