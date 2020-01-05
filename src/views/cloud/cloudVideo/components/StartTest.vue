<template>
  <!-- StartTest -->
  <div class="q_content" @click="menu">
    <!-- {{questionData.base_resource}} -->
    <!-- {{questionData}} -->
    <div class="question" ref="qArea" v-if="questionData" style="height:550px">
      <!-- {{questionData.base_resource.question}} -->
      <div
        ref="qItem"
        v-for="(q, index) in questions"
        :key="index"
        class="q-item"
      >
        <div class="title">
          <div class="q_title">{{ index + 1 + q.title }}</div>
          <span>得分：{{ q.score }}</span>
        </div>
        <!-- {{JSON.parse(q.options)}} 字符串转对象-->
        <div v-if="q.options">
          <div class="topic-options">
            <!-- 1单选 -->
            <div class="ml44">
              <div v-if="q.type == 1">
                <el-radio-group v-model="q.answer" class="st-radio-group">
                  <el-radio
                    :label="item.key"
                    class="st-radio"
                    v-for="item in q.options"
                    :key="item.key"
                    ref="checks"
                    >{{ item.label }}</el-radio
                  >
                </el-radio-group>
                <div class="analysis">
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
                </div>
              </div>
              <!-- 2多选 -->
              <div v-if="q.type == 2">
                <el-checkbox-group v-model="q.answer" class="st-radio-group">
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
            <!-- 3判断题 -->
            <div class="ml44">
              <div v-if="q.type == 3">
                <el-radio-group v-model="q.answer" class="st-radio-group">
                  <el-radio
                    :label="item.key"
                    class="st-radio"
                    v-for="item in q.options"
                    :key="item.key"
                    ref="checks"
                    >{{ item.label }}</el-radio
                  >
                </el-radio-group>
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
                  v-model="q.answer"
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
                  v-model="q.answer"
                >
                </el-input>
              </div>
            </div>
          </div>
        </div>
        <!-- <div v-if="q.options">
          <div class="topic-options">
            <div class="ml44">
              <div v-if="q.type == 1">
                <el-radio-group v-model="q.answer" class="st-radio-group">
                  <el-radio :label="item.key" class="st-radio" v-for="item in q.options"
                    :key="item.key"  ref="checks">{{item.label}}</el-radio>
                </el-radio-group>
                <div class="analysis">
                  <div class="right-answer">
                    答案：A
                  </div>
                  <div class="analysis-answer">
                    <span>解析：</span>
                    <div class="analysis-content">蓝湖百科名片 蓝湖蓝湖是冰岛最大的温泉。从冰岛首都雷克雅未克市向东南方向驱车1小时左右，
                      就可到达冰岛著名的地热温泉——蓝湖。有些游客慕名而来，更有甚者。蓝湖百科名片 蓝湖蓝湖是冰岛最大的温泉。从冰岛首都雷克雅未克市向东南方向驱车1小时左右，
                      就可到达冰岛著名的地热温泉——蓝湖。有些游客慕名而来，更有甚者。</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> -->
      </div>
    </div>
    <div class="q-nav clearfix">
      <div class="count" :options="options">
        <!-- {{JSON.parse(options).used_duration}}总用时 -->
        <div v-if="JSON.parse(options)">
          <!-- {{JSON.parse(options).used_duration}} -->
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
      </div>
      <div class="objective-questions">
        <div class="num-title">
          客观题
        </div>
        <div
          v-for="(q, index) in keguan"
          :key="'q_nav_item_' + q.id"
          class="q-nav-item"
          :class="{ on: currentIndex === index }"
          @click="goQuestion(q.id, index)"
        >
          {{ getIndex(q.id) + 1 }}
        </div>
      </div>
      <div class="subjective-questions">
        <div class="sub-title">
          主观题
        </div>
        <div
          v-for="(q, index) in zhuguan"
          :key="'q_nav_item_' + q.id"
          class="q-nav-item"
          :class="{ on: currentIndex === index }"
          @click="goQuestion(q.id, index)"
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
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({})
export default class StartTest extends Vue {
  @Prop({ default: () => {} }) questionData!: { question: any }
  @Prop({ default: 0 }) resoucedId!: number
  @Prop({ default: () => {} }) options!: object
  @Prop({ default: '' }) remainTime!: string
  @Prop({ default: '' }) mooc_issue_id!: string
  // @Prop({ default: () => [] }) questions!: Array<any>

  currentIndex: number = 0
  scroll: any
  minute: number = 60
  second: number = 0
  hour: number = 0
  promiseTimer: any
  answer_data: Array<object> = []
  question_id: number
  CountDownData: string = ''
  start_time: string
  answerData: any
  testId: number = 0
  questions: Array<{ id: any }> = []

