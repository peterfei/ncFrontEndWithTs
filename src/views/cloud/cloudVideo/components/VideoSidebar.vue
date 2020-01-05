<template>
  <div class="videoSidebar clearfix">
    <!-- {{ Syllabuses }} -->
    <el-tabs
      :tab-position="tabPosition"
      style="height: 100%"
      @tab-click="tabClick"
    >
      <el-tab-pane ref="companyStyle" v-bind:style="{ width: Width }">
        <span slot="label">
          <i class="el-icon-date"></i> <label>大纲</label>
        </span>
        <!-- 大纲 -->
        <!-- {{ Syllabuses }} -->
        <sidebar-content
          @chapterClick="chapterClick"
          :Syllabuses="Syllabuses"
        ></sidebar-content>
      </el-tab-pane>
      <el-tab-pane name="dis">
        <span slot="label">
          <i class="el-icon-date"></i> <label>讨论q</label>
        </span>
        <!-- <el-button @click="drawer = true" type="primary" style="margin-left: 16px;"> -->
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import SidebarContent from './SidebarContent.vue'
// import MiniPagination from '../../../components/MiniPagination/MiniPagination.vue';
import Cloud from '@/api/cloud'
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({
  components: {
    SidebarContent
  }
})
export default class VideoSidebar extends Vue {
  @Prop({ default: () => [] }) Syllabuses!: Array<any>
  replyDiscusId: null = null
  replyDiscusContent: string
  replyReplyObj: object = {}
  replyReplyContent: string
  tabPosition: string = 'left'
  diolog: boolean = false
  mask: boolean = false
  textarea: string
  dialogVisible: boolean = false
  mytext: string
  commentaryArea: boolean
  Width: string = '400px'
  myWidth: string = `${window.innerWidth - 60}px`
  releaseData: Array<any> = []
  ListDisscussion: Array<any> = []
  Replies: Array<any> = []
  mooc_discussion_id: string
  page: number = 1
  // Syllabuses: Array<any> = []

  chapterClick(obj: any) {
    console.log('obj', obj)
    this.$emit('chapterClick', obj)
  }

  // 评论区碳层
  tabClick(e: any) {
    console.log('111111')
    this.getListDisscussion() // 帖子列表
    if (e.name === 'a') {
      this.diolog = true
      this.mask = true
    } else {
      this.diolog = false
      this.mask = false
    }
  }
  // dialogVisible: false,
  //     // input: '',
  //     mytext: '',
  //     commentaryArea: true,
  //     Width: '400px',
  //     myWidth: `${window.innerWidth - 60}px`,
  //     releaseData: [],
  //     ListDisscussion: [],
  //     Replies: [],
  //     mooc_discussion_id: '',
  //     page: 1,
  // @Prop({ default: () => [] }) moocList!: Array<object> //子组件接收到父组件传过来的数组
  // @Prop({ default: () => [] }) pageMeta!: Array<object>
  //  replyDiscusId: null,
  //     replyDiscusContent: '',
  //     replyReplyObj: {},
  //     replyReplyContent: '',
  //     tabPosition: 'left',
  //     diolog: false,
  //     mask: false,
  //     textarea: '',
}
// export default {
//   name: 'VideoSidebar',
//   props: {
//     mooc_issue_id: {},
//     mooc_package_id: {},
//     Syllabuses: {}
//   },
//   components: {
//     SidebarContent
//     // MiniPagination,
//   },
//   data() {
//     return {
//       modal: false,
//       dialog: false,
//       loading: false,
//       drawer: false,
//       // 正在给哪个讨论进行回复
//       replyDiscusId: null,
//       replyDiscusContent: '',
//       replyReplyObj: {},
//       replyReplyContent: '',
//       tabPosition: 'left',
//       diolog: false,
//       mask: false,
//       textarea: '',
//       replaypop: false,
//       dialogVisible: false,
//       input: '',
//       mytext: '',
//       commentaryArea: true,
//       Width: '400px',
//       myWidth: `${window.innerWidth - 60}px`,
//       releaseData: [],
//       ListDisscussion: [],
//       Replies: [],
//       mooc_discussion_id: '',
//       page: 1
//     }
//   },
//   beforeRouteUpdate(to, from, next) {
//     // // 获取分类的id
//     // this.cateId = to.query.type;
//     next()
//   },
//   methods: {
//     handleOpen(done) {
//       // if (this.loading) {
//       //   return;
//       // }

