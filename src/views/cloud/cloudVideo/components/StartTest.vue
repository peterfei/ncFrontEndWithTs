<template>
  <!-- StartTest -->
  <div class="q_content" @click="menu">
    <!-- {{questionData.base_resource}} -->
    <!-- {{Object.keys(user_score).length }} -->
    <!-- user_score_length:{{ Object.keys(user_score).length===0 }} -->
    <!-- {{chapter}} -->
    <!-- {{user_score}} -->
    <div v-if="!user_score || !user_score.id">
      <div class="question" ref="qArea" v-if="questionData">
        <!-- {{questionData.base_resource.question}} -->
        <!-- {{questions}} -->
        <div
          ref="qItem"
          v-for="(q, index) in questions_temp"
          :key="index"
          class="q-item"
        >
          <!-- {{q}} -->
          <div class="title">
            <div class="q_title">{{ index + 1 + q.title }}</div>
            <span>得分：{{ q.score }}</span>
          </div>
          <!-- {{JSON.parse(q.options)}} 字符串转为对象-->
          <div v-if="q.options">
            <div class="topic-options" v-if="q.options">
              <!-- 1单选 3判断题-->
             
              <div class="ml30">
                <div v-if="q.type == 1 || q.type == 3">
                  <el-radio-group
                    v-model="q.answer"
                    @change="handlerAnwserChange(q, $event)"
                    class="st-radio-group"
                  >
                    <el-radio
                      :label="item.key"
                      class="st-radio"
                      v-for="item in q.options"
                      :key="item.key"
                      ref="checks"
                      >{{ item.label }}</el-radio
                    >
                  </el-radio-group>
                  <!-- 答案解析 -->
                  <!-- <div class="analysis" v-if="user_score">
                    <div class="right-answer">
                      答案：A
                    </div>
                    <div class="analysis-answer">
                      <span>解析：</span>
                      <div class="analysis-content">
                        蓝湖百科名片
                        蓝湖蓝湖是冰岛最大的温泉。从冰岛首都雷克雅未克市向东南方向驱车1小时左右，
                        就可到达冰岛著名的地热温泉——蓝湖。有些游客慕名而来，更有甚者。蓝湖百科名片
                        蓝湖蓝湖是冰岛最大的温泉。从冰岛首都雷克雅未克市向东南方向驱车1小时左右，
                        就可到达冰岛著名的地热温泉——蓝湖。有些游客慕名而来，更有甚者。
                      </div>
                    </div>
                  </div> -->
                </div>
                <!-- 2多选 -->
                <div v-if="q.type == 2">
                  <el-checkbox-group
                    v-model="q.answer"
                    class="st-radio-group"
                    @change="handlerAnwserChange(q, $event)"
                  >
                    <el-checkbox
                      class="st-radio"
                      :label="item.key"
                      v-for="item in q.options"
                      :key="item.key"
                      >{{ item.label }}</el-checkbox
                    >
                  </el-checkbox-group>
                </div>
              </div>
              <!-- 4填空题 -->
              <div v-if="q.type == 4">
                <div class="test">
                  <el-input
                    class="textarea"
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4 }"
                    placeholder="请输入内容"
                    :value="q.answer"
                    @input="handlerAnwserChange(q, $event)"
                  >
                  </el-input>
                </div>
              </div>
              <!-- 5简答题 -->
              <div v-if="q.type == 5">
                <div class="test">
                  <el-input
                    class="textarea"
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4 }"
                    placeholder="请输入答案"
                    :value="q.answer"
                    @input="handlerAnwserChange(q, $event)"
                  >
                  </el-input>
                </div>
              </div>
            </div>
          </div>
          <!-- 已批阅 -->
          <!-- <div>{{ resultData }}</div> -->
        </div>
      </div>
    </div>
    <div v-else>
      <!-- {{ resultData }} -->
      <div class="question" v-if="questionData">
        <div v-for="(result, index) in resultData" :key="index" class="q-item">
          {{currentIndex.includes(result.id) ?false: currentIndex.push(result.id) }}
          <div class="title">
            <div class="q_title">{{ index + 1 + result.title }}</div>
            <span v-if="detailData.status == 1">得分：{{ result.score }}</span>
          </div>
          {{ result.user_answer.answer[0] }}
          <div class="topic-options" v-if="result.options">
            <div class="ml30">
              <div v-if="result.type == 1 || result.type == 3">
                <!-- {{ resultData }} -->
                <el-radio-group
                  v-model="result.user_answer.answer[0]"
                  @change="handlerAnwserChange(result, $event)"
                  class="st-radio-group"
                >
                  
                  <el-radio
                    v-model="result.user_answer.answer"
                    :label="item.key"
                    class="st-radio"
                    v-for="item in JSON.parse(result.options)"
                    :key="item.key"
                    >{{ item.label }}</el-radio
                  >
                </el-radio-group>
                <!-- 答案解析 -->
                <div class="analysis" v-if="user_score">
                  <div class="right-answer">
                    答案：{{ result.right_answer }}
                  </div>
                  <div class="analysis-answer">
                    <span>解析：</span>
                    <div class="analysis-content">
                      {{ result.answer_analysis }}
                    </div>
                  </div>
                </div>
              </div>
              <!-- 2多选 -->
              <div v-if="result.type == 2">
                <!-- {{JSON.parse(result.options)}} -->

                <el-checkbox
                    class="st-radio"
                    :label="item.key"
                    v-for="item in JSON.parse(result.options)"
                    :key="item.key"
                    v-model="result.user_answer.answer"
                    >{{ item.label }}</el-checkbox
                  >
                <!-- <el-checkbox-group class="st-radio-group">
                  <el-checkbox
                    class="st-radio"
                    :label="item.key"
                    v-for="item in JSON.parse(result.options)"
                    :key="item.key"
                    >{{ item.label }}</el-checkbox
                  >
                </el-checkbox-group> -->
              </div>
            </div>
          </div>
        </div>
      </div>
      1112222
    </div>
    <div class="q-nav clearfix">
      <!-- <div class="count" :options="options">
        <div v-if="JSON.parse(options)">
          <div class="num" v-if="JSON.parse(options).used_duration > 0">
            <div v-if="typeof JSON.parse(options).used_duration === 'string'">
              <div class="num">
                {{
                  hour
                    ? hourString +
                      ':' +
                      JSON.parse(options).used_duration +
                      ':' +
                      secondString
                    : JSON.parse(options).used_duration + ':' + secondString
                }}
              </div>
            </div>
          </div>
          <div div class="num" v-if="JSON.parse(options).used_duration == 0">
            {{ JSON.parse(options).used_duration }}
          </div>
        </div>
      </div> -->
      <div class="objective-questions">
        <div class="num-title">
          客观题
        </div>
        <!-- <div v-for="(k,l) in currentIndex" :key="l"> -->
        <!-- {{i}} -->
        <div
          v-for="q in keguan"
          :key="'q_nav_item_' + q.id"
          class="q-nav-item"
          :class="currentIndex.includes(q.id) ? 'kOn' : ''"
        >
          {{ getIndex(q.id) + 1 }}
        </div>
      </div>
      <div class="subjective-questions">
        <div class="sub-title">
          主观题
        </div>
        <div
          v-for="q in zhuguan"
          :key="'q_nav_item_' + q.id"
          class="q-nav-item"
          :class="currentIndex.includes(q.id) ? 'kOn' : ''"
        >
          {{ getIndex(q.id) + 1 }}
        </div>
      </div>
      <div class="submit">
        <el-button type="warning" @click="answerSubmit">提交</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Cloud from '@/api/cloud'
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
@Component({})
export default class StartTest extends Vue {
  @Prop({ default: () => ({}) }) questionData!: { question: any }
  @Prop({ default: 0 }) resoucedId!: number
  @Prop({ default: () => {} }) options!: object
  @Prop({ default: '' }) remainTime!: string
  @Prop({ default: '' }) mooc_issue_id!: string
  @Prop({ default: () => ({}), type: Object }) user_score!: object
  @Prop({ default: () => {} }) chapter!: Array<any>
  @Prop({ default: 0 }) clickIndex!: number
  currentIndex: Array<any> = []
  currentIndex1: number = -1
  scroll: any
  minute: number = 60
  second: number = 0
  hour: number = 0
  promiseTimer: any
  answer_data: Array<object> = []
  question_id: number = 0
  CountDownData: any
  start_time: string = ''
  answerData: any
  testId: number = 0
  questions_temp: Array<{ id: any }> = []
  baseTop: number
  resultData: Array<any> = []
  testState: boolean = true
  list: Array<object> = []
  @Watch('chapter')
  chapterWatcher() {
    console.log('TestDetail', this.TestDetail)
    // this.TestDetail()
  }
  mounted() {
    console.log(`=====user_scoreuser_score======`, this.user_score)
    // console.log(`----------resultData-------`, this.resultData)
    if (this.user_score != null) {
      if (Object.keys(this.user_score).length > 0) {
        console.log('测验id==========', +this.user_score.id)
        // debugger
        this.TestDetail(this.user_score.id)
      }
    }
  // this.currentIndex = [1,2,3]
    // window.addEventListener('scroll', this.menu)
    // console.log('123', this.resoucedId)
    // this.countDowm()
    this.questions_temp = this.questions
    // console.log(`===###questions_temp###====`, this.questions_temp)

    // this.generateQuestions()
  }
  get keguan(): any {
    return this.questions.filter(
      (rec: any) => [1, 2, 3, 4].indexOf(rec.type) !== -1
    )
  }
  get zhuguan(): any {
    return this.questions.filter((rec: any) => rec.type === 5)
  }
  get scrollerHeight(): string {
    return `${window.innerHeight}px`
  }
  // 分
  get minuteString(): string {
    return this.formatNum(this.minute)
  }
  // 秒
  get secondString(): string {
    return this.formatNum(this.second)
  }
  @Watch('questions')
  onChangeQuestions(val: any, oldVal: any) {
    this.questions_temp = val
  }
  get questions() {
    if (this.questionData.question) {
      console.log(`===this.questionData====`, this.questionData)
      return this.questionData.question
        .map((rec: any) => {
          let options
          try {
            options = JSON.parse(rec.options)
          } catch {
            options = []
          }
          options.sort(() => Math.random() - 0.5)
          const { id, title, score, type, rightAnswer, surveyId } = rec
          return {
            id,
            title,
            score,
            type,
            rightAnswer,
            surveyId,
            options,
            answer: type === 2 ? [] : ''
          }
        })
        .sort(() => Math.random() - 0.5)
    } else {
      return []
    }
  }
  async countDowm() {
    // 测验开始时间
    return await Cloud.getCountDown(this.resoucedId)
    // const self = this
    // clearInterval(this.promiseTimer)
    // this.promiseTimer = setInterval(() => {
    //   if (self.hour === 0) {
    //     if (self.minute !== 0 && self.second === 0) {
    //       self.second = 59
    //       self.minute -= 1
    //     } else if (self.minute === 0 && self.second === 0) {
    //       self.second = 0
    //       self.$emit('async End', true)
    //       clearInterval(self.promiseTimer)
    //     } else {
    //       self.second -= 1
    //     }
    //   } else if (self.minute !== 0 && self.second === 0) {
    //     self.second = 59
    //     self.minute -= 1
    //   } else if (self.minute === 0 && self.second === 0) {
    //     self.hour -= 1
    //     self.minute = 59
    //     self.second = 59
    //   } else {
    //     self.second -= 1
    //   }
    // }, 1000)
  }
  formatNum(num: number) {
    return num.toString().padStart(2, '0')
    // return num < 10 ? `0${num}` : num.toString();
  }
  menu() {
    this.scroll = document.body.scrollTop
  }
  getIndex(value: any) {
    return this.questions.findIndex((rec: any) => rec.id === value)
  }
  // 值改变时
  handlerAnwserChange(
    rec: { id: number; answer: string; type: number },
    e: any
  ) {
    console.log('123', rec, e)
    this.$set(rec, 'answer', e)
    this.changeCurrentIndex(rec.id, this.isEmpty(e, rec.type))
  }

