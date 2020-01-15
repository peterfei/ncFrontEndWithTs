<template>
  <div class="w100 main-box">
    <course-head
      :courseInfoDetail="courseInfoDetail"
      :courseName="courseInfoDetail ? courseInfoDetail.name : ''"
      :couseTitle="courseInfoDetail ? courseInfoDetail.couseTitle : ''"
      :courseTime="courseInfoDetail.length_of_time"
      :start="courseInfoDetail.stars"
      :introduce="courseInfoDetail.introduction"
      :studyStuNum="courseInfoDetail.learners_count"
      :chapterNum="courseInfoDetail.course_chapters_count"
    ></course-head>
    <div class="content course-detail-content">
      <div class="head-type">
        <el-tabs
          @tab-click="handleClick"
          v-model="activeName"
          style="width:200px;margin-bottom:10px;"
        >
          <el-tab-pane label="课程章节" name="chapter"></el-tab-pane>
          <el-tab-pane label="课程评论" name="comment"></el-tab-pane>
        </el-tabs>
      </div>
      <div class="structure">
        <div class="left-content">
          <!-- {{ chaptersLists }} -->
          <template v-if="this.activeName === 'chapter'">
            <div v-if="chaptersLists && chaptersLists.length">
              <course-chapter-list-item
                v-for="(ChapterItem, ListIndex) in chaptersLists"
                :key="ChapterItem.index"
                :listItem="ChapterItem"
                :chapterName="ChapterItem.title"
                :chapterDescription="ChapterItem.description"
              >
                <course-chapter-item
                  v-for="(item, index) in ChapterItem.children"
                  :package-id="packageId"
                  :key="item.index"
                  :item="item"
                  :listindex="ListIndex"
                  :keyindex="index"
                  :title="item.title"
                  :courseTime="item.length_of_time"
                  :courseType="item.type"
                >
                </course-chapter-item>
              </course-chapter-list-item>
            </div>
            <div v-else>
              <h6 class="no-info">暂无信息</h6>
            </div>
          </template>
          <template v-if="this.activeName === 'comment'">
            <!--<course-comment-input
              :package-id="packageId"
              @commentContentObj="commentOwn"
            ></course-comment-input>
            -->
            <div class="comment-sort">
              <el-radio-group v-model="activeSort" @change="changeStatus">
                <el-radio :label="0">最新</el-radio>
                <el-radio :label="1">点赞</el-radio>
              </el-radio-group>
            </div>
            <!--
            <course-comment-item
              :ReplyItem="comment.comment_reply"
              :package-id="packageId"
              v-for="comment in comments"
              :key="comment.id"
              :item="comment"
              :commentContent="comment.content"
              :commentName="comment.author ? comment.author.name : '没有名字'"
              :likeNum="comment.like_count ? comment.like_count : 0"
              :is_favorite="comment.is_favorite"
              :created_at="comment.created_at"
              :rateValue="comment.start_score"
              :commentReply="comment.comment_replies"
              :replyName="
                comment.comment_replies
                  ? comment.comment_replies.replie_author
                  : '没有名字'
              "
              @thumbsUp="thumbsUp"
              @submtReply="submtReply"
            >
            </course-comment-item>
            -->
          </template>
        </div>
        <div class="right-content">
          <study-status
            v-if="courseInfoDetail.author"
            :lectureCourseList="lectureCourseList"
            :courses="lectuerCourse"
            :studyStatus="chapterProgress"
            :lectuerName="courseInfoDetail.author.name"
            :lectuerIntro="courseInfoDetail.author.intro"
            :packageId="packageId"
          ></study-status>
          <img v-else src="http://placehold.it/280x131" alt="" />
          <div class="recommend-courses">
            <el-card :body-style="recomdCard">
              <div class="recommend-title fs16">推荐课程</div>
              <recommend-course
                v-for="recomItem in courseRecommedList"
                :key="recomItem.id"
                :id="recomItem.id"
                :title="recomItem.name"
                :cover="recomItem.cover"
                :viewsCount="recomItem.learners_count"
                :rateScore="recomItem.good_comments"
              >
              </recommend-course>
            </el-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { mapState, mapGetters, mapActions } from 'vuex'
