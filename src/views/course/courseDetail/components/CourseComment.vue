<template>
  <div>
    <course-comment-input></course-comment-input>
    <other-comment-item :usercomments="comments">
    </other-comment-item>
  </div>
</template>

<script>
import CourseCommentInput from './CourseCommentInput.vue';
import OtherCommentItem from './OtherCommentItem.vue';

export default {
  components: {
    CourseCommentInput,
    OtherCommentItem,
  },
  data() {
    return {
      comments: [{
        userName: '拉格纳罗斯',
        replyContent: '尘归尘，土归土',
        likeNum: 6,
        replyTime: '2018-10-25',
        rateValue: 4.3,
      }, {
        userName: '麦格尼铜须',
        replyContent: '为了卡兹莫丹！为了铁炉堡！',
        likeNum: 23,
        replyTime: '2018-11-25',
        rateValue: 2.3,
      }, {
        userName: '萨鲁法尔',
        replyContent: '荣耀！',
        likeNum: 1123,
        replyTime: '2018-12-25',
        rateValue: 4.3,
      }],
    };
  },
};
</script>


<style lang="scss" scoped>

</style>
