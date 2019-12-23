<template>
  <div class="course-comment-item">
    <el-card class="box-card comment-box" :body-style="boxCardStyle">
      <div class="head-img">
        <img :src="item.author.avatar" />
      </div>
      <div class="right">
        <div class="title">
          <span class="real-name fs14 fcolor-4c">{{ commentName }}</span>
          <span class="rate-value">
            <ele-rate :starts="rateValue"> </ele-rate>
          </span>
        </div>
        <div
          class="comment-content fs14 fcolor-4c"
          v-html="commentContent"
        ></div>
        <div class="ctrl-panel">
          <el-button
            size="mini"
            :style="{
              color: item.is_favorite === 0 ? '#8B9199FF' : '#4C5258FF',
              backgroundColor:
                item.is_favorite === 0 ? '#E7E7E7FF' : '#B7BBBFFF'
            }"
            @click="thumbsUp(item)"
            class=""
            ><i class="icon iconfont icon-zan"> </i>&nbsp;
            {{ likeNum }}</el-button
          >
          <el-button
            type="text"
            size="mini"
            @click="showReplyForm(item)"
            v-if="!ReplyItem"
            >回复</el-button
          >
          <div class="space"></div>
          <span class="fs12 fcolor-8b comment-time">{{
            created_at | dateFormat
          }}</span>
        </div>
        <!-- {{item.comment_reply.created_at}} -->
        <comment-reply-item
          v-if="ReplyItem"
          :item="item.comment_reply"
          :replyTime="item.comment_reply.created_at"
          :replyContent="item.comment_reply.content"
          :replyName="item.comment_reply.replie_author"
        >
        </comment-reply-item>
        <br />
        <comment-reply-form
          v-if="showReply"
          @onCancle="canleReply"
          @onSubmit="submtReply"
          :commentId="commentId"
          :packageId="packageId"
          :reply-to="item.author ? item.author.name : '没有'"
        ></comment-reply-form>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import EleRate from '@/components/element/EleRate.vue'
import CommentReplyItem from './CommentReplyItem.vue'
import CommentReplyForm from './CommentReplyForm.vue'
import { IBoxCardStyle } from '@/types'
@Component({
  components: {
    CommentReplyItem,
    CommentReplyForm,
    EleRate
  }
})
export default class CourseCommentItem extends Vue {
  // props: ['item'], // TODO: 类型定义
  @Prop({ type: [Number, String], default: null }) packageId!: string
  @Prop({
    type: Object,
    default: () => {}
  })
  commentReply!: object
  // 评论用户名
  @Prop({ default: '' }) commentName!: string
  // 评论内容
  @Prop({ default: '' }) commentContent!: string
  // 点赞数
  @Prop({ default: '' }) likeNum!: string
  // 是否点过赞
  @Prop({ default: '' }) isFavorite!: string
  // 创建时间
  @Prop({ default: '' }) created_at!: string
  @Prop({ default: '' }) rateValue!: string
  @Prop({ default: '' }) replyName!: string
  @Prop({ default: '' }) replyImg!: string
  @Prop({ type: Object, default: () => {} }) item!: object
  @Prop({ default: '' }) ReplyItem!: string
  public value5: Number = 5
  public boxCardStyle: IBoxCardStyle = {
    display: 'flex',
    padding: '30px 30px 10px 30px',
    width: '840px;'
  }
  public showReply: Boolean = false
  public commentId: String | any = null // 回复id
  public submtReply(obj: any) {
    this.showReply = false
    this.$emit('submtReply', obj)
  }
  canleReply() {
    this.showReply = false
  }
  showReplyForm(item: any) {
    this.commentId = item.id
    this.showReply = true
  }
  // 点赞方法
  thumbsUp(item: any) {
    const postObj = {
      id: this.packageId,
      comment_id: item.id,
      type: item.is_favorite === 0 ? 1 : 2
    }
    this.$emit('thumbsUp', postObj)
  }
}
</script>

<style lang="scss" scoped>
.course-comment-item {
  .comment-box {
    width: 100%;
    border-radius: 10px;
  }
  margin-bottom: 12px;
  display: flex;
  width: 100%;
  .head-img {
    flex: 0 0 80px;
    width: 50px;
    height: 50px;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }
  .right {
    flex: 1;
    .title {
      display: flex;
      justify-content: space-between;
      margin-bottom: 15px;
    }
    .comment-content {
      margin-bottom: 35px;
    }
    .ctrl-panel {
      display: flex;
      margin-bottom: 26px;
      button {
        width: 60px;
        height: 30px;
        transition: 0.4s;
        border: none;
      }
      .el-button--default {
        background: #e7e7e7;
        border-radius: 15px;
      }
      .el-button--default:hover {
        background: #b7bbbf;
        color: #0a121a;
        border: none;
      }
      .el-button--text {
        color: #8b9199;
        width: 30px;
      }
      .comment-time {
        position: relative;
        top: 8px;
      }
      .space {
        flex: 1;
      }
    }
  }
}
</style>
