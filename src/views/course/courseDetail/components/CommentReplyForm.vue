<template>
  <div class="comment-reply-form">
    <el-input
      type="textarea"
      :placeholder="'回复:' + replyTo"
      v-model="content"
      rows="4"
      resize="none"
    >
    </el-input>
    <div class="btn-area">
      <el-button type="info" @click="cancle">取消</el-button>
      <el-button
        type="primary"
        @click="submit"
        :disabled="disabled"
        class="reply-btn"
        >回复</el-button
      >
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'CommentReplyForm',
  props: ['commentId', 'replyTo', 'packageId'],
  data() {
    return {
      content: '',
      disabled: true
    }
  },
  methods: {
    ...mapActions('CoursesDetail', [
      'userReplyTo' // 回复
    ]),
    cancle() {
      this.$emit('onCancle')
      this.disabled = true
    },
    submit() {
      if (!this.content) {
        this.$message({
          message: '回复不能为空',
          type: 'error'
        })
        return
      }
      const postObj = {
        comment_id: this.commentId,
        content: this.content
      }
      const obj = {
        packageId: this.packageId,
        postObj
      }

      this.$emit('onSubmit', obj)
      this.cancle()
    },
    contentWatch() {
      if (this.content) {
        this.disabled = false
      }
    }
  },
  watch: {
    content() {
      this.contentWatch()
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-area {
  padding: 20px 10px;
  text-align: right;
  .reply-btn {
    margin-left: 24px;
  }
  .el-button {
    width: 90px;
    height: 34px;
    line-height: 0px;
    border-radius: 4px;
  }
  .el-button--warning {
    margin-left: 24px;
    background: rgba(255, 211, 0, 1);
    color: rgba(153, 60, 30, 1);
    border: none;
    &:hover {
      background: #ffc700;
    }
  }
  .el-button--default {
    background: #e7e7e7;
    border: none;
    transition: 0.3s;
    &:hover {
      background: #dadada;
      color: #000;
    }
  }
}
</style>
