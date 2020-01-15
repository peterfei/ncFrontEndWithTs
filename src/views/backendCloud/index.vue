<template>
  <div class="backend-cloud">
    <div class="back-content">
      <div class="content">
        <div class="header-text">
          <h4>在线开放课程与学期</h4>
        </div>

        <div class="header-btn">
          <el-button size="mini" type="primary" @click="routerLinkToGuide()"
            >新建课程</el-button
          >
        </div>
        <div class="content-tbl">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="class" label="学期" width="200">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="200">
            </el-table-column>
            <el-table-column prop="status" label="状态" width="200">
            </el-table-column>
            <el-table-column prop="date" label="日期" width="200">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { mockBackendCloudData } from '@/mocks'
@Component
export default class BackendCloud extends Vue {
  tableData: Array<object> = mockBackendCloudData

  routerLinkToGuide() {
    this.$router.push({
      // path: '/backend_cloud/guide/'
      name: 'backend_guide'
    })
  }
}
</script>
<style lang="scss" scoped>
.backend-cloud {
  flex: 1;
  // width: 90%;
  margin-bottom: 20px;
  .back-content {
    // flex: 1;
    // display: flex;
    .content {
      align-items: center;
      display: flex;
      justify-content: center;
      flex-direction: column;
      .header-btn > button {
        color: 'green';
        margin-bottom: 10px;

        background: rgba(103, 194, 58, 1);
        border-radius: 2px;
        border-color: rgba(103, 194, 58, 1);
      }
    }
  }
}
</style>
