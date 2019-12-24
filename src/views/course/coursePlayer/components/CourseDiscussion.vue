<template>
  <div class="course-discussion">
    <div class="dcs-box">
      <div class="dcs-scroll-box" id="dcs-scroll-box">
        <div v-for="itemlist in discussionList" :key="itemlist.id">
          <div class="dec-item" v-if="itemlist.user.id === userId">
            <img
              :src="
                itemlist.user
                  ? itemlist.user.avatar
                  : 'http://placehold.it/40x40'
              "
              alt=""
            />
            <div>
              <div>
                <span>{{ itemlist.user ? itemlist.user.name : '' }}</span>
                <span>{{ itemlist.updated_at }}</span>
                <!-- | getTimer('before') -->
              </div>
              <div class="dec-text-item">{{ itemlist.content }}</div>
            </div>
          </div>
          <div v-else class="dec-item dec-item-right">
            <div>
              <div>
                <span>{{ itemlist.updated_at | timePeriod() }}</span>
                <span>{{ itemlist.user ? itemlist.user.name : '' }}</span>
              </div>
              <div class="dec-text-item">{{ itemlist.content }}</div>
            </div>
            <img
              :src="
                itemlist.user
                  ? itemlist.user.avatar
                  : 'http://placehold.it/40x40'
              "
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
    <div class="dcs-from">
      <h4>写讨论</h4>
      <el-form
        :model="ruleForm"
        ref="ruleForm"
        :rules="rules"
        @keyup.enter.native="submit(ruleForm)"
      >
        <el-form-item prop="desc">
          <el-input
            type="textarea"
            maxlength="25"
            placeholder="不能超过25个字，按回车发送"
            rows="3"
            v-model="ruleForm.desc"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" round @click="resetForm('ruleForm')"
            >取消</el-button
          >
          <el-button
            type="primary"
            size="mini"
            round
            :disabled="disabled"
            @click="onSubmit('ruleForm')"
            >发送</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CourseDiscussion',
  props: {
    discussionList: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  computed: {
    formDesc() {
      return this.ruleForm.desc
    }
  },
  data() {
    return {
      userId: 2,
      disabled: true,
      ruleForm: {
        desc: ''
      },
      rules: {
        desc: [
          { required: true, message: '请填写讨论内容', trigger: 'blur' },
          { max: 25, message: '25个字符以内', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {},
  methods: {
    resetForm(formName) {
      // 取消讨论
      this.ruleForm.desc = ''
      this.disabled = true
      this.$refs[formName].resetFields()
    },
    // 回车键提交讨论
    submit() {
      this.onSubmit()
    },
    // 提交讨论
    onSubmit(ruleForm) {
      this.$refs[ruleForm].validate(valid => {
        if (valid) {
          const postdata = {
            content: this.ruleForm.desc,
            time_point: '12'
          }
          this.$emit('submitDiscussion', postdata)
        } else {
          return false
        }
        return ''
      })
    },
    // 滚动条回到底部
    scrollBottom() {
      this.$nextTick(() => {
        const div = document.getElementById('dcs-scroll-box')
        div.scrollTop = div.scrollHeight
      })
    },
    contentWatch() {
      if (this.ruleForm.desc) {
        this.disabled = false
      }
    }
  },
  watch: {
    // 监控滚动条
    discussionList: 'scrollBottom',
    formDesc() {
      this.contentWatch()
    }
  }
}
</script>

<style lang="scss" scoped>
//修改滚动条样式
*::-webkit-scrollbar {
  width: 6px;
  height: 16px; // background-color: $primary;
}

*::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background-color: rgba(87, 93, 102, 1); // $primary; // $gray-light;
}

*::-webkit-scrollbar-track {
  border-radius: 3px; // background-color: $primary;
}
.course-discussion {
  width: 424px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .dcs-box {
    display: flex;
    flex-direction: column;
    flex: 1;
    background: rgba(244, 244, 244, 1);
    overflow: hidden;
    & > .dcs-scroll-box {
      width: 100%;
      min-height: 100%;
      overflow-x: hidden;
      overflow-y: scroll;
      & > div > .dec-item {
        width: 100%;
        height: auto;
        display: flex;
        justify-content: flex-start;
        padding: 16px;
        & > img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 10px;
        }
        & > div > div > span:nth-child(1) {
          font-size: 14px;
          color: #0a121a;
        }
        & > div > div > span:nth-child(2) {
          margin-left: 8px;
          color: #8a9199;
          font-size: 12px;
        }
        & > div > .dec-text-item {
          max-width: 270px;
          min-height: 32px;
          background: rgba(255, 255, 255, 1);
          border-radius: 3px;
          font-size: 14px;
          padding: 6px;
          border-radius: 4px;
          margin-top: 8px;
          text-align: left;
        }
      }
      & > div > .dec-item-right {
        & > img {
          margin-left: 16px;
        }
        justify-content: flex-end;
        text-align: right;
        & > div > div > span:nth-child(2) {
          font-size: 14px;
          color: #0a121a;
        }
        & > div > div > span:nth-child(1) {
          margin-left: 8px;
          color: #8a9199;
          font-size: 12px;
        }
      }
    }
  }
  .dcs-from {
    width: 100%;
    height: 220px;
    background-color: #ffffff;
    box-shadow: 0px 5px 10px 0px rgba(230, 230, 230, 1);
    padding: 0 20px;
    h4 {
      margin: 20px 0;
    }
    .el-form-item {
      text-align: right;
      margin-bottom: 20px;
    }
  }
}
</style>
