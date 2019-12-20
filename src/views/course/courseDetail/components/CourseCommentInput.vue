<template>
  <div class="course-input-content">
    <el-card class="box-card" :body-style="boxstyle">
      <div>
        <template>
          <quill-editor
            type="none"
            v-bind:content.sync="textarea"
            height="100px"
            placeholder="期待您的评论..."
          ></quill-editor>
        </template>
      </div>
      <div class="df flex-b">
        <div class="left">
          <span class="rate-pingjia">星级评价：</span>
          <span class="rate-img">
            <el-rate
              v-model="valueRate"
              :colors="['#F38622', '#F38622', '#F38622']"
              @change="rate()"
            >
            </el-rate>
          </span>
        </div>
        <div class="right">
          <el-button
            type="info"
            size="medium"
            :disabled="disabled"
            @click="commitComment"
            >发布</el-button
          >
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import QuillEditor from '@/components/QuillEditor/QuillEditor.vue'

export default {
  components: {
    QuillEditor
  },
  data() {
    return {
      textarea: '',
      test: '哈哈',
      valueRate: null,
      value5: 3.7,
      value: '',
      boxstyle: {
        width: '100%',
        padding: '0'
      },
      btnStyle: 'info',
      disabled: true
    }
  },

  props: {
    packageId: {
      type: [Number, String],
      required: true,
      default: () => null
    }
  },
  methods: {
    rate() {},
    clear() {
      this.textarea = ''
      this.valueRate = null
      this.disabled = true
    },
    commitComment() {
      if (!this.textarea) {
        // 提示评论不能为空
        this.$message({
          message: '评论不能为空',
          type: 'error'
        })
        return
      }
      if (!this.valueRate) {
        this.$message({
          message: '评论等级不能为空',
          type: 'error'
        })
        return
      }
      if (this.textarea !== '') {
        const postObj = {
          packageId: this.packageId,
          content: this.textarea,
          start_score: this.valueRate
        }
        this.$emit('commentContentObj', postObj)
      }
      this.clear()
    },
    btnWatch() {
      if (this.textarea && this.valueRate) {
        this.disabled = false
      }
    }
  },
  watch: {
    textarea() {
      this.btnWatch()
    },
    valueRate() {
      this.btnWatch()
    }
  }
}
</script>

<style lang="scss" scoped>
.course-input-content {
  margin-bottom: 35px;
  .box-card {
    padding: 30px;
    border-radius: 10px;
    overflow: initial;

    .left {
      line-height: 35px;
      .rate-pingjia {
        font-size: 14px;
      }
      .rate-img div {
        display: inline;
      }
    }
    .quill-editor {
      margin-bottom: 20px;
    }
  }
  .right {
    button {
      width: 120px;
      height: 40px;
      transition: 0.4s;
    }
  }
  .el-textarea {
    textarea {
      width: 780px;
      height: 120px;
    }
    margin-bottom: 20px;
  }
  .el-textarea__inner:focus {
    border-color: #b7bbbf;
  }
}
.box-card ::v-deep #textarea-emoji {
  top: 50px;
}
</style>