  mounted() {
    // JSON.parse(options).used_duration
    // console.log("this.options",JSON.parse(this.options).used_duration)
    window.addEventListener('scroll', this.menu)
    console.log('123', this.resoucedId)
    this.countDowm()
    this.generateQuestions()
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
  generateQuestions() {
    const q = this.questionData.question.map((rec: any) => {
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
    q.sort(() => Math.random() - 0.5)
    this.questions = q
    // console.log("as",this.questions);
    // const questionArr = this.questions;
    // console.log("questionArr==",questionArr);
    this.questions.forEach((res: any) => {
      this.question_id = res.id
      console.log('question_id', this.question_id) // aaa
    })
  }
  countDowm() {
    console.log('hhhhhaaaa', this.resoucedId)
    // 测验开始时间
    Cloud.getCountDown(this.resoucedId).then((res: string) => {
      this.CountDownData = res
      console.log('测验开始时间', this.CountDownData)
      // console.log('测验开始时间', this.CountDownData.start_time)
    })
    const self = this
    clearInterval(this.promiseTimer)
    this.promiseTimer = setInterval(() => {
      if (self.hour === 0) {
        if (self.minute !== 0 && self.second === 0) {
          self.second = 59
          self.minute -= 1
        } else if (self.minute === 0 && self.second === 0) {
          self.second = 0
          self.$emit('countDowmEnd', true)
          clearInterval(self.promiseTimer)
        } else {
          self.second -= 1
        }
      } else if (self.minute !== 0 && self.second === 0) {
        self.second = 59
        self.minute -= 1
      } else if (self.minute === 0 && self.second === 0) {
        self.hour -= 1
        self.minute = 59
        self.second = 59
      } else {
        self.second -= 1
      }
    }, 1000)
  }
  formatNum(num: number) {
    return num.toString().padStart(2, '0')
    // return num < 10 ? `0${num}` : num.toString();
  }
  menu() {
    this.scroll = document.body.scrollTop
  }
  getIndex(value: any) {
    const t = this.questions.findIndex((rec: any) => rec.id === value)
    if (t !== -1) {
      return t
    }
    console.log('xxxx', this.questions, t)
    return -1
  }
  // goQuestion(id, index) {
  //   const idx = this.getIndex(id)
  //   this.currentIndex = index // 动态加class
  //   const area = this.$refs.qArea
  //   const baseTop = area.offsetTop
  //   // const baseLeft = area.offsetLeft;
  //   const comp = this.$refs.qItem[idx]
  //   const compTop = comp.offsetTop
  //   const targetX = 0
  //   const targetY = compTop - baseTop
  //   area.scrollTo({
  //     top: targetY,
  //     left: targetX,
  //     behavior: 'smooth'
  //   })
  // }
  answerSubmit() {
    console.log('q', this.questions)
    const answerData = this.questions.map((rec: any) => ({
      question_id: rec.id,
      answer: rec.type === 2 ? rec.answer : [rec.answer]
    }))
    // return ;
    // console.log('测验开始时间', this.CountDownData.start_time)
    console.log('asaaaaaaaaa', this.questions) // question_id
    console.log('提交答案key==', this.key)
    console.log('res.id', this.question_id)
    console.log('mooc_issue_id', this.mooc_issue_id)
    const postObj = {
      resource_id: this.resoucedId,
      channel: 'mooc',
      channel_id: this.mooc_issue_id,
      answer_data: JSON.stringify(answerData) // 转字符串
      // start_time: this.CountDownData.start_time
    }
    Cloud.getAnswerSubmit(postObj).then(res => {
      this.answerData = res
      console.log('测验成果id', res.data.id)
      this.testId = res.data.id
      console.log('提交测验', this.answerData)
      this.TestDetail()
    })
  }
  //       questions: [],
  //       radio: 3,
  //       currentIndex: 0,
  //       scroll: '',
  //       hour: '',
  //       minute: 60,
  //       second: 0,
  //       promiseTimer: '',
  //       answer_data: [],
  //       answerKey: [],
  //       exercise: '',
  //       short_answer: ''
}
// export default {
//   name: 'StartTest',
//   props: {
//     questionData: {
//       type: Object
//     },
//     resoucedId: {},
//     options: {},
//     remainTime: {
//       // 倒计时间总秒数
//       default: ''
//     },
//     mooc_issue_id: {}
//   },
//   computed: {
//     keguan() {
//       return this.questions.filter(rec => [1, 2, 3, 4].indexOf(rec.type) !== -1)
//     },
//     zhuguan() {
//       return this.questions.filter(rec => rec.type === 5)
//     },
//     scrollerHeight() {
//       return `${window.innerHeight}px`
//     },
//     hourString() {
//       return this.formatNum(this.hour)
//     },
//     // 分
//     minuteString() {
//       return this.formatNum(this.minute)
//     },
//     // 秒
//     secondString() {
//       return this.formatNum(this.second)
//     }
//   },
//   mounted() {
//     // JSON.parse(options).used_duration
//     // console.log("this.options",JSON.parse(this.options).used_duration)
//     window.addEventListener('scroll', this.menu)
//     console.log('123', this.resoucedId)
//     this.generateQuestions()
//     this.countDowm()

//   },
//   data() {
//     return {
//       questions: [],
//       radio: 3,
//       currentIndex: 0,
//       scroll: '',
//       hour: '',
//       minute: 60,
//       second: 0,
//       promiseTimer: '',
//       answer_data: [],
//       answerKey: [],
//       exercise: '',
//       short_answer: ''
//     }
//   },
//   methods: {
//     answerSubmit() {
//       console.log('q', this.questions)
//       const answerData = this.questions.map(rec => ({
//         question_id: rec.id,
//         answer: rec.type === 2 ? rec.answer : [rec.answer]
//       }))
//       // return ;
//       console.log('测验开始时间', this.CountDownData.start_time)
//       console.log('asaaaaaaaaa', this.questions) // question_id
//       console.log('提交答案key==', this.key)
//       console.log('res.id', this.question_id)
//       console.log('mooc_issue_id', this.mooc_issue_id)
//       const postObj = {
//         resource_id: this.resoucedId,
//         channel: 'mooc',
//         channel_id: this.mooc_issue_id,
//         answer_data: JSON.stringify(answerData), // 转字符串
//         start_time: this.CountDownData.start_time
//       }
//       Cloud.MoocList.getAnswerSubmit(postObj).then(res => {
//         this.answerData = res
//         console.log('测验成果id', res.data.id)
//         this.testId = res.data.id
//         console.log('提交测验', this.answerData)
//         this.TestDetail()
//       })
//     },
//     TestDetail() {
//       console.log('测验成果id==', this.testId)
//       Cloud.MoocList.getTestDetail(this.testId).then(res => {
//         this.answerData = res
//         console.log('测验成果id', res.data.id)
//         console.log('提交测验', this.answerData)
//       })
//     },
//     countDowm() {
//       // 测验开始时间
//       Cloud.MoocList.getCountDown(this.resoucedId).then(res => {
//         this.CountDownData = res
//         console.log('测验开始时间', this.CountDownData)
//       })
//       const self = this
//       clearInterval(this.promiseTimer)
//       this.promiseTimer = setInterval(() => {
//         if (self.hour === 0) {
//           if (self.minute !== 0 && self.second === 0) {
//             self.second = 59
//             self.minute -= 1
//           } else if (self.minute === 0 && self.second === 0) {
//             self.second = 0
//             self.$emit('countDowmEnd', true)
//             clearInterval(self.promiseTimer)
//           } else {
//             self.second -= 1
//           }
//         } else if (self.minute !== 0 && self.second === 0) {
//           self.second = 59
//           self.minute -= 1
//         } else if (self.minute === 0 && self.second === 0) {
//           self.hour -= 1
//           self.minute = 59
//           self.second = 59
//         } else {
//           self.second -= 1
//         }
//       }, 1000)
//     },
//     formatNum(num) {
//       return num.toString().padStart(2, '0')
//       // return num < 10 ? `0${num}` : num.toString();
//     },
//     generateQuestions() {
//       const q = this.questionData.question.map(rec => {
//         let options
//         try {
//           options = JSON.parse(rec.options)
//         } catch {
//           options = []
//         }
//         options.sort(() => Math.random() - 0.5)
//         const { id, title, score, type, rightAnswer, surveyId } = rec
//         return {
//           id,
//           title,
//           score,
//           type,
//           rightAnswer,
//           surveyId,
//           options,
//           answer: type === 2 ? [] : ''
//         }
//       })
//       q.sort(() => Math.random() - 0.5)
//       this.questions = q

//       this.questions.forEach(res => {
//         this.question_id = res.id
//         console.log('question_id', this.question_id) // aaa
//       })
//     },
//     menu() {
//       this.scroll = document.body.scrollTop
//     },
//     getIndex(value) {
//       const t = this.questions.findIndex(rec => rec.id === value)
//       if (t !== -1) {
//         return t
//       }
//       console.log('xxxx', this.questions, t)
//       return -1
//     },
//     goQuestion(id, index) {
//       const idx = this.getIndex(id)
//       this.currentIndex = index // 动态加class
//       const area = this.$refs.qArea
//       const baseTop = area.offsetTop
//       // const baseLeft = area.offsetLeft;
//       const comp = this.$refs.qItem[idx]
//       const compTop = comp.offsetTop
//       const targetX = 0
//       const targetY = compTop - baseTop
//       area.scrollTo({
//         top: targetY,
//         left: targetX,
//         behavior: 'smooth'
//       })
//     }
//   }
// }
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
  padding: 0px 0px 0px 15px;
  margin-bottom: 19px;

  .question {
    width: 1061px;
    // height: 500px;
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
      .ml44 {
        margin-left: 44px;
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
  .on {
    background-color: #33ccff;
  }
}
</style>
