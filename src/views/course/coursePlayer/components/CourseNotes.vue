<template>
  <div class="course-notes">
    <div class="notes-input">
      <h5>写笔记</h5>
      <el-form
        :model="subForm"
        ref="subForm"
        :rules="rules"
        @keyup.enter.native="submit(subForm)"
      >
        <el-form-item prop="desc">
          <el-input
            type="textarea"
            maxlength="120"
            placeholder="不能超过120个字，按回车发送"
            rows="3"
            v-model="subForm.desc"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div class="switch-button">
            <span>
              <snap-shoted-switch @snapShotedSwitch="snapShotedSwitch"></snap-shoted-switch>
            </span>
            <div>
              <el-button
                size="mini"
                round
                @click="subResetForm('subForm')"
              >取消</el-button>
              <el-button
                type="primary"
                size="mini"
                round
                :disabled='disabled'
                @click="subOnSubmit('subForm')"
              >提交</el-button>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div class="notes-list">
      <div
        class="notes-list-scroll"
        id='notes-list-scroll'
      >
        <h5>我的笔记</h5>
        <div
          class="notes-card"
          v-for="item in noteLists"
          :key="item.id"
        >
          <el-card>
            <div class="notes-text">{{item.content}}</div>
            <div
              class="notes-img"
              v-if="item.snapshot"
            >
              <img
                :src="item.snapshot"
                alt=""
              >
              <span> {{Math.round(item.time_point) | getTimer('xx:xx')}}</span>
            </div>
            <div class="notes-cooper">
              <div>
                <el-button
                  type="text"
                  icon="el-icon-edit"
                  @click="editItem(item)"
                >编辑</el-button>
                <el-button
                  type="text"
                  icon="el-icon-delete"
                  @click="deleteNote(item.id)"
                >删除</el-button>
              </div>
              <div class="notes-text-timer">
                {{item.updated_at | timePeriod}}
              </div>
            </div>
          </el-card>
        </div>
        <div class="notes-card">
          <el-card>
            <el-form
              ref="editForm"
              :model="editForm"
              :rules="rules"
              @keyup.enter.native="editSubmit(editForm)"
            >
              <el-form-item prop="content">
                <el-input
                  type="textarea"
                  rows="3"
                  maxlength="120"
                  placeholder="不能超过120个字，按回车发送"
                  v-model="editForm.content"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <div
                  class="switch-button"
                  style="margin-top:20px;text-align: right"
                >
                  <el-button
                    size="mini"
                    round
                    @click="editResetForm('editForm')"
                  >取消</el-button>
                  <el-button
                    type="primary"
                    size="mini"
                    round
                    :disabled="editDisabled"
                    @click="editOnSubmit('editForm')"
                  >发送</el-button>
                </div>
              </el-form-item>
            </el-form>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import SnapShotedSwitch from './SnapShotedSwitch.vue';

