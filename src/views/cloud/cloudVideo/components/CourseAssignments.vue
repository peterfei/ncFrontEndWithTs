<template>
  <div class="taskContent">
    <div class="taskName">
      <!-- 待批改 -->
      <div v-if="user_score">
        <div class="taskTitBox">
          <!-- 待批改0 -->
          <div
            v-if="user_score.status == 0"
            style="display: flex;
            flex-direction: row;
            justify-content: space-between;
            width: 100%;"
          >
            <div class="task-up">
              <div class="title">{{ title }}</div>
              <!-- {{user_score}} -->
              <!-- 未提交 -->
              <div class="task-status green">未批改</div>
            </div>
            <!-- <div class="down">
              <el-button type="success">重新提交</el-button>
            </div> -->
          </div>
          <!-- 已批改1 -->
          <div
            v-if="user_score.status == 1"
            style="display: flex;
            flex-direction: row;
            justify-content: space-between;
            width: 100%;"
          >
            <div class="task-up">
              <div class="title">{{ title }}</div>
            </div>
            <div class="down">
              <span>76分</span>
            </div>
          </div>
          <!-- 打回-1 -->
          <div
            v-if="user_score.status == -1"
            style="display: flex;
            flex-direction: row;
            justify-content: space-between;
            width: 100%;"
          >
            <div class="task-up">
              <div class="title">{{ title }}</div>
              <!-- {{user_score}} -->
              <!-- 未提交 -->
              <div class="task-status red">打回</div>
            </div>
            <div class="down">
              <el-button
                type="success"
                @click="Resubmission"
                v-show="resubmitBtn"
                >重新提交cxbj</el-button
              >
              <div v-show="submitBtn">
                <!-- <el-button type="info">保存</el-button> -->
                <el-button type="warning" @click="submitAssignment"
                  >提交作业</el-button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 未提交 -->
      <div v-else>
        <div class="taskTitBox">
          <div class="task-up">
            <div class="title">{{ title }}</div>
            <div class="task-status red">未提交</div>
            <!-- 未提交 -->
          </div>
          <div class="down">
            <!-- <el-button type="info">保存</el-button> -->
            <el-button type="warning" @click="submitAssignment"
              >提交作业</el-button
            >
          </div>
        </div>
      </div>
      <div class="submit-time">
        提交时间：{{ end_time }}（超过截止时间，提交作业不计分）
      </div>
      <div class="score-method" v-if="options != undefined">
        <label v-if="options.mark_type == 0">
          评分方式：首席讲师（课程负责人）、讲师、助教
        </label>
        <label v-if="options.mark_type == 1">
          评分方式：首席讲师（课程负责人）、讲师
        </label>
        <!-- 评分方式：首席讲师（课程负责人）、讲师、助教评分 -->
      </div>
    </div>
    <div class="upload">
      <div class="selected-topic">
        {{ contentTxt }}<span>({{ score }} 分)</span>
      </div>
      <div class="data">
        {{ attachment }}
      </div>

      <!-- INPUT================================================================================ -->
      <div v-if="!user_score || editArea === 1">
        <div class="textEditor">
          <quill-editor
            v-bind:content.sync="test"
            height="100px"
            @change="onContentChange"
          ></quill-editor>
        </div>
        <!-- 作业已提交v-if="!user_score||(user_score && user_score.status == -1) -->
        <div class="uploadBtn">
          <ibd-upload
            multiple
            :on-success="handlerSuccess"
            :on-error="handerError"
          >
            <el-button type="primary">上传附件</el-button>
          </ibd-upload>
        </div>
      </div>
      <!-- </div> -->
      <!-- /INPUT/end======== -->
      <!-- 作业已提交 -->
      <!-- READ========================== -->
      <div v-if="user_score && contentArea === 1">
        <div class="submit-task" v-if="typeof answerData === 'string'">
          {{ answerData }}
        </div>
        <div class="submit-task" v-else v-html="answerData.content"></div>
        <!-- {{ user_score.answer_data }} -->
        <div class="file" v-if="answerData.file">
          <div class="file-list" v-for="f in answerData.file" :key="f.idx">
            <!-- <i class="el-icon-document"></i> -->
            <i
              class="el-icon-document"
              v-if="f.attachment_type.indexOf('image') !== -1"
            >
            </i>
            <i v-else> </i>
            <label class="upload-text">{{ f.name }}</label>
          </div>
        </div>
      </div>
      <!-- READ/end=====-->
    </div>
  </div>
</template>

<script lang="ts">
import QuillEditor from '@/components/QuillEditor/QuillEditor.vue'
import { Message, MessageBox } from 'element-ui'
import IbdUpload from '@/components/Upload/index.vue'
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({
  components: {
    QuillEditor,
    IbdUpload
  }
})
export default class CourseAssignments extends Vue {
  @Prop({ default: () => ({}) }) chapter!: object
  @Prop({ default: '' }) title!: string
  @Prop({ default: '' }) contentA!: string
  @Prop({ default: () => [] }) options!: Array<object>
  @Prop({ default: () => ({}) }) user_score!: { answer_data: string }
  @Prop({ default: '' }) id!: string
  @Prop({ default: 0 }) mooc_issue_id!: number
  @Prop({ default: '' }) end_time!: string
  @Prop({ default: '' }) contentTxt!: string
  @Prop({ default: () => [] }) attachment!: Array<any>
  @Prop({ default: 0 }) score!: number

