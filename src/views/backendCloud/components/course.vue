<template>
  <div class="course">
    <div class="title">课程基本信息</div>
    <div class="course-content">
      <el-form ref="form" label-width="80px" size="mini">
        <div class="course-basic">
          <div class="title">基本信息</div>
          <div class="content-form">
            <el-form-item label="课程名称">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="开放对象">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="是否收费">
              <el-radio-group size="medium">
                <el-radio border label="是"></el-radio>
                <el-radio border label="否"></el-radio>
              </el-radio-group>
              <el-input class="charge-text">
                <i slot="suffix" class="el-input__icon charge-icon">￥</i>
              </el-input>
            </el-form-item>
          </div>
        </div>
        <div class="arrangement">
          <div class="title">教学安排</div>
          <div class="content-form">
            <el-form-item label="活动时间">
              <el-col :span="11">
                <el-date-picker
                  type="datetimerange"
                  align="right"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :default-time="['12:00:00', '08:00:00']"
                >
                </el-date-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="学时安排">
              <el-input></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="introduced">
          <div class="title">课程介绍</div>
          <div class="content-form">
            <el-form-item label="课程图片">
              <img src="" alt="" />
            </el-form-item>
            <el-form-item label="课程推荐">
              <el-input type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="课程概述">
              <el-input type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="授课目标">
              <el-input type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="参考资料">
              <el-input type="textarea"></el-input>
            </el-form-item>
          </div>
        </div>
        <el-form-item>
          <el-button type="primary">保存</el-button>
          <el-button type="success">发布</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
@Component
export default class Course extends Vue {}
</script>
<style lang="scss" scoped>
.course {
  margin-left: 10px;
  flex: 4;
  .title {
    padding-bottom: 15px;
  }
  .course-content {
    padding-bottom: 15px;
    background-color: white;
    .title {
      padding: 15px;
    }
    .content-form {
      width: 80%;
      .charge-text {
        width: 10%;
        margin-left: 15px;

        .charge-icon {
          width: 4px;
          height: 6px;
          font-size: 7px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba(255, 120, 60, 1);
          line-height: 15px;
        }
      }
    }
  }
}
</style>