export default {
  name: 'CourseNotes',
  props: {
    noteLists: {
      type: Array,
      default: () => [],
    },
    resourceId: {
      type: [String, Number],
      default: () => null,
    },
  },
  components: {
    SnapShotedSwitch,
  },
  data() {
    return {
      subForm: {
        desc: '',
      },
      editForm: {
        course_package_id: '',
        course_resource_id: '',
        content: '',
      },
      editId: '',
      rules: {
        desc: [
          { required: true, message: '请填写笔记内容', trigger: 'blur' },
          { max: 120, message: '120个字符以内', trigger: 'blur' },
        ],
        content: [
          { required: true, message: '请填写笔记内容', trigger: 'blur' },
          { max: 120, message: '120个字符以内', trigger: 'blur' },
        ],
      },
      SnapShot: false,
      disabled: true,
      editDisabled: true,
    };
  },
  computed: {
    ...mapState({
      SnapShoted: state => state.CoursePlayer.snapShoted,
    }),
    formDesc() {
      return this.subForm.desc;
    },
    editDesc() {
      return this.editForm.content;
    },
  },
  mounted() {
  },
  methods: {
    ...mapMutations('CoursePlayer', ['setSnapShoted']),
    ...mapActions('CoursePlayer', [
      'getDiscussionList', // 讨论列表
      'getResourcesList', // 课程下载资源
      'getNoteList', // 笔记列表
    ]),

    // 取消发送笔记
    subResetForm(subForm) {
      // 取消笔记
      this.setSnapShoted({});
      this.disabled = true;
      this.$refs[subForm].resetFields();
    },
    // 取消编辑笔记
    editResetForm(editForm) {
      this.editDisabled = true;
      this.$refs[editForm].resetFields();
      this.editId = null;
    },
    // 回车键提交笔记
    submit() {
      this.subOnSubmit('subForm');
    },
    // 提交笔记
    subOnSubmit(subForm) {
      this.$refs[subForm].validate(async (valid) => {
        if (valid) {
          const postData = {
            course_package_id: 1,
            course_resource_id: this.resourceId,
            content: this.subForm.desc,
            SnapShoted: this.SnapShot,
            resourceId: this.resourceId,
          };
          this.$emit('submitNotes', postData);
        } else {
          return false;
        }
        return '';
      });
    },
    // 回车键编辑笔记
    editSubmit() {},
    // 提交编辑
    editOnSubmit(form) {
      this.$refs[form].validate(async (valid) => {
        if (!this.editId) {
          return;
        }
        if (valid) {
          const postData = {
            editId: this.editId,
            obj: this.editForm,
          };
          this.$emit('editNotes', postData);
        }
      });
    },
    // 编辑笔记
    editItem(item) {
      this.editId = item.id;
      this.editForm.course_package_id = item.course_package_id;
      this.editForm.course_resource_id = item.course_resource_id;
      this.editForm.content = item.content;
      if (item.snapshot) {
        this.editForm.snapshot = item.snapshot;
        this.editForm.time_point = item.time_point;
      }
      this.scrollBottom();
    },
    // 删除笔记
    deleteNote(id) {
      const len = this.noteLists.findIndex(rec => rec.id === id);
      if (len > -1) {
        const postData = {
          deleteId: id,
          resourceId: this.resourceId,
        };
        this.$emit('deleteItemNote', postData);
      }
    },
    // 滚动条回到底部
    scrollBottom() {
      this.$nextTick(() => {
        const div = document.getElementById('notes-list-scroll');
        div.scrollTop = div.scrollHeight;
      });
    },
    // 是否开启截图
    snapShotedSwitch(test) {
      this.SnapShot = test;
    },
    contentWatch() {
      if (this.subForm.desc) {
        this.disabled = false;
      }
    },
    editContentWatch() {
      if (this.editForm.content && this.editId) {
        this.editDisabled = false;
      }
    },
  },
  watch: {
    formDesc() {
      this.contentWatch();
    },
    editDesc() {
      this.editContentWatch();
    },
  },
};
</script>
<style lang="scss" scoped>
.course-notes {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: rgba(244, 244, 244, 1);
  .notes-input {
    position: relative;
    padding: 0 20px;
    width: 100%;
    height: 230px;
    background-color: #ffffff;
    box-shadow:0px 5px 10px 0px rgba(230,230,230,1);
    h5 {
      margin: 20px 0;
    }
    .el-form-item {
      margin-bottom: 20px;
    }
    .switch-button {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  .notes-list {
    width: 100%;
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
    .notes-list-scroll {
      width: 100%;
      height: 100%;
      padding: 20px;
      overflow-x: hidden;
      overflow-y: scroll;
      background: rgba(244, 244, 244, 1);
      & > div {
        margin: 20px 0;
      }
      .notes-text {
        font-size: 14px;
        font-weight: 400;
        color: #0a121a;
        margin-bottom: 20px;
      }
      .notes-img {
        position: relative;
        margin-bottom: 20px;
        img {
          width: 160px;
          height: 90px;
        }
        span {
          position: absolute;
          top: 70px;
          left: 0px;
          display: inline-block;
          text-align: center;
          width: 40px;
          height: 20px;
          line-height: 20px;
          font-size: 12px;
          color: #ffffff;
          background: rgba(0, 0, 0, 1);
          opacity: 0.3;
        }
      }
      .notes-cooper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        button {
          color: #8a9199;
        }
        color: #8a9199;
        .notes-text-timer {
          font-size: 12px;
        }
      }
    }
  }
}

//修改滚动条样式
*::-webkit-scrollbar {
  width: 6px;
  height: 16px; // background-color: $primary;
}

*::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background-color: rgba(87,93,102,1); // $primary; // $gray-light;
}

*::-webkit-scrollbar-track {
  border-radius: 3px; // background-color: $primary;
}
</style>
