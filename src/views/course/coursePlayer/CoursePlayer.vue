<template>
  <div class="video-player">
    <video-header :video-id="packageId"></video-header>
    <div class="video-player-box">
      <div class="video-sidebar-layout">
        <video-sidebar @sideBarbtn="sideBarbtn" ref="leftSidebar">
          <template v-if="leftbarActive === 'chapters'">
            <course-chapters
              @chaptersItem="chaptersItem"
              :chapters-lists="chaptersLists"
              :resource-id="resourceId"
              :package-id="packageId"
            ></course-chapters>
          </template>
          <template v-if="leftbarActive === 'resources'">
            <course-resources
              :resources-list="resourcesList"
              @downloadResource="downloadResource"
            ></course-resources>
          </template>
        </video-sidebar>
      </div>
      <div class="video-center-layout">
        <ali-player
          :resources-id="resourcesId"
          ref="aliPlayer"
          @snapshoted="snapshoted"
        ></ali-player>
        <!-- <ali-player
          @snapshoted="snapshoted"
          :vid="vid"
          ref='aliPlayer'
        ></ali-player> -->
      </div>
      <div class="video-right-layout" ref="rightLayout" style="width:424px;">
        <right-layout
          @triangleBtn="triangleBtn"
          @colseBtn="colseBtn"
          :show-name="rightbarActive"
          :rightbar="rightShow"
        >
          <template v-if="rightbarActive === 'discussion'">
            <course-discussion
              ref="discussion"
              :discussion-list="changDiscussionList"
              @submitDiscussion="submitDiscussion"
            ></course-discussion>
          </template>
          <template v-if="rightbarActive === 'notes'">
            <course-notes
              ref="notes"
              :note-lists="noteLists"
              :resource-id="resourceId"
              @submitNotes="submitNotes"
              @editNotes="editNotes"
              @deleteItemNote="deleteItemNote"
            ></course-notes>
          </template>
          <template slot="lecturer">
            <course-lecturer
              :courseInfoDetail="courseInfoDetail"
              :courseRecommedList="courseRecommedList"
              :lectureCourseList="lectureCourseList"
            ></course-lecturer>
          </template>
        </right-layout>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { Course } from '@/api/courses/courses'
import VideoHeader from './components/VideoHeader.vue' // 视频播放头
import VideoSidebar from './components/VideoSidebar.vue' // 左边导航
import RightLayout from './components/RightLayout.vue' // 右边布局
// import AliPlayer from './components/AliPlayer.vue'; // 中间视频播放器
import CourseLecturer from './components/CourseLecturer.vue' // 教师
import CourseChapters from './components/CourseChapters.vue' // 章节
import CourseDiscussion from './components/CourseDiscussion.vue' // 讨论
import CourseNotes from './components/CourseNotes.vue' // 笔记
import CourseResources from './components/CourseResources.vue' // 资源