  private changeCurrentIndex(index: number, action: boolean) {
    const i = this.currentIndex.indexOf(index)
    if (i === -1 && !action) {
      this.currentIndex.push(index)
    }
    if (i !== -1 && action) {
      this.currentIndex.splice(i, 1)
    }
  }

  private isEmpty(val: any, type: number): boolean {
    if ([1, 3, 4, 5].indexOf(type) >= 0) {
      return !val.toString().trim()
    } else {
      return !val.length
    }
  }
  // 提交答题
  async answerSubmit() {
    this.CountDownData = await this.countDowm()

    const answerData = this.questions.map((rec: any) => ({
      question_id: rec.id,
      answer: rec.type === 2 ? rec.answer : [rec.answer]
    }))
    // console.log('测验开始时间', this.CountDownData.start_time)
    const postObj = {
      resource_id: this.resoucedId,
      channel: 'mooc',
      channel_id: this.mooc_issue_id,
      answer_data: JSON.stringify(answerData), // 转字符串
      start_time: this.CountDownData.start_time
    }
    Cloud.getAnswerSubmit(postObj).then(res => {
      this.answerData = res
      // console.log('测验成果id', res.id)
      this.testId = res.id
      console.log('提交测验', this.answerData)
      this.TestDetail(this.testId)
      this.$emit('testChange', this.clickIndex)
    })
    // this.TestDetail()
  }
  // 提交测验详情
  TestDetail(testId: number) {
    console.log('测验成果id==', testId)
    Cloud.getTestDetail(testId).then((res: any) => {
      this.detailData = res
      this.resultData = res.list
      console.log('用户提交测验详情', this.resultData)
      // console.log('测验成果id', res.id)
      // console.log('提交测验', this.resultData)
    })
  }
}
</script>

