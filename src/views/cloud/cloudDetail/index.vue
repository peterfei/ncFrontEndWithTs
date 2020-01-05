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
      <!--@issueChange="handlerIssueChange"父组件接收子组件传过来的-->
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
            <template v-if="tab.type === 'comment'">
              <course-evaluation
                @submitComment="submitComment"
                :evaluations="evaluations"
                :supports="supports"
                @support="support"
                :operation="supports.operation"
              ></course-evaluation>
            </template>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="common-info">
        <common-info
          :periodical="periodical"
          :score_num="periodical.score_num"
          :avg_score="periodical.avg_score"
        ></common-info>
        <course-lecturer :periodical="periodical"></course-lecturer>
        <teaching-team :periodical="periodical"></teaching-team>
        <relevant-courses :relatedCourse="relatedCourse"></relevant-courses>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// import { constants } from 'crypto';
import DetailBanner from './components/DetailBanner.vue'
import CommonInfo from './components/CommonInfo.vue'
import CourseLecturer from './components/CourseLecturer.vue'
import TeachingTeam from './components/TeachingTeam.vue'
import RelevantCourses from './components/RelevantCourses.vue'
import CourseIntroduction from './CourseIntroduction.vue'
import LearningSyllabus from './LearningSyllabus.vue'
import CourseNotice from './CourseNotice.vue'
import ScoringRules from './ScoringRules.vue'
import CourseEvaluation from './CourseEvaluation.vue'
import Cloud from '@/api/cloud'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { ElNotificationOptions } from 'element-ui/types/notification'
import QueryString from 'qs'
import { Route } from 'vue-router'
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
    CourseEvaluation,
    RelevantCourses,
    CommonInfo,
    CourseLecturer,
    TeachingTeam
  }
})
export default class cloudDetal extends Vue {
  id: number
  activeName: string = 'introduction'
  getIntroduct: Array<any> = []
  relatedCourse: Array<any> = []
  periodical: object = {}
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
    this.loadIssueInfo()
  }

  async mounted() {
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
      this.getPeriodical()
      this.loadIssueInfo()
      this.getRelatedcourse()
    })
  }
  // 获取期刊列表
  loadIssueOptions(pkgId: number) {
    return Cloud.getIssuesOptions(pkgId).then((res: IIssuesOptions[]) => {
      this.issueOptions = res
    })
  }
  // 点击切换期
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
  // 切换introduction，syllabuses，notice，rule
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
      case 'rule':
        this.getPeriodical()
        break
      case 'comment':
        this.getComment()
        break
      default:
        console.log('unknow tabname.')
    }
  }
  // 获取期刊详情
  getPeriodical() {
    Cloud.getPeriodical(this.activedIssueId).then((rec: any) => {
      this.periodical = rec
    })
  }
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
  getComment() {
    console.log('this.pkgId........', this.pkgId)
    const commentListObj = {
      qi_id: this.activedIssueId, // 期刊id
      c_id: this.pkgId // 课程包id
    }
    Cloud.getComment(commentListObj).then((rec: any) => {
      this.evaluations = rec.data
      console.log('评论ID', rec.data)
    })
  }
  // // 提交评论信息
  submitComment(commentData: any) {
    // console.log('期id的', this.id);
    const params = {
      id: this.activedIssueId, // 期刊id
      score: commentData.score, // 分数
      content: commentData.content // 评论内容
    }
    Cloud.getAddComment(params).then(rec => {
      console.log('新增评论信息', rec)
      this.$notify({
        title: '评论发布成功',
        type: 'success'
      } as ElNotificationOptions)
      this.getComment() // 发布评论信息后，刷新评论列表
    })
  }
  // 点赞
  support(supportData: any) {
    const sObj = {
      id: supportData.id // 接收到 评论ID
    }
    Cloud.getSupport(sObj).then((rec: any) => {
      this.supports = rec
      this.evaluations = this.evaluations.map(item => {
        // 用map遍历this.evaluations
        const obj = item
        // console.log('发布发布发布发布', obj.id, supportData.id);
        if (obj.id === supportData.id) {
          // console.log('______', item);
          if (item.is_favorite === 1) {
            return { ...obj, is_favorite: 0, like_count: item.like_count - 1 }
          }
          if (item.is_favorite === 0) {
            return { ...obj, is_favorite: 1, like_count: item.like_count + 1 }
          }
        }
        return obj
      })
    })
  }
  // 相关课程
  getRelatedcourse() {
    // this.pkgId课程包id
    Cloud.getRelatedcourse(this.pkgId).then((rec: Array<object>) => {
      this.relatedCourse = rec
      console.log('relatedCourse', rec)
    })
  }
}
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