  fileList: Array<any> = []
  listType: string = 'text'
  postData: object = {} // 发送的参数
  test: string = ''
  uploadFiless: Array<any> = [] // 选择的文件
  AudioVideoList: Array<any> = [] // 文件列表
  submitBtn: boolean = false // 提交按钮
  resubmitBtn: boolean = true // 重新提交
  editArea: number = 0 // 1显示 0不显示（是否显示编辑取）
  contentArea: number = 1 // 1显示 0不显示（是否显示内容区）
  content: string = ''

  get answerData() {
    let ret
    try {
      ret = JSON.parse(this.user_score.answer_data)
    } catch {
      ret = this.user_score.answer_data
    }
    return ret
  }
  //上传成功
  handlerSuccess(fileData: any) {
    // console.log('onsuccess', fileData)
    this.uploadFiless.push({
      name: fileData.title,
      id: fileData._id,
      attachment_type: fileData.attachment_type
    })
  }
  // 上传错误处理
  handerError(error: any) {
    if (error) {
      this.$message.error('上传文件为空喽！')
    }
  }
  // 当文档内容发生变化
  onContentChange(html: string) {
    this.content = html
    // console.log('hhhh==', this.content)
  }
  // 提交作业
  submitAssignment() {
    const postObj = {
      resource_id: this.id,
      channel: 'mooc',
      channel_id: this.mooc_issue_id,
      answer_data: JSON.stringify({
        content: this.content,
        file: this.uploadFiless
      })
    }
    this.$emit('submitAssignment', postObj)
    this.editArea = 0
    this.contentArea = 1
  }
  // 重新提交
  Resubmission() {
    console.log('chongxintijiao')
    this.submitBtn = true
    this.resubmitBtn = false
    this.contentArea = 0
    this.editArea = 1

    console.log(this.editArea, this.contentArea)
    // this.$emit('Resubmission',Resubmission)
  }
}
</script>

<style lang="scss" scoped>
.taskContent {
  background: #fff;
  padding: 20px;
  .taskName {
    height: 128px;
    background: rgba(247, 248, 250, 1);
    border-radius: 5px;
    padding: 30px 30px 28px 30px;
    margin-bottom: 50px;
    .title {
      font-size: 16px;
      font-weight: bold;
      color: rgba(10, 18, 26, 1);
      margin-bottom: 10px;
    }
    .task-up {
      display: flex;
      flex-direction: row;
    }
    .down span {
      font-size: 28px;
      font-weight: bold;
      color: rgba(243, 134, 34, 1);
    }
    &::v-deep.el-button {
      font-size: 12px;
    }
    &::v-deep.el-button--primary {
      color: #ffffff;
      background-color: #409eff;
      border-color: #409eff;
    }
    &::v-deep.el-button--primary:focus,
    .el-button--primary:hover {
      background: #3a8ee6;
      border-color: #3a8ee6;
      color: #fff;
    }
    .submit-time {
      margin-bottom: 4px;
    }
    .submit-time,
    .score-method {
      font-size: 12px;
      color: rgba(139, 145, 153, 1);
    }
  }
  .upload {
    margin: 0px 30px;
    .selected-topic {
      font-size: 14px;
      color: rgba(36, 43, 51, 1);
      margin-bottom: 10px;
    }
    .selected-topic span {
      color: rgba(138, 145, 153, 1);
    }
    .data {
      font-size: 12px;
      color: rgba(138, 145, 153, 1);
    }
    .file {
      margin-top: 10px;
      .file-list {
        line-height: 30px;
      }
      .el-icon-document {
        color: #909399;
        font-size: 14px;
        margin-right: 7px;
      }
      .upload-text {
        color: #606266;
        font-size: 14px;
      }
    }
    .uploadBtn {
      margin-top: 10px;
    }
  }
  .textEditor {
    margin-top: 18px;
  }
  .submit-task {
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(223, 223, 223, 1);
    margin-top: 18px;
    font-size: 12px;
    color: rgba(65, 71, 77, 1);
    line-height: 24px;
    padding: 20px;
  }
  .taskTitBox {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .task-status {
    width: 53px;
    height: 20px;
    border-radius: 3px;
    text-align: center;
    color: #fff;
    font-size: 12px;
    line-height: 20px;
    margin-left: 8px;
  }
  .red {
    background: rgba(242, 17, 19, 1);
  }
  .green {
    background: rgba(53, 204, 103, 1);
  }
  .el-button--primary {
    background-color: #409eff !important;
  }
}
</style>
