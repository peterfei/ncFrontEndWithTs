<template>
  <div class="course-comment-item">
    <el-card
      class="box-card comment-box"
      :body-style="boxCardStyle"
    >
      <div class="head-img">
        <img :src="item.author.avatar">
      </div>
      <div class="right">
        <div class="title">
          <span class="real-name fs14 fcolor-4c">{{commentName}}</span>
          <span class="rate-value">
            <ele-rate :starts="rateValue">
            </ele-rate>
          </span>
        </div>
        <div class="comment-content fs14 fcolor-4c" v-html='commentContent'>
        </div>
        <div class="ctrl-panel">
          <el-button
            size="mini"
            :style="{color: item.is_favorite === 0 ? '#8B9199FF': '#4C5258FF' ,
            backgroundColor: item.is_favorite === 0 ? '#E7E7E7FF': '#B7BBBFFF'}"
            @click="thumbsUp(item)"
            class=""
          ><i class="icon iconfont icon-zan"
          >
          </i>&nbsp; {{likeNum}}</el-button>
          <el-button
            type="text"
            size="mini"
            @click="showReplyForm(item)"
            v-if="!ReplyItem"
          >回复</el-button>
          <div class="space"></div>
          <span class="fs12 fcolor-8b comment-time">{{created_at|dateFormat}}</span>
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
          :reply-to="item.author?item.author.name:'没有'"
        ></comment-reply-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import EleRate from '@/components/element/EleRate.vue';
import CommentReplyItem from './CommentReplyItem.vue';
import CommentReplyForm from './CommentReplyForm.vue';

export default {
  name: 'CourseCommentItem',
  components: {
    CommentReplyItem,
    CommentReplyForm,
    EleRate,
  },
  // props: ['item'], // TODO: 类型定义
  props: {
    packageId: {
      type: [Number, String],
      default: null,
    },
    commentReply: {
      type: Object,
      default: () => {},
    },
    // 评论用户名
    commentName: {},
    // 评论内容
    commentContent: {},
    // 点赞数
    likeNum: {},
    // 是否点过赞
    isFavorite: {},
    // 创建时间
    created_at: {},
    rateValue: {},
    replyName: {},
    replyImg: {},
    item: {
      type: Object,
      default: () => {},
    },

    ReplyItem: {},
  },
  data() {
    return {
      value5: 5,
      boxCardStyle: {
        display: 'flex',
        padding: '30px 30px 10px 30px',
        width: '840px;',
      },
      showReply: false,
      commentId: null, // 回复id
    };
  },
  mounted() {
  },
  methods: {
    submtReply(obj) {
      this.showReply = false;
      this.$emit('submtReply', obj);
    },
    canleReply() {
      this.showReply = false;
    },
    showReplyForm(item) {
      this.commentId = item.id;
      this.showReply = true;
    },
    // 点赞方法
    thumbsUp(item) {
      const postObj = {
        id: this.packageId,
        comment_id: item.id,
        type: item.is_favorite === 0 ? 1 : 2,
      };
      this.$emit('thumbsUp', postObj);
    },
  },
};
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