//       this.loading = true
//       this.timer = setTimeout(() => {
//         done()
//         // 动画关闭需要一定的时间
//         setTimeout(() => {
//           this.loading = false
//         }, 100)
//       }, 1000)
//     },
//     // 点赞
//     support(item) {
//       // console.log('item.id', item.id);// 帖子id
//       const supportObj = {
//         type: '1',
//         id: item.id
//       }
//       Cloud.MoocList.getSupportDis(supportObj).then(rec => {
//         this.supports = rec
//         this.ListDisscussion = this.ListDisscussion.map(res => {
//           // 用map遍历this.ListDisscussion
//           const obj = res
//           // console.log('obj.id', obj.id);// 帖子id当前
//           if (obj.id === item.id) {
//             if (item.praised === 1) {
//               return { ...obj, praised: 0, thumb_cnt: item.thumb_cnt - 1 }
//             }
//             if (item.praised === 0) {
//               return { ...obj, praised: 1, thumb_cnt: item.thumb_cnt + 1 }
//             }
//           }
//           return obj
//         })
//       })
//     },
//     // 回复点赞
//     supportReplay(item1) {
//       const supportObj = {
//         type: '2',
//         id: item1.id
//       }
//       Cloud.MoocList.getSupportDis(supportObj).then(rec => {
//         this.supports = rec
//         this.ListDisscussion = this.ListDisscussion.map(res => {
//           // 用map遍历this.ListDisscussion
//           const obj = res
//           // console.log('obj.id', obj.id);// 帖子id当前
//           if (obj.id === item1.id) {
//             if (item1.praised === 1) {
//               return {
//                 ...obj,
//                 reply_praised: 0,
//                 thumb_cnt: item1.thumb_cnt - 1
//               }
//             }
//             if (item1.praised === 0) {
//               return {
//                 ...obj,
//                 reply_praised: 1,
//                 thumb_cnt: item1.thumb_cnt + 1
//               }
//             }
//           }
//           this.$set(obj, 'replysMeta', res.meta)
//           this.$set(obj, 'replysMeta', rec.data)
//           return obj
//         })
//       })
//     },
//     // 回复分页
//     replyPageChange(page, obj) {
//       console.log('page,obj', typeof obj.replysMeta)
//       this.getListReplies(obj.id, page).then(res => {
//         this.$set(obj, 'replysMeta', res.meta)
//         this.$set(obj, 'replys', res.data)
//         // this.$set(‘对象名’,要修改的属性名,属性值)
//       })
//     },
//     chapterClick(obj) {
//       this.$emit('chapterClick', obj)
//     },
//     // 评论区碳层
//     tabClick(e) {
//       console.log('111111')
//       this.getListDisscussion() // 帖子列表
//       // const obj = document.getElementById('maskDiolog');
//       // obj.style.pixelWidth = window.screen.width - 60;
//       // console.log('gag', obj.style.pixelWidth);
//       // console.log(e);
//       if (e.name === 'dis') {
//         // this.$message.success('弹框');
//         this.diolog = true
//         this.mask = true
//       } else {
//         // this.$message.error('关闭弹框');
//         this.diolog = false
//         this.mask = false
//         // this.el-tab-pane.style = "width:500px";
//       }
//     },
//     // 评论区遮罩
//     maskClick() {
//       console.log('ff')
//       this.diolog = false
//       this.mask = false
//     },
//     // 关闭评论
//     closeButton() {
//       console.log('ff')
//       this.diolog = false
//       this.mask = false
//     },
//     // 回帖
//     replayUp(obj) {
//       console.log('obgshshishish', obj)
//       this.mooc_discussion_id = obj.id
//       if (this.replyDiscusId === obj.id) {
//         this.replyDiscusId = null
//       } else {
//         this.getRepliesByDisscussion(obj).then(() => {
//           this.replyDiscusId = obj.id
//         })
//       }
//     },
//     // 回复帖子
//     repliesBtn() {
//       console.log('aa')
//       console.log('shishishishi', this.replyDiscusContent) // 帖子内容
//       // this.commentaryArea = true;
//       console.log('shima', this.mooc_discussion_id) // 帖子id
//       const postObj = {
//         content: this.replyDiscusContent, // 帖子内容
//         mooc_discussion_id: this.mooc_discussion_id // 帖子id
//       }
//       Cloud.MoocList.getReplies(postObj).then(res => {
//         this.Replies = res
//         console.log('回复', this.Replies)
//         this.getListDisscussion()
//       })
//       // console.log('jjjjjjjaaaa', this.commentaryArea);
//     },
//     // 回复给人
//     replyBtn() {
//       console.log('回复给人回复内容===', this.replyReplyContent)
//       const postObj = {
//         content: this.replyReplyContent, // 帖子内容
//         mooc_discussion_id: this.mooc_discussion_id, // 帖子id
//         to_user_id: this.to_user_id // 被回复人id
//       }
//       Cloud.MoocList.getReplies(postObj).then(res => {
//         this.Replies = res
//         console.log('回复', this.Replies)
//         this.getListDisscussion()
//       })
//     },

