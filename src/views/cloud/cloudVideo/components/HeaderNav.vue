<template>
  <div class="header-nav">
    <div class="right-nav">
      <el-tabs v-if="chapter[0]" @tab-click="tabClick">
        <!-- {{chapter[0]['data']}} -->
        <el-tab-pane
          v-for="(tab, index) in chapter[0]['data']"
          :key="'tab_' + index"
          :label="tab.label"
          @mouseover="changeMask()"
          @mouseout="mouseout()"
          @mousemove="mousemove()"
        >
          <span slot="label">
            <div v-if="tab.type === 3">
              <i class="icon iconfont icon-ceyan" :class="tab.icon"></i>
              {{ tab.title }}
            </div>
            <div v-if="tab.type === 2">
              <i class="icon iconfont icon-zuoyelianxi" :class="tab.icon"></i>
              {{ tab.title }}
            </div>
            <div v-if="tab.type === 1">
              <i class="icon iconfont icon-ziyuan1" :class="tab.icon"></i>
              {{ tab.title }}
            </div>
            <div v-if="tab.type === 4">
              <i class="icon iconfont icon-ziliao" :class="tab.icon"></i>
              {{ tab.title }}
            </div>
          </span>
          <template v-if="tab.type === 3">
            <course-testing
              :chapter="chapter"
              :title="tab.title"
              :total_score="tab.base_resource.total_score"
              :survey_type="tab.survey_type"
              :options="tab.options"
              :user_score="tab.user_score"
              :id="tab.id"
              @starTestClick="starTestClick"
              :questionData="questionData"
              :clickIndex="clickIndex"
              :qs="qs"
              @changeQs="changeQs"
            >
              <!--starTestClick 父组件接收子组件CourseTesting传过来资源id-->
            </course-testing>
            <!-- 测试 -->
          </template>
          <template v-if="tab.type === 2">
            <!-- @submitAssignment="submitAssignment" -->
            <course-assignments
              :chapter="chapter"
              :title="tab.title"
              :content="tab.base_resource.content"
              :end_time="tab.base_resource.end_time"
              :options="tab.options"
              :user_score="tab.user_score"
              :answer_data="tab.answer_data"
              :id="tab.id"
              :mooc_issue_id="chapter[0].mooc_issue_id"
            ></course-assignments>
            <!-- 作业 -->
          </template>
          <template v-if="tab.type === 1">
            <!-- <ali-player
              :resources-id="resourcesId"
              ref="aliPlayer"
              @snapshoted="snapshoted"
            ></ali-player> -->
            <!-- 视频 -->
          </template>
          <template v-if="tab.type === 4">
            <course-materials
              :chapter="chapter"
              :type="tab.base_resource.type"
              :title="tab.base_resource.title"
              :content="tab.base_resource.content"
            ></course-materials>
            <!-- 资料 -->
          </template>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import CourseAssignments from './CourseAssignments.vue' // 作业组件
import CourseTesting from './CourseTesting.vue' // 测试组件
// import AliPlayer from '@/components/VideoPlayer/AliPlayer.vue'
import CourseMaterials from './CourseMaterials.vue' //资料
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import Cloud from '@/api/cloud'

