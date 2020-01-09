<template>
  <div class="test-content">
    <!-- {{title}}{{score}} -->
    <div class="testName">
      <div class="testTitBox">
        <div class="test-up">
          <div class="title">{{ title }}</div>
          <div class="test-status red" v-if="user_score == null">未提交</div>
          <div
            class="test-status green"
            v-if="user_score && user_score.status == 0"
          >
            未批改
          </div>
          <div v-if="user_score && user_score.status == 1"></div>
          <!-- 未批改 -->
        </div>
        <div class="down">
          <!-- <span>76分</span> -->
          <!-- 公布成绩后 -->
        </div>
      </div>
      <div class="submit-time">
        提交时间：2018-11-12 12：00-2018-12-11
        24：00（超过截止时间，提交作业不计分）
      </div>
      <div class="test-types">
        <div class="spanBox">
          <span class="type">
            <label v-if="survey_type == 0">
              测验类型：课后
            </label>
            <label v-if="survey_type == 1">
              测验类型：章节
            </label>
            <label v-if="survey_type == 2">
              测验类型：考试
            </label>
          </span>
          <span class="total-score"> 总分：{{ total_score }}分 </span>
          <div v-if="options != undefined" style="display:inline">
            <span class="limite-time">
              限时：{{ options.used_duration }}分钟
            </span>
            <span class="submit-num">
              重复提交次数：{{
                options.repeat_num ? options.repeat_num : '不限'
              }}次
            </span>
            <span class="last-score">
              <label v-if="options.final_score == 0"
                >最终成绩评定：最新成绩</label
              >
              <label v-if="options.final_score == 1"
                >最终成绩评定：最高成绩</label
              >
            </span>
            <span class="score-method">
              <label v-if="options.mark_type == 0">
                评分方式：首席讲师（课程负责人）、讲师、助教
              </label>
              <label v-if="options.mark_type == 1">
                评分方式：首席讲师（课程负责人）、讲师
              </label>
              <!-- 评分方式：首席讲师（课程负责人）、讲师、助教评分 -->
            </span>
          </div>
        </div>
        <div class="mt20" @click="starTestClick">
          <el-button type="primary">前往测验</el-button>
        </div>
      </div>
    </div>
    <div class="starTest">
      <!-- {{ chapter[0].mooc_issue_id }} -->
      <start-test
        v-if="starTest && questionData && chapter"
        :question-data="questionData.base_resource"
        :resoucedId="questionData.id"
        :options="questionData.options"
        :mooc_issue_id="chapter[0].mooc_issue_id"
        :user_score="user_score"
      ></start-test>
    </div>
  </div>
</template>

<script lang="ts">
import StartTest from './StartTest.vue'
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({
  components: {
    StartTest
  }
})
export default class CourseTesting extends Vue {
  @Prop({ default: () => {} }) chapter!: object
  @Prop({ default: '' }) title!: string
  @Prop({ default: '' }) total_score!: string
  @Prop({ default: '' }) survey_type!: string
  @Prop({ default: () => [] }) options!: Array<object>
  @Prop({ default: () => {} }) questionData!: object
  @Prop({ default: '' }) id!: string
  @Prop({ default: '' }) user_score!: string

  starTest: boolean = false
  resource_id: number
  mounted() {
    console.log('他妈的', this.chapter)
  }
  // 开始测验
  starTestClick() {
    console.log('她她她她她她她她她============')
    this.starTest = true
    console.log('dakaile', this.starTest)
    this.resource_id = +this.id // 资源id
    const resourceId = this.resource_id
    console.log(this.resource_id)
    this.$emit('starTestClick', resourceId) // 资源id传入父级HeaderNav
  }
}
// export default {
//   name: 'CourseTesting',
//   props: {
//     chapter: {},
//     title: {},
//     total_score: {},
//     survey_type: {},
//     options: {},
//     id: {},
//     questionData: {}
//   },
//   components: {
//     StartTest
//   },
//   data() {
//     return {
//       starTest: false
//     }
//   },
//   methods: {
//     // 开始测验
//     starTestClick() {
//       this.starTest = true
//       this.resource_id = this.id // 资源id
//       const resourceId = this.resource_id
//       console.log(this.resource_id)
//       this.$emit('starTestClick', resourceId) // 资源id传入父级HeaderNav
//     }
//   }
// }
</script>

<style lang="scss" scoped>
.test-content {
  background: #fff;
  padding: 20px 0px 20px 20px;
  height: calc(100vh - 156px);
  .testName {
    background: rgba(247, 248, 250, 1);
    border-radius: 5px;
    padding: 30px 30px 28px 30px;
    margin-right: 20px;
    .title {
      font-size: 16px;
      font-weight: bold;
      color: rgba(10, 18, 26, 1);
      margin-bottom: 10px;
    }
    .test-types {
      margin-bottom: 4px;
      margin-top: 6px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    .test-up {
      display: flex;
      flex-direction: row;
    }
    .down span {
      font-size: 28px;
      font-weight: bold;
      color: rgba(243, 134, 34, 1);
      margin-top: -8px;
    }
    &::v-deep.el-button {
      font-size: 12px;
    }
    .test-types .spanBox {
      margin-top: -8px;
    }
    .test-types span {
      margin-right: 20px;
      line-height: 41px;
    }
    .submit-time,
    .test-types {
      font-size: 12px;
      color: rgba(139, 145, 153, 1);
    }
  }
  .testTitBox {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .test-status {
    width: 53px;
    height: 20px;
    border-radius: 3px;
    text-align: center;
    color: #fff;
    font-size: 12px;
    line-height: 20px;
    margin-left: 8px;
  }
}

.red {
  background: rgba(242, 17, 19, 1);
}
.green {
  background: rgba(53, 204, 103, 1);
}
.mt20 {
  margin-top: -20px;
}
.starTest {
  margin-top: 28px;
}
</style>
