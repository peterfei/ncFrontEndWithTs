<template>
  <div class="scoring">
    <div class="title">
      评分规则
      <div class="pipe">|</div>
      <el-button type="info" size="small" round>评分标准</el-button>
      <el-button type="info" size="small" round>评分设置</el-button>
      <el-button type="info" size="small" round>证书设置</el-button>
    </div>
    <div class="scoring-content">
      <div class="item">
        <div class="item-title">评分标准</div>
        <div class="item-sub-title">
          如有内容更新，点击“发布”后才能在前端页面看到你更新的内容
        </div>
        <div class="item-desc">
          <textarea name="" id=""></textarea>
        </div>
        <div class="commit">
          <el-button type="success" size="small">保存</el-button>
          <el-button type="info" size="small">发布</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
@Component
export default class scoringStandardMode extends Vue {
  // photo: string = '/image/bg/scoring.png'
  mounted() {
    console.log(`====================`)
  }
}
</script>
<style lang="scss" scoped>
.scoring {
  flex: 4;
  margin-left: 10px;
  .title {
    display: flex;
    align-items: center;
    font-size: 18px;
    font-family: Microsoft YaHei;
    font-weight: bold;
    color: rgba(10, 18, 26, 1);
    line-height: 15px;
    padding-bottom: 15px;
    .pipe {
      // background: rgba(10, 18, 26, 1);
      padding: 7px;
    }
  }
  .scoring-content {
    padding-bottom: 15px;
    background-color: white;
    .item-title {
      margin: 15px;
      font-size: 7px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      color: rgba(76, 83, 89, 1);
    }
    .item-sub-title {
      margin: 15px;
      font-size: 6px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(138, 145, 153, 1);
    }
    .item-desc {
      // margin: 15px;
      // width: 84px;
      // height: 88px;
      // background: rgba(247, 248, 250, 1);
      border-radius: 3px;
      display: flex;
      // flex-direction: column;
      align-items: center;
      padding: 10px;
      & > textarea {
        width: 95%;
        height: 200px;
      }
    }
    .commit {
      display: flex;
      flex-direction: row-reverse;
      & > button {
        margin: 10px;
        // flex-direction: row-reverse;
      }
    }
  }
}
</style>
