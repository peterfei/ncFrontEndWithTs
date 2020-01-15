<template>
  <div class="teaching-content">
    <div class="title">教学内容</div>
    <div class="teaching-content-item">
      <div class="item">
        <el-collapse>
          <el-collapse-item name="1">
            <template slot="title">
              一致性 Consistency
              <div class="button-group">
                <el-button size="mini">发布</el-button>

                <el-button type="text">删除</el-button>
                <el-button type="text">编辑</el-button>
                <el-button type="text">移动</el-button>
              </div>
            </template>
            <div>
              与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；
            </div>
            <div>
              在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。
            </div>
          </el-collapse-item>
          <el-collapse-item title="反馈 Feedback" name="2">
            <div>
              控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；
            </div>
            <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
          </el-collapse-item>
          <el-collapse-item title="效率 Efficiency" name="3">
            <div>简化流程：设计简洁直观的操作流程；</div>
            <div>
              清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；
            </div>
            <div>
              帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。
            </div>
          </el-collapse-item>
          <el-collapse-item title="可控 Controllability" name="4">
            <div>
              用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；
            </div>
            <div>
              结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。
            </div>
          </el-collapse-item>
        </el-collapse>
        <el-button type="success" size="medium">添加章节</el-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
@Component
export default class TeachingContent extends Vue {
  photo: string = '/image/bg/teaching.png'
  mounted() {
    console.log(`====================`)
  }
}
</script>
<style lang="scss" scoped>
.teaching-content {
  flex: 4;
  margin-left: 10px;
  .title {
    padding-bottom: 15px;
  }
  .teaching-content-item {
    background-color: white;
    .item {
      padding: 25px;
      .button-group {
        display: flex;
        flex-direction: row-reverse;
        flex: 1;
        flex-wrap: wrap;
        align-items: center;
        & > button {
          margin: 10px;
          // float: right;
        }
      }
      & > button {
        margin: 10px;
      }
    }
  }
}
</style>
