<template>
  <div class="comment-reply-item">
    <div class="head-img">
      <img :src="item.replie_author ? item.replie_author.avatar : ''" />
    </div>
    <div class="center">
      <div class="title fs14 fcolor-4c">
        {{ replyName ? replyName : '没有用户名' }}
        <span class="fcolor-8b">&nbsp;回复&nbsp;</span>
      </div>
      <div class="container fs14 fcolor-4c reply-content">
        {{ replyContent }}
      </div>
    </div>
    <div class="right fs12 fcolor-8b">
      {{ replyTime | dateFormat('YYYY-MM-DD') }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommentReplyItem',
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    commentUser: {},
    replyName: {},
    replyContent: {},
    replyTime: {},
    replyTo: {}
  }
  // filters: {
  //   dateForm(el) {
  //     return moment(el).format('YYYY-MM-DD');
  //   },
  // },
}
</script>

<style lang="scss" scoped>
.comment-reply-item {
  display: flex;
  .head-img {
    img {
      border-radius: 50%;
      width: 40px;
      height: 40px;
      position: relative;
      top: 5px;
    }
    margin-right: 15px;
    // flex: 0 0 80px;
  }
  .center {
    flex: 1;
    .title {
      margin-bottom: 15px;
    }
    .reply-content {
      color: #4c5258;
    }
  }
  .right {
    flex: 0 0 100px;
    text-align: right;
  }
}
</style>