import CourseHead from './components/CourseHead.vue'
import CourseChapterListItem from './components/CourseChapterListItem.vue'
import CourseChapterItem from './components/CourseChapterItem.vue'
import StudyStatus from './components/StudyStatus.vue'
import RecommendCourse from './components/RecommendCourse.vue'
import CourseCommentItem from './components/CourseCommentItem.vue'
import CourseCommentInput from './components/CourseCommentInput.vue'
@Component({
  components: {
    CourseHead,
    CourseChapterListItem,
    CourseChapterItem,
    StudyStatus,
    RecommendCourse,
    CourseCommentItem,
    CourseCommentInput
  },
  methods: {
    ...mapActions('CourseDetails', [
      'getCourseDetail', // 课程详情
      'getLectureCourse', // 获取该讲师的其他推荐课程
      'getCoursesRecommend' // 获取右侧推荐课程列表
      //'getCommentsList', // 评论列表
      //'postCourseComment', // 提交新的评论
      //'userReplyTo', // 评论回复
      //'userThumbsUp', // 点赞 thumbsUp
    ])
  },
  computed: {
    ...mapState({
      // 获取右侧推荐课程列表
      courseRecommedList: (state: any) =>
        state.CourseDetails.coursesRecommendList || [],
      // 课程详情
      courseInfoDetail: (state: any) => state.CourseDetails.courseDetail || {},
      // 获取该讲师的其他推荐课程
      lectureCourseList: (state: any) =>
        state.CourseDetails.lectureCourseList || {},
      // 课程包学习进度
      chapterProgress: (state: any) => state.CourseDetails.chapterProgress,
      // 评论列表
      comments: (state: any) => state.CourseDetails.courseCommentsList
    }),
    ...mapGetters({
      chaptersLists: 'CourseDetails/chaptersLists' || []
    })
  }
})
export default class CourseDetail extends Vue {
  public chapterList: Array<any> = []
  public activeName: string = 'chapter'
  public commentSort: string = ''
  public recomdCard: any = {
    width: '100%',
    padding: '30px',
    borderRadius: '10px'
  }
  public lectuerCourse: Array<any> = []
  public packageId: number = -1
  public activeSort: number = 0

  public handleClick() {
    this.$router.push({ query: { type: this.activeName } })
  }

  @Watch('$route', { immediate: true })
  beforeRouteChange(to: any) {
    this.packageId = parseInt(to.params.id, 10)
    // 获取课程详情
    this.getCourseDetail(to.params.id)
    // 获取该讲师的其他推荐课程
    this.getLectureCourse({
      packageId: this.packageId,
      limit: 4
    })
    //// 获取右侧推荐课程列表
    this.getCoursesRecommend({
      packageId: this.packageId,
      limit: 4
    })
    //// // 获取评论列表
    //this.getCommentsList({ id: this.packageId, type: 0 })
  }

  // 最热/最新
  async changeStatus(data: any) {
    this.activeSort = data
    try {
      await this.getCommentsList({ id: this.packageId, type: this.activeSort })
    } catch (err) {
      this.$message.error(err.data.message)
    }
  }
}
</script>

<style lang="scss" scoped>
.main-box {
  background: #f4f4f4;
}
.info-introd-box {
  width: 226px;
  .info-title {
    color: #08111a;
    padding: 15px 15px 0 15px;
  }
  .info-content {
    padding: 12px;
    font-weight: 400;
    color: rgba(138, 145, 153, 1);
    line-height: 23px;
  }
}

.course-detail-content {
  .structure {
    display: flex;
    justify-content: space-between;
  }
  .head-type {
    margin-top: 20px;
    // .x >>> .a
    & ::v-deep .el-tabs__nav-wrap:after {
      background: unset;
    }
    & ::v-deep .el-tabs__item {
      font-weight: bold;
      color: $light-black;
      font-size: 16px;
    }
    & ::v-deep .el-tabs__item.is-active {
      color: $dark-black;
    }
    & ::v-deep .el-tabs__active-bar {
      background: #07111bff;
    }
  }
  .el-tabs__nav-wrap::after {
    background-color: unset !important;
  }
  .left-content {
    width: 840px;
    .comment-sort {
      margin-bottom: 20px;
      .el-radio + .el-radio {
        margin-left: 17px;
      }
    }
    .comment-sort ::v-deep .el-radio-button__inner {
      background: transparent !important;
      border: none;
    }
    .comment-sort
      ::v-deep
      .el-radio-button__orig-radio:checked
      + .el-radio-button__inner {
      color: #ff783c;
    }
    .comment-sort ::v-deep .el-radio__input {
      display: none;
    }
  }
  .right-content {
    width: 340px;
  }
  .recommend-courses {
    // padding: 30px;
    position: relative;
    top: -192px;
    .recommend-title {
      color: #07111b;
      margin-bottom: 20px;
      font-weight: bold;
    }
  }
}
.no-info {
  width: 100%;
  margin: 100px 0;
  text-align: center;
}
</style>