//     // 回帖内容
//     // replayContent() {
//     //   console.log('11');
//     //   this.commentaryArea = true;
//     // },
//     // 回复给某人
//     replyClick(obj) {
//       this.to_user_id = obj.user_id // 被回复人id
//       console.log('被回复人id', this.to_user_id)
//       if (this.replyReplyObj.id === obj.id) {
//         this.replyReplyObj = {}
//       } else {
//         this.getRepliesByDisscussion(obj).then(() => {
//           // this.replyReplyObj = obj.id;
//           this.replyReplyObj = obj
//         })
//         this.replyReplyObj = obj
//       }
//     },
//     // 我要发帖弹层关闭
//     handleClose(done) {
//       console.log('ggg')
//       this.$confirm('确认关闭？')
//         .then(() => {
//           done()
//         })
//         .catch(() => {})
//     },
//     newAddBtn() {
//       const me = this
//       this.$nextTick(() => {
//         me.inputStyWidth = `${me.$refs.companyStyle.$el.clientWidth}px`
//         console.log('me', me.inputStyWidth)
//       })
//     },
//     inputTit() {
//       // console.log(this.mytext);
//     },
//     inputTextarea() {
//       // console.log(this.textarea);
//     },
//     // 发布帖子
//     release() {
//       const postObj = {
//         title: this.mytext,
//         content: this.textarea,
//         mooc_package_id: this.mooc_issue_id,
//         mooc_issue_id: this.mooc_package_id
//       }
//       Cloud.MoocList.getDiscussion(postObj).then(res => {
//         this.releaseData = res
//         console.log('发布数据', this.releaseData)
//         this.getListDisscussion()
//       })

