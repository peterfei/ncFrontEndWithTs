<template>
  <div class="cloudDetal">
    <!-- {{getIntroduct}} -->
    <!-- <detail-banner :getIntroduct="getIntroduct"
    :periodical="periodical" @changePeriod="onChangePeriod"></detail-banner>-->
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
      :issueOptions="issueOptions"
      :activedIssueId="activedIssueId"
      @issueChange="handlerIssueChange"
    >
      <!--父组件接收子组件传过来的值（当前期数选中id参数）-->
    </detail-banner>
    <div class="detail-content">
      <div class="tab-head">
        <el-tabs
          v-model="activeName"
          style="margin-bottom:10px;"
          @tab-click="handlerTabChange"
        >
          <el-tab-pane
            v-for="tab in tabs"
            :key="tab.index"
            :label="tab.label"
            :name="tab.type"
          >
            <!-- 课程介绍 -->
            <template v-if="tab.type === 'introduction'">
              <course-introduction
                :periodical="periodical"
                :intro_remark="periodical.intro_remark"
                :target="periodical.target"
                :summary="periodical.summary"
                :consult_data="periodical.consult_data"
              ></course-introduction>
            </template>

            <!-- 学习大纲 -->
            <template v-if="tab.type === 'syllabuses'">
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
              ></scoring-rules>
            </template>

            <!-- 课程评价 -->
            <!-- <template v-if="tab.type === 'comment'">
              <course-evaluation
                :evaluations="evaluations"
                @submitComment="submitComment"
                @support="support"
                :supports="supports"
                :operation="supports.operation"
              ></course-evaluation>
            </template>-->
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
        <relevant-courses :relatedCourse="relatedCourse"></relevant-courses>-->
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
import CourseIntroduction from './CourseIntroduction.vue'
import LearningSyllabus from './LearningSyllabus.vue'
import CourseNotice from './CourseNotice.vue'
import ScoringRules from './ScoringRules.vue'
// import CourseEvaluation from './CourseEvaluation.vue'
import Cloud from '@/api/cloud'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { ElNotificationOptions } from 'element-ui/types/notification'
import QueryString from 'qs'
import { Route } from 'vue-router'
// import { all_issue } from '@/mocks/index'
export interface DetileTabs {
  label: string
  type: string
  name: string
}
export interface IIssuesOptions {
  id: number
}
@Component({
  components: {
    DetailBanner,
    CourseIntroduction,
    LearningSyllabus,
    CourseNotice,
    ScoringRules,
    // CourseEvaluation
  }
})
export default class cloudDetal extends Vue {
  id: number
  activeName: string = 'introduction'
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
  course_id: number
  pkgId: number = 0
  activedIssueId: number = 0
  activedTab: any
  issueOptions: IIssuesOptions[] = []
  public tabs: Array<DetileTabs> = [
    {
      label: '课程介绍',
      type: 'introduction',
      name: 'introduction'
    },
    {
      label: '学习大纲',
      type: 'syllabuses',
      name: 'syllabuses'
    },
    {
      label: '公告',
      type: 'notice',
      name: 'notice'
    },
    {
      label: '评分规则',
      type: 'rule',
      name: 'rule'
    },
    {
      label: '课程评价',
      type: 'comment',
      name: 'comment'
    },
    {
      label: '证书',
      type: 'certificate',
      name: 'certificate'
    }
  ]

  @Watch('$route', { immediate: true, deep: true })
  onUrlChange(now: Route, old: Route) {
    if (!old) return
    // debugger

    console.log(123, this.issueOptions)
    // 最新期
    const lastIndex = this.issueOptions.length - 1 // 取最后一期
    this.activedIssueId =
      +this.$route.query.issueId || this.issueOptions[lastIndex].id
    this.activedTab = this.$route.query.type || 'introduction'
    console.log('选的是this.activedTab', this.activedTab)
    this.getPeriodical()
    console.log(2222)
    this.loadIssueInfo()
    console.log(3333)
  }

