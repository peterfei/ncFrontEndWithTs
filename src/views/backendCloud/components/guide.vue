<template>
  <div class="view-content">
    <div class="guide-content">
      <div class="title">课程基本信息</div>
      <div class="sub-title">
        基本信息是课程开课前的预告页面，页面发布后学生就可以报名课程
      </div>
      <div class="box">
        <div class="guide-box">
          <div class="box-title">第1步：设置教学团队</div>
          <div class="box-content">
            请先设置教学团队，并且完善课程负责人的个人资料。
          </div>
          <div class="box-btn">
            <button>已完成</button>
          </div>
        </div>
        <div class="guide-box">
          <div class="box-title">第1步：设置教学团队</div>
          <div class="box-content">
            请先设置教学团队，并且完善课程负责人的个人资料。
          </div>
          <div class="box-btn">
            <button>已完成</button>
          </div>
        </div>
      </div>

      <div class="title">课程基本信息</div>
      <div class="sub-title">
        基本信息是课程开课前的预告页面，页面发布后学生就可以报名课程
      </div>
      <div class="box">
        <div class="guide-box">
          <div class="box-title">第1步：设置教学团队</div>
          <div class="box-content">
            请先设置教学团队，并且完善课程负责人的个人资料。
          </div>
          <div class="box-btn">
            <button>已完成</button>
          </div>
        </div>
        <div class="guide-box">
          <div class="box-title">第1步：设置教学团队</div>
          <div class="box-content">
            请先设置教学团队，并且完善课程负责人的个人资料。
          </div>
          <div class="box-btn">
            <button>已完成</button>
          </div>
        </div>
      </div>
      <div class="guide-approve">
        <div class="approve-btn">
          <el-button type="success" size="medium">发布</el-button>
        </div>
        <div class="approve-desc">
          首次发布课程基本信息和课程内容，需提交管理员审核。审核通过后，可发布课程，学生可报名参加课程。
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
@Component
export default class Guild extends Vue {}
</script>
<style lang="scss" scoped>
.view-content {
  margin-left: 10px;
  flex: 4;
  .guide-content {
    padding: 15px;
    background: white;
    // margin: 5px;
    .box {
      display: flex;

      .guide-box {
        margin-top: 15px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(235, 239, 243, 1);
        border-radius: 3px;
        margin-right: 15px;
        flex: 1;
        padding: 10px;
        .box-title {
          margin-top: 8.5px;
        }
        .box-content {
          margin-bottom: 20px;
        }
        .box-btn {
          margin-top: 37px;
          & > button {
            background: rgba(255, 120, 60, 1);
            border-radius: 2px;
            color: white;
          }
        }
      }
    }
    .guide-approve {
      margin-top: 30px;
      .approve-btn > button {
        background: rgba(103, 194, 58, 1);
        border-radius: 2px;
        color: white;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
