<template>
  <div class="guide-cloud ">
    <div class="content">
      <div class="left-sidebar">
        <el-menu default-active="2" class="el-menu-vertical-demo">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>引导</span>
            </template>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">教学团队</span>
          </el-menu-item>
          <el-menu-item index="3">
            <i class="el-icon-document"></i>
            <span slot="title">课程基本信息</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">教学内容</span>
          </el-menu-item>
        </el-menu>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
@Component
export default class BackendCloudGuild extends Vue {}
</script>

<style lang="scss" scoped>
.guide-cloud {
  flex: 1;
  .content {
    padding: 30px;
    flex: 1;
    display: flex;
    flex-direction: row;
    width: 80%;
    .left-sidebar {
      flex: 1;
    }
  }
}
</style>