export interface IMoocTaps {
  type: string
  label: string
  icon: string
}
@Component({
  components: {
    CourseAssignments,
    CourseTesting,
    // AliPlayer,
    CourseMaterials
  }
})
export default class HeaderNav extends Vue {
  @Prop({ default: () => {} }) chapter!: Array<any>
  @Prop({ default: () => {} }) questionData!: object
  clickIndex: number = 0
  testInformation: any
  qs: Array<any> = []
  // vid: string = '9f25c5058d794d68beb0216bb031f42e'
  public tabs: Array<IMoocTaps> = [
    { label: '课程测试', type: 'test', icon: 'icon-ceyan' },
    { label: '课程作业', type: 'task', icon: 'icon-zuoyelianxi' },
    { label: '课程播放', type: 'player', icon: 'icon-ziyuan1' },
    { label: '课程资料', type: 'materials', icon: 'icon-ziliao' }
  ]
  @Watch('chapter')
  chapterWatcher() {
    console.log('on-chapter change:', this.chapter)
  }
  starTestClick(e: number) {
    console.log(e)
    // this.$emit('starTestClick', e) // 资源id传入父级index
  }
  changeQs(click_id: number) {
    console.log(`==========================`)
    // this.tabClick(click_id)
    this.$emit('starTestClick')
  }
  async tabClick(e: any) {
    console.log('=========e=========', e)
    let tmp = -1
    if (e.index == undefined) {
      // e:{index:any}={index:0}
      tmp = e
    } else {
      tmp = e.index
    }
    const testData = this.chapter.map((rec: any) => {
      // console.log(`===========rec`, rec.data[e.index].id)
      return rec.data[tmp].user_score
      // question_id: rec.id,
      // answer: rec.type === 2 ? rec.answer : [rec.answer]
    })
    this.clickIndex = tmp
    // if( tab.type === 3 ){

    // }
    this.qs = await this.getQuestion(this.chapter[0].data[tmp].id)
    console.log('==========questions==============', this.qs)

    // if (e.name === 'a') { this.$message.success('弹框'); } else {
    //   this.$message.error('关闭弹框');
    // }
  }
  get questionsList() {
    return this.qs
  }
  // set questions(newVal) {
  //    this.q  = newVal
  // }
  getQuestion(id: number) {
    return Cloud.getQuestion(id)
  }
}
// export default {
//   name: 'HeaderNav',
//   props: {
//     chapter: {},
//     questionData: {}
//   },
//   components: {
//     CourseAssignments,
//     CourseTesting,
//     // AliPlayer,
//     CourseMaterials
//   },
//   data() {
//     return {
//       tabs: [
//         { label: '课程测试', type: 'test', icon: 'icon-ceyan' },
//         { label: '课程作业', type: 'task', icon: 'icon-zuoyelianxi' },
//         { label: '课程播放', type: 'player', icon: 'icon-ziyuan1' },
//         { label: '课程资料', type: 'materials', icon: 'icon-ziliao' }
//       ],
//       resourcesId: '2',
//       vid: '9f25c5058d794d68beb0216bb031f42e'
//     }
//   },
//   methods: {
//     changeMask() {
//       console.log('1')
//       const dom = document.target
//       console.log('dom', dom)
//     },
//     submitAssignment(postObj) {
//       // console.log('womn', postObj);
//       this.$emit('submitAssignment', postObj)
//     },
//     tabClick(e, d, f) {
//       console.log(e, d, f)
//       // if (e.name === 'a') { this.$message.success('弹框'); } else {
//       //   this.$message.error('关闭弹框');
//       // }
//     },
//     snapshoted(snapObj) {
//       this.$emit('snapshoted', snapObj)
//     },
//     starTestClick(e) {
//       console.log(e)
//       this.$emit('starTestClick', e) // 资源id传入父级index
//     }
//   }
// }
</script>

<style lang="scss" scoped>
.header-nav {
  width: 100%;
  padding: 16px 19px;
  &::v-deep .right-nav .el-tabs__active-bar {
    background: none;
  }
  &::v-deep .right-nav .el-tabs__item {
    min-width: 144px;
    height: 50px;
    background: rgba(235, 237, 240, 1);
    border-radius: 5px;
    margin-right: 10px;
    text-align: center;
    line-height: 50px;
    color: #737980;
    padding: 0px 20px;
  }
  &::v-deep .right-nav .el-tabs--top .el-tabs__item.is-top:nth-child(2),
  .el-tabs--top .el-tabs__item.is-bottom:nth-child(2),
  .el-tabs--bottom .el-tabs__item.is-top:nth-child(2),
  .el-tabs--bottom .el-tabs__item.is-bottom:nth-child(2) {
    padding-left: 20px !important;
  }
  &::v-deep .right-nav .el-tabs--top .el-tabs__item.is-top:last-child,
  .el-tabs--top .el-tabs__item.is-bottom:last-child,
  .el-tabs--bottom .el-tabs__item.is-top:last-child,
  .el-tabs--bottom .el-tabs__item.is-bottom:last-child {
    padding-right: 20px;
  }
  &::v-deep .right-nav .el-tabs__item.is-active {
    background: rgba(243, 134, 34, 1);
    border-radius: 5px;
    color: #fff;
  }
  &::v-deep .right-nav .el-tab-pane {
    height: calc(100vh - 156px);
    width: 100%;
  }
  &::v-deep .right-nav .el-tabs__nav-wrap::after {
    background-color: transparent;
  }
  &::v-deep .el-tabs__item i {
    font-size: 14px;
  }
  &::v-deep.right-nav .el-tabs--top .el-tabs__item.is-top:last-child,
  .right-nav .el-tabs--top .el-tabs__item.is-bottom:last-child,
  .right-nav .el-tabs--bottom .el-tabs__item.is-top:last-child,
  .right-nav .el-tabs--bottom .el-tabs__item.is-bottom:last-child,
  .el-tabs__item.is-top.is-active {
    padding-right: 20px;
  }
  &::v-deep.right-nav .el-tabs--top .el-tabs__item.is-top:nth-child(2),
  .right-nav .el-tabs--top .el-tabs__item.is-bottom:nth-child(2),
  .right-nav .el-tabs--bottom .el-tabs__item.is-top:nth-child(2),
  .right-nav .el-tabs--bottom .el-tabs__item.is-bottom:nth-child(2) {
    padding-left: 20px;
  }
}
</style>
