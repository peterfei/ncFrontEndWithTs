<template>
  <div class="video-player" v-if="chapter[0]">
    <video-head
      :mooc_package_id="chapter[0].mooc_package_id"
      :mooc_issue_id="chapter[0].mooc_issue_id"
    ></video-head>
    <div class="video-content">
      <!-- {{ Syllabuses }} -->
      <div class="video-sidebar" ref="a" v-if="chapter[0]">
        <video-sidebar
          @chapterClick="chapterClick"
          :chapter="chapter"
          :mooc_issue_id="chapter[0].mooc_issue_id"
          :mooc_package_id="chapter[0].mooc_package_id"
          :Syllabuses="Syllabuses"
        ></video-sidebar>
      </div>
      <div class="player" v-if="{ temp_data }">
        <!-- {{questionData}} -->
        <header-nav
          :chapter="chapter"
          @starTestClick="starTestClick"
          :questionData="temp_data"
        >
          <!--starTestClick 父组件接收子组件HeaderNav传过来资源id-->
        </header-nav>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import VideoHead from './components/VideoHead.vue' // 视频播放头部
import VideoSidebar from './components/VideoSidebar.vue' // 左侧导航
import HeaderNav from './components/HeaderNav.vue'
import Cloud from '@/api/cloud'
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
@Component({
  components: {
    VideoHead,
    VideoSidebar,
    HeaderNav
  }
})
export default class VideoPlayer extends Vue {
  @Prop({ default: () => {} }) questionData!: object
  chapter: object = {}
  Syllabuses: Array<any> = []
  syllabuseId: number = 0
  sub_id: number = 0
  mooc_issue_id: number = 0
  public temp_data: object = {}
  mounted() {
    this.temp_data = this.questionData
    console.log('路由中获取章id', this.$route)
    this.syllabuseId = +this.$route.params.syllabuseId // 路由中获取章id
    console.log('syllabuseId====', this.syllabuseId)
    this.sub_id = +this.$route.params.sub_id // 路由中获取节id
    console.log('sub_id=====', this.sub_id)
    this.mooc_issue_id = +this.$route.params.mooc_issue_id // 路由种获取期id
    console.log('mooc_issue_id=====', this.mooc_issue_id)
    this.getChapter()
    this.getSyllabuses()
  }
  // 大纲
  getSyllabuses() {
    console.log('xuexi', this.mooc_issue_id)
    Cloud.getSyllabuses(this.mooc_issue_id).then((res: any) => {
      this.Syllabuses = res
      console.log('大纲=======', res)
    })
  }
  // 获取章下面小节内容
  getChapter() {
    const params = {
      syllabuseId: this.syllabuseId, // 章id
      sub_id: this.sub_id // 节id
    }
    Cloud.getChapter(params).then((res: any) => {
      this.chapter = res
      console.log('章节', this.chapter)
    })
  }
  // 点章节刷新章节下内容
  chapterClick(data: any) {
    console.log('章id节id', data.zId, data.jId)
    const objz = {
      syllabuseId: data.zId, // 章id
      sub_id: data.jId // 节id
    }
    console.log('zj', objz)
    Cloud.getChapter(objz).then((res: object) => {
      console.log('zj1111', objz)
      this.chapter = res
    })
    // this.getSyllabuses();
    // this.getChapter();// 调取刷新章节下的内容
  }

  // 获取测验答题
  starTestClick(id: any) {
    console.log('index', id)
    Cloud.getQuestion(id).then((res: any) => {
      this.temp_data = res
      // console.log('测验答题', this.questionData)
    })
  }
  @Watch('questionData')
  onQuestionDataChange(val: object, oldVal: object) {
    this.temp_data = val
  }
  // 点章节刷新章节下内容
  //     // 点章节刷新章节下内容
  // chapterClick(data: any) {
  //   console.log('章id节id', data.zId, data.jId)
  //   const objz = {
  //     syllabuseId: data.zId, // 章id
  //     sub_id: data.jId // 节id
  //   }
  //   console.log('zj', objz)
  //   Cloud.getChapter(objz).then((res: any) => {
  //     console.log('zj1111', objz)
  //     this.chapter = res
  //     console.log('gheghe', res)
  //   })
  //   // this.getSyllabuses();
  //   // this.getChapter();// 调取刷新章节下的内容
  // }
}
// export default {
//   name: 'VideoPlayer',
//   components: {
//     VideoHead,
//     // VideoSidebar,
//     HeaderNav
//   },
//   data() {
//     return {
//       chapter: [],
//       questionData: [],
//       Syllabuses: []
//     }
//   },
//   mounted() {
//     console.log('路由中获取章id', this.$route)
//     this.syllabuseId = this.$route.params.id // 路由中获取章id
//     this.sub_id = this.$route.params.jid // 路由中获取节id
//     this.mooc_issue_id = this.$route.params.issid // 路由种获取期id
//     // console.log('节id', this.sub_id);

//     this.getChapter()
//     this.getSyllabuses()
//   },
//   methods: {
//     handleHeaderNavClick() {
//       console.log('大岗还是讨论或其他')
//     },
//     syllabusClick() {
//       console.log('1111111111111')
//     },
//     // 获取章下小节内容
//     getChapter() {
//       const obj = {
//         syllabuseId: this.syllabuseId, // 章id
//         sub_id: this.sub_id // 节id
//       }
//       Cloud.getChapter(obj).then(res => {
//         this.chapter = res
//         // console.log('章节', this.chapter);
//       })
//     },
//     // 点章节刷新章节下内容
//     chapterClick(data) {
//       console.log('章id节id', data.zId, data.jId)
//       const objz = {
//         syllabuseId: data.zId, // 章id
//         sub_id: data.jId // 节id
//       }
//       console.log('zj', objz)
//       Cloud.getChapter(objz).then(res => {
//         console.log('zj1111', objz)
//         this.chapter = res
//       })
//       // this.getSyllabuses();
//       // this.getChapter();// 调取刷新章节下的内容
//     },
//     // 大纲
//     getSyllabuses() {
//       console.log('xuexi', this.mooc_issue_id)
//       Cloud.getSyllabuses(this.mooc_issue_id).then(res => {
//         this.Syllabuses = res
//       })
//     },

//     // 获取测验答题
//     starTestClick(id) {
//       // console.log('index', id);
//       Cloud.getQuestion(id).then(res => {
//         this.questionData = res
//         // console.log('测验答题', this.questionData);
//       })
//     },
//     // 提交作业
//     submitAssignment(postObj) {
//       console.log(JSON.parse(postObj.answer_data).content)
//       const uploadContent = JSON.parse(postObj.answer_data).content
//       if (!uploadContent) {
//         // 内容不能为空
//         this.$message({
//           message: '内容不能为空',
//           type: 'error'
//         })
//         return
//       }
//       Cloud.getHomeworkSubmit(postObj).then(res => {
//         this.HomeworkData = res
//         this.getChapter()
//         console.log('提交作业数据', this.HomeworkData)
//       })
//     }
//   }
// }
</script>

<style lang="scss" scoped>
.video-player {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f7f8fa;
}
.video-player .video-content {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: calc(100vh - 60px);
  min-width: 1200px;
  min-height: calc(100vh - 60px);
  width: 100%;
}
.video-player .video-content .video-sidebar {
  // width: 470px;
  background: #fff;
}
.player {
  width: 1460px;
}
</style>