//       this.dialogVisible = false
//     },
//     // 帖子列表
//     getListDisscussion() {
//       Cloud.MoocList.getListDisscussion(this.mooc_package_id).then(res => {
//         this.ListDisscussion = res.data
//         // this.ListDisscussion.forEach((rec) => {
//         //   this.getListReplies(rec.id).then((resp) => {
//         //     console.log('resp shi', resp);
//         //     this.$set(rec, 'replysMeta', resp.meta);
//         //     this.$set(rec, 'replys', resp.data);
//         //   });
//         // });
//       })
//     },
//     getRepliesByDisscussion(rec) {
//       return this.getListReplies(rec.id).then(resp => {
//         console.log('resp shi', resp)
//         this.$set(rec, 'replysMeta', resp.meta)
//         this.$set(rec, 'replys', resp.data)
//       })
//     },
//     // 回帖列表
//     getListReplies(id, page = 1) {
//       return Cloud.MoocList.getListReplies(id, page)
//     }
//   },
//   mounted() {
//     const that = this
//     window.onresize = () =>
//       (() => {
//         window.screenWidth = document.body.clientWidth
//         that.screenWidth = window.screenWidth
//       })()
//   }
// }
</script>

<style lang="scss" scoped>
.videoSidebar {
  position: relative;
  height: 100%;
  &::v-deep .el-tabs__header {
    width: 59px;
    background: #1c1f21;
  }
  &::v-deep .el-tabs__item.is-active {
    background: #25282b;
    color: rgba(255, 255, 255, 1);
    opacity: 0.6;
  }
  &::v-deep .el-tabs__item {
    font-size: 12px;
    color: rgba(255, 255, 255, 1);
    opacity: 0.3;
    height: 74px;
    width: 100%;
  }
  &::v-deep .el-tabs__item span {
    display: flex;
    flex-direction: column;
    justify-content: baseline;
    align-items: center;
    padding-top: 20px;
    line-height: 25px;
  }
  &::v-deep .el-tabs__nav {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  &::v-deep .el-tabs__nav-wrap::after {
    background-color: #1c1f21;
  }
  &::v-deep .el-tabs__active-bar {
    background: none;
  }
  &::v-deep .el-tabs--left .el-tabs__header.is-left {
    margin-right: 0px;
  }
  &::v-deep .post-diolog .el-dialog {
    border-radius: 10px;
  }
  &::v-deep .post-diolog .el-dialog__header {
    padding-left: 40px;
    padding-right: 40px;
    padding-top: 34px;
  }
  &::v-deep .post-diolog .el-dialog__title {
    font-size: 15px;
    font-weight: bold;
    color: rgba(65, 71, 77, 1);
  }
  &::v-deep .post-diolog .el-button--success {
    background: #35cc67;
    border: none;
    width: 100px;
    height: 48px;
  }
  &::v-deep .post-diolog .is-plain {
    width: 100px;
    border: none;
    color: #8a9199;
  }
  &::v-deep .post-diolog .el-button.is-plain:hover,
  .el-button.is-plain:focus {
    border: none;
    color: #8a9199;
  }
  &::v-deep .post-diolog .el-dialog__footer {
    padding: 10px 40px 36px;
  }
  &::v-deep .post-diolog .el-dialog__body {
    padding: 5px 40px 20px;
    font-size: 12px;
    color: #8a9199;
  }
  &::v-deep .post-diolog .el-textarea__inner {
    margin-top: 10px;
    height: 153px;
    resize: none;
    padding-top: 12px;
  }
}
.commont {
  width: 800px;
  height: calc(100vh - 70px);
  background: #fff;
  position: absolute;
  top: 0px;
  left: 60px;
  z-index: 11;
  padding: 20px;
  overflow: auto;
}
.commontContent {
  display: flex;
  flex-direction: column;
}
.commontContent .title {
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
  align-items: center;
}
.commontContent .title .commont-area {
  font-size: 16px;
  font-weight: bold;
  color: rgba(10, 18, 26, 1);
  margin-right: 10px;
}
.commontContent .title .post {
  font-size: 14px;
  font-weight: bold;
  color: rgba(243, 134, 34, 1);
}
.commontList {
  display: flex;
  flex-direction: row;
  padding-bottom: 30px;
}
.commontList img {
  width: 40px;
  height: 40px;
  background: rgba(36, 43, 51, 1);
  margin-right: 10px;
}
.listContent {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-top: -3px;
  position: relative;
  .commentaryArea .reply-info .replyBox {
    margin-top: 16px;
    &::v-deep.el-textarea__inner {
      font-weight: bold;
      color: rgba(182, 186, 191, 1);
      line-height: 22px;
      resize: none;
    }
    &::v-deep .el-textarea__inner:focus {
      border-color: #eee;
    }
    &::v-deep .el-textarea__inner:hover {
      border-color: #eee;
    }
    &::v-deep .el-textarea {
      font-size: 12px;
    }
  }
}
.listContent .Publisher {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.listContent .Publisher .name {
  font-size: 12px;
  color: rgba(8, 17, 26, 1);
  margin-right: 3px;
  margin-bottom: 5px;
}
.listContent .Publisher .job {
  // width:31px;
  height: 16px;
  background: rgba(238, 132, 34, 1);
  border-radius: 3px;
  line-height: 17px;
  font-size: 12px;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  padding: 2px;
}
.time {
  font-size: 12px;
  color: rgba(138, 145, 153, 1);
  margin-left: 10px;
}
.listContent .releaseTitle {
  font-size: 14px;
  font-weight: bold;
  color: rgba(36, 43, 51, 1);
  line-height: 30px;
}
.listContent .info {
  font-size: 12px;
  color: rgba(76, 83, 89, 1);
  line-height: 22px;
  margin-bottom: 10px;
}
.listContent .access {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 18px;
}
.listContent .access span {
  font-size: 12px;
  color: rgba(138, 145, 153, 1);
  margin-left: 6px;
}
.listContent .access i {
  font-size: 14px;
  color: #a1aab3;
}
.listContent .access .reply {
  margin-right: 20px;
}
.commentaryArea {
  background: #f7f8fa;
  padding: 20px 20px 20px 20px;
  position: relative;
  display: flex;
  flex-direction: column;
}
.mb20 {
  margin-bottom: 20px;
}
.com-main {
  display: flex;
  flex-direction: row;
}
.commentaryArea:after {
  content: '';
  position: absolute;
  bottom: 100%;
  left: 20px;
  width: 0;
  height: 0;
  border-width: 9px;
  border-style: solid;
  border-color: transparent;
  border-bottom-width: 10px;
  border-bottom-color: currentColor;
  color: #f7f8fa;
}
.commentaryArea img {
  width: 40px;
  height: 40px;
  background: #eee;
}
.commentaryArea .reply-info {
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
}
.commentaryArea .reply-info .r_name {
  font-size: 12px;
  font-weight: bold;
  color: rgba(8, 17, 26, 1);
}
.commentaryArea .reply-info .r_info {
  font-size: 12px;
  color: rgba(76, 83, 89, 1);
  line-height: 22px;
  margin-top: 8px;
}
.commentaryArea .reply-info .reply-time {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 12px;
}
.commentaryArea .reply-info .reply-time span {
  font-size: 12px;
  color: rgba(138, 145, 153, 1);
}
.commentaryArea .reply-info .reply-time .reply-num {
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #a1aab3;
}
.commentaryArea .reply-info .reply-time .reply-num > i {
  font-size: 14px;
}
.commentaryArea .reply-info .reply-time .reply-num .suppor {
  margin-left: 20px;
  margin-top: -2px;
}
.s-span {
  margin-left: 6px;
}

.replyBtn {
  width: 80px;
  height: 36px;
  background: rgba(235, 235, 235, 1);
  border-radius: 5px;
  text-align: center;
  float: right;
  margin-top: 10px;
  color: #b6babf;
  font-size: 14px;
  border: none;
}
.com-border {
  border-bottom: 1px solid #eee;
  height: 1px;
  margin-top: 20px;
}

.mask {
  width: 1860px;
  height: calc(100vh - 70px);
  background: #000;
  position: absolute;
  top: 0px;
  left: 60px;
  opacity: 0.5;
  z-index: 10;
}
.commont-close {
  position: absolute;
  right: 17px;
  top: 10px;
}
</style>