export default {
  name: 'CoursePlayer',
  components: {
    VideoHeader,
    VideoSidebar,
    RightLayout,
    // AliPlayer,
    CourseLecturer,
    CourseChapters,
    CourseDiscussion,
    CourseNotes,
    CourseResources
  },
  data() {
    return {
      noteData: null,
      packageId: 1,
      resourceId: 1,
      leftbarActive: '',
      rightbarActive: '',
      rightShow: false,
      leftShow: false,
      resourcesId: '2',
      vid: '9f25c5058d794d68beb0216bb031f42e'
    }
  },
  beforeRouteUpdate(to, from, next) {
    // // 获取课程包的id
    this.packageId = to.params.pid
    this.resourceId = to.params.sid
    next()
  },

  computed: {
    ...mapState({
      // 课程详细信息
      courseInfoDetail: state => state.CoursesDetail.courseDetail,
      // 教师课程
      lectureCourseList: state => state.CoursesDetail.lectureCourseList,
      // 相关课程
      courseRecommedList: state => state.CoursesDetail.coursesRecommendList,
      resourcesList: state => state.CoursePlayer.resourcesList,
      // 笔记列表 notesList
      noteLists: state => state.CoursePlayer.notesList
    }),
    ...mapGetters({
      // 讨论列表
      changDiscussionList: 'CoursePlayer/changDiscussionList',
      // 课程章节列表
      chaptersLists: 'CoursesDetail/chaptersLists'
      // 笔记列表 notesList
      // noteLists: 'CoursePlayer/chageNotesLists',
    })
  },
  mounted() {
    this.packageId = this.$route.params.pid
    this.resourceId = this.$route.params.sid
    // 如果包是空的，直接有路由地址打开，此时课程包为空，资源也空，所以请求获取包资源
    if (!this.chaptersLists.length) {
      this.getCourseDetail(this.packageId) // 获取课程列表
    }
    // 请求课程信息
    this.getLectureCourse({
      packageId: this.packageId,
      limit: 2
    })
    // 讲师课程
    this.getCoursesRecommend({
      packageId: this.packageId,
      limit: 2
    })
    // 相关课程
    this.getDiscussionList(this.resourceId) // 根据包里资源id获取课程资源讨论列表
    this.getResourcesList(this.packageId) // 课程下载资源
    this.getNoteList(this.resourceId) // 获取笔记列表
    // setTimeout(() => {
    //   this.vid = '4280ff6dcf754f4fa249ae403782d466';
    // }, 2000);
  },
  methods: {
    ...mapActions('CoursePlayer', [
      'getDiscussionList', // 讨论列表
      'postDiscussion', // 提交讨论
      'getResourcesList', // 课程下载资源
      'getNoteList', // 笔记列表
      'subNotes', // 提交笔记
      'postEditNote', // 编辑笔记
      'deleteNote', // 删除笔记
      'getDownloadUrl' // 获取下载资源的url
    ]),
    ...mapActions('CoursesDetail', [
      'getCourseDetail', // 课程列表
      'getLectureCourse', // 讲师课程
      'getCoursesRecommend' // 相关课程
    ]),
    // 样式控制
    sideBarbtn(item) {
      if (item === 'chapters' || item === 'resources') {
        this.leftbarActive = item
      }

      if (item === 'discussion' || item === 'notes') {
        if (!this.rightbarActive) {
          this.rightbarActive = item
          if (this.rightShow) {
            this.triangleBtn()
          }
        } else if (this.rightbarActive === item) {
          // 如果有值并相同 关闭
          this.colseBtn()
        } else {
          this.rightbarActive = item
        }
      }
    },
    // 样式控制
    triangleBtn() {
      if (this.$refs.rightLayout.style.width === '60px') {
        this.$refs.rightLayout.style.width = '424px'
        this.rightShow = false
      } else {
        this.$refs.rightLayout.style.width = '60px'
        this.rightShow = true
      }
    },
    // 样式控制
    colseBtn() {
      this.rightbarActive = ''
      this.triangleBtn()
    },
    // 提交讨论
    async submitDiscussion(postdata) {
      try {
        // 回去播放的时长
        const obj = Object.assign(
          {
            course_package_id: parseInt(this.packageId, 10),
            course_resource_id: parseInt(this.resourceId, 10)
          },
          postdata
        )
        await this.postDiscussion(obj)
        this.$refs.discussion.resetForm('ruleForm')
        this.$notify({
          title: '讨论提交成功',
          message: '',
          type: 'success'
        })
      } catch (err) {
        this.$message.error(err.data.message)
      }
    },
    // 点击选择观看资源
    chaptersItem() {
      // this.vid = '4280ff6dcf754f4fa249ae403782d466';
      // console.log(this.vid);
      // console.log('观看资源=', id);
    },

    // 提交笔记和截图
    async snapshoted(snapObj) {
      try {
        this.noteData = Object.assign(this.noteData, snapObj)
        await this.subNotes(this.noteData)
        this.$refs.notes.subResetForm('subForm')
        this.$notify({
          title: '笔记提交成功',
          message: '',
          type: 'success'
        })
      } catch (err) {
        this.$message.error(err.data.message)
      }
    },
    // 提交笔记
    async submitNotes(postData) {
      this.noteData = postData
      // 如果开启切屏
      if (postData.SnapShoted) {
        // 获取切屏
        this.$refs.aliPlayer.snapshot()
      } else {
        // 直接发送数据
        try {
          await this.subNotes(this.noteData)
          this.$refs.notes.subResetForm('subForm')
          this.$notify({
            message: '笔记提交成功',
            type: 'success'
          })
        } catch (err) {
          this.$message.error(err.data.message)
        }
      }
    },
    // 编辑笔记
    async editNotes(postData) {
      try {
        await this.postEditNote(postData)
        this.$refs.notes.editResetForm('editForm')
        this.$notify({
          message: '笔记编辑成功',
          type: 'success'
        })
      } catch (err) {
        this.$message.error(err.data.message)
      }
    },
    // 删除笔记
    async deleteItemNote(postData) {
      try {
        await this.deleteNote(postData)
        console.log(111111111)
        this.$notify({
          message: '笔记删除成功',
          type: 'success'
        })
      } catch (err) {
        this.$message.error(err.data.message)
      }
    },
    // 资源下载
    async downloadResource(postData) {
      try {
        const url = await Course.getDownloadUrl(postData)
        this.$confirm('你确定要下载该文件吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            window.open(url.download_url, '_blank')
            this.$message({
              type: 'success',
              message: '下载成功!'
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '取消下载'
            })
          })
      } catch (err) {
        this.$message.error(err.data.message)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.video-player-box {
  width: 100%;
  min-width: 1200px;
  height: calc(100vh - 70px);
  min-height: calc(100vh - 70px);
  background-color: #1c1f21;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  overflow: hidden;
}
.video-sidebar-layout {
  width: 60px;
  height: 100%;
  background-color: #1c1f21;
}
.video-center-layout {
  position: relative;
  display: flex;
  flex: 1;
  overflow: hidden;
  margin: 10px 0;
  // border-radius: 10px;
  background-color: #000;
}
.video-right-layout {
  height: auto;
  background-color: #1c1f21;
  transition: width 0.3s;
}
.dom-mask {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  opacity: 0;
}
</style>