<style lang="scss" scoped>
.start-test {
  padding: 0px 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.q_content {
  display: flex;
  flex-direction: row;
  padding: 0px 0px 0px 30px;
  margin-bottom: 19px;

  .question {
    width: 1061px;
    height: 550px;
    overflow: auto;
    .q-item {
      display: flex;
      flex-direction: column;
      margin-bottom: 14px;
      .title {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
      .title span {
        font-size: 14px;
        color: rgba(255, 120, 60, 1);
        margin-right: 59px;
      }
      .q_title {
        font-size: 14px;
        color: rgba(76, 82, 88, 1);
        margin-bottom: 19px;
      }
      .ml30 {
        margin-left: 30px;
      }
      .analysis {
        width: 968px;
        height: 99px;
        background: rgba(247, 248, 250, 1);
        border-radius: 5px;
        padding: 20px;
      }
      .right-answer {
        font-size: 12px;
        color: rgba(65, 71, 77, 1);
      }
      .analysis-answer {
        font-size: 12px;
        color: rgba(65, 71, 77, 1);
        line-height: 20px;
        margin-top: 9px;
        display: flex;
        flex-direction: row;
      }
      .analysis-answe span {
        display: inline-block;
        width: 74px;
      }
      .topic-options .st-radio-group {
        display: flex;
        flex-direction: column;
      }
      .topic-options .st-radio {
        margin-bottom: 20px;
      }
      .isActive {
        color: red;
      }
      .test {
        font-size: 14px;
        color: rgba(76, 82, 88, 1);
        display: flex;
        flex-direction: column;
      }
      .test .textarea {
        width: 800px;
      }
    }
  }
}
.q-nav {
  width: 309px;
  display: flex;
  flex-direction: column;
  border-left: 1px solid #f2f2f2;
  .count {
    font-size: 48px;
    color: rgba(243, 134, 34, 1);
    text-align: center;
    margin-bottom: 30px;
    padding-left: 29px;
  }
  .count .num {
    padding-bottom: 16px;
    border-bottom: 1px solid #f2f2f2;
    margin-right: 29px;
  }

  .objective-questions {
    float: left;
    padding-left: 29px;
    .num-title {
      font-size: 14px;
      font-weight: bold;
      color: rgba(65, 71, 77, 1);
      margin-bottom: 20px;
    }
  }
  .subjective-questions {
    padding-left: 29px;
    .sub-title {
      margin-top: 15px;
      font-size: 14px;
      font-weight: bold;
      color: rgba(65, 71, 77, 1);
      margin-bottom: 20px;
    }
    .active {
      background: #33ccff;
    }
  }
  .submit {
    margin-top: 30px;
    text-align: center;
    &::v-deep.el-button--warning {
      width: 250px;
      height: 48px;
      background: rgba(255, 120, 60, 1);
      border-radius: 5px;
    }
  }
  .q-nav-item {
    width: 34px;
    height: 34px;
    line-height: 34px;
    text-align: center;
    background: #cccccc;
    border-radius: 50%;
    display: inline-block;
    color: #fff;
    margin-bottom: 10px;
    margin-right: 9px;
  }
  .kOn {
    background-color: #33ccff;
  }
  .ZOn {
    background-color: #cccccc;
  }
}
</style>
