<template>
  <div class="cloud-page">
    <div class="cloud-left">
      <div class="filter-panel">
        <mooc-isuue-status
          v-model="moocStatus"
          @change="search"
        ></mooc-isuue-status>
        <mooc-payment-status
          v-model="paymentType"
          @change="search"
        ></mooc-payment-status>
      </div>
      <graphic-list
        :moocList="moocList"
        :pageMeta="pageMeta"
        @handleCurrentChange="handleCurrentChange"
      ></graphic-list>
    </div>
    <div class="cloud-right">
      <el-button class="cloud-button">开课后台</el-button>
      <extraordinary-popularity
        :popularityList="popularityList"
      ></extraordinary-popularity>
      <up-recommended :recommendList="recommendList"></up-recommended>
    </div>
  </div>
</template>
<script lang="ts">
// import TabpsHeader from './components/TabpsHeader.vue';
import GraphicList from './components/GraphicList.vue'
// import ExtraordinaryPopularity from './components/ExtraordinaryPopularity.vue';
// import UpRecommended from './components/UpRecommended.vue';
import MoocIsuueStatus from './components/MoocIsuueStatus.vue'
import { Component, Vue } from 'vue-property-decorator'
// import MoocPaymentStatus from './components/MoocPaymentStatus.vue';
import Cloud from '@/api/cloud'
import { DirectiveOptions } from 'vue'
import { Direction } from 'element-ui/types/drawer'
import { Dictionary } from 'vue-router/types/router'
@Component({
  components: {
    MoocIsuueStatus,
    GraphicList
  }
})
export default class CourseList extends Vue {
  moocStatus: null = null
  paymentType: Number = 0
  moocList: Array<any> = []
  recommendList: Array<any> = []
  pageMeta: Array<any> = []
  popularityList: Array<any> = []
  page: Number = 1

  // 切换状态（全部，进行时，未开始，已结束）
  search() {
    const params: Dictionary<any> = {
      status: this.moocStatus,
      is_free: this.paymentType
    }
    this.$router.push({
      query: params
    })
  }
  // 检索
  getList() {
    const params = {
      status: this.moocStatus,
      is_free: this.paymentType
    }
    Cloud.MoocList.getList(params).then((res: any) => {
      this.moocList = res.data
      this.pageMeta = res.meta
    })
  }
  headletabClick(item) {
    // 根据传值调用列表函数
    this.getList(`?status=${item.status}`)
  }
  // 大咖推荐
  getRecommendList() {
    console.log('大咖推荐==', 22)
    Cloud.MoocList.getRecommendList().then(rec => {
      this.recommendList = rec
    })
  }
  // 人气爆棚
  getPopularity() {
    // console.log('人气爆棚');
    Cloud.MoocList.getPopularity().then(rec => {
      this.popularityList = rec
      // console.log('popularityList人气=', this.popularityList);
    })
  }
  // 分页
  handleCurrentChange() {}
}

// export default {
//   name: 'CourseList',
//   components: {
//     MoocIsuueStatus,
//     MoocPaymentStatus,
//     GraphicList,
//     ExtraordinaryPopularity,
//     UpRecommended
//   },
//   data() {
//     return {
//       moocStatus: null,
//       paymentType: 0,
//       moocList: [],
//       recommendList: [],
//       pageMeta: [],
//       popularityList: [],
//       page: 1
//     }
//   }
// }
</script>
<style lang="scss" scoped>
.cloud-page {
  width: 1200px;
  margin: 0px auto;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.cloud-left {
  display: flex;
  flex-direction: column;
  width: 880px;
  .filter-panel {
    display: flex;
    justify-content: space-between;
  }
}
.cloud-right {
  width: 300px;
}
.cloud-button {
  margin-top: 30px;
  width: 100%;
  display: inline-block;
  background-color: #35cc67;
  height: 54px;
  text-align: center;
  border-radius: 5px;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 20px;
}
.el-button:hover,
.el-button:focus {
  background-color: #35cc67;
  color: #fff;
}
</style>