  async mounted() {
    // console.log('this.$route.params=====', this.$route.params)
    // 获取课程包id
    this.pkgId = +this.$route.params.pkgId
    //获取期刊信息IssueOptions
    this.loadIssueOptions(this.pkgId).then((res: Array<object>) => {
      // 最新期
      const lastIndex = this.issueOptions.length - 1 // 取最后一期
      // 确认激活那条期刊信息（默认：最新）或者用户指定期 => activedIssueId
      this.activedIssueId =
        +this.$route.query.issueId || this.issueOptions[lastIndex].id
      console.log('------this.activedIssueId', this.activedIssueId) //期id
      // 确认激活tab， => activedTab
      //  根据激活的Tab，获取期的相应详情信息（intro, syllb, notices, rules, comments
      this.activedTab = this.$route.query.type || 'introduction'
      console.log('000000')
      this.getPeriodical()
      this.loadIssueInfo()
    })
  }
  loadIssueOptions(pkgId: number) {
    return Cloud.getIssuesOptions(pkgId).then((res: IIssuesOptions[]) => {
      this.issueOptions = res
    })
  }
  handlerIssueChange(issueId: any) {
    console.log(`---------------IssueId  is ${issueId}`)
    const query = {
      ...this.$route.query,
      issueId: issueId
    }
    this.$router.push({
      query
    })
  }
  handlerTabChange(tab: any) {
    console.log('this.activedTab', tab.name)
    const query = {
      ...this.$route.query,
      type: tab.name
    }
    this.$router.push({
      query
    })
  }
  loadIssueInfo() {
    console.log(['进入loadIssueInfo'])
    switch (this.activedTab) {
      case 'introduction':
        this.getPeriodical()
        console.log('introduction=====')
        break
      case 'syllabuses':
        this.getSyllabuses()
        console.log('syllabuses=====')
        break
      case 'notice':
        this.getNotice()
        console.log('notice=====')
        break
      default:
        console.log('unknow tabname.')
    }
  }
  // 获取期刊详情
  getPeriodical() {
    Cloud.getPeriodical(this.activedIssueId).then((rec: any) => {
      // console.log('mmmmmmmmm', this.activedIssueId)
      this.periodical = rec
      // if (!issueId) {
      //   this.issuesId = rec.last_issue_id
      //   // this.getIssueInfo(this.issuesId)
      // }
    })
  }
  // handleClick(tab: any) {}
  // 改变期刊号
  // onChangePeriod(issueId: any) {
  //   this.$router.push({
  //     query: {
  //       issue_id: issueId
  //     }
  //   })
  // }
  // 课程包下期刊
  // async getPeriodicalChange() {
  //   // console.log('pad1aejkgleklgj=====', this.pkgId)//pkgId
  //   const res = await Cloud.MoocList.getPeriodicalChange(this.pkgId)
  //   return res
  // }

  // 期刊
  // getPeriodical(issuesId?: any) {
  //   console.log('lllllllllllllll', issuesId)
  //   if (issuesId != undefined) {
  //     Cloud.MoocList.getPeriodical(issuesId).then((rec: any) => {
  //       this.periodical = rec
  //       // if (!issueId) {
  //       //   this.issuesId = rec.last_issue_id
  //       //   // this.getIssueInfo(this.issuesId)
  //       // }
  //     })
  //   }
  // }
  // 改变期数
  // getIssueChange(currentIssue: number) {
  //   console.log('接收参数', currentIssue)
  //   // （接收子组件传的参数(当前期数选中id参数)）
  //   this.issuesId = currentIssue
  //   console.log('currentIssue========', currentIssue)

  //   // Cloud.MoocList.getPeriodical(currentIssue).then((rec: any) => {
  //   //   console.log('期数改变了哦===============', rec)
  //   //   this.periodical = rec
  //   //   this.notices = rec
  //   //   this.syllabuses = rec
  //   //   this.evaluations = rec
  //   //   this.getIntroduct = rec
  //   // })
  // }
  // handleClick(tab: any) {
  //   // console.log('aiaiai', tab, event);
  //   if (tab.label === '评分规则') {
  //     this.getPeriodical(this.issuesId)
  //   }
  //   if (tab.label === '公告') {
  //     this.getNotice()
  //   }
  //   if (tab.label === '课程介绍') {
  //     this.getPeriodical()
  //   }
  //   if (tab.label === '学习大纲') {
  //     this.getSyllabuses()
  //   }
  //   if (tab.label === '课程评价') {
  //     this.getComment()
  //   }
  // }
  // 学习大纲
  getSyllabuses() {
    Cloud.getSyllabuses(this.activedIssueId).then((res: any) => {
      this.Syllabuses = res
      console.log('学习大纲=======', this.Syllabuses)
    })
  }
  // 公告
  getNotice() {
    Cloud.getNotice(this.activedIssueId).then((rec: any) => {
      this.notices = rec.data
      console.log('公告', this.notices)
    })
  }
  // 评价
  // getComment() {
  //   const commentListObj = {
  //     qi_id: this.id, // 期刊id
  //     c_id: this.course_id // 课程包id
  //   }
  //   // console.log('期id的', this.id);
  //   // console.log('课程包的id', this.course_id);
  //   Cloud.MoocList.getComment(commentListObj).then((rec: any) => {
  //     this.evaluations = rec.data
  //     console.log('评论ID', rec.data)
  //   })
  // }
  // // 提交评论信息
  // submitComment(commentData: any) {
  //   // console.log('期id的', this.id);
  //   const params = {
  //     id: this.id, // 期刊id
  //     score: commentData.score, // 分数
  //     content: commentData.content // 评论内容
  //   }
  //   Cloud.MoocList.getAddComment(params).then(rec => {
  //     console.log('新增评论信息', rec)
  //     this.$notify({
  //       title: '评论发布成功',
  //       type: 'success'
  //     } as ElNotificationOptions)
  //     this.getComment() // 发布评论信息后，刷新评论列表
  //   })
  // }
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
.detail-content {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.tab-head {
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
