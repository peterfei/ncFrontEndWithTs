<template>
  <div class="cloud-page">
    <div class="cloud-left">
      <div class="filter-panel">
        <mooc-isuue-status
          :value="moocStatus"
          @change="searchMooc"
        ></mooc-isuue-status>
        <mooc-payment-status
          :value="paymentType"
          @change="searchPayment"
        ></mooc-payment-status>
      </div>
      <graphic-list :moocList="moocList"></graphic-list>
      <div class="block page-block">
        <div class="block ">
          <el-pagination
            layout="prev, pager, next"
            :total="pageMeta.total"
            :page-size="parseInt(pageMeta.per_page, 10)"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <div class="cloud-right">
      <el-button class="cloud-button">开课后台</el-button>
      <!-- 人气爆棚 -->
      <hot-top :popularityList="popularityList"></hot-top>
      <!-- 大咖推荐 -->
      <up-recommended :recommendList="recommendList"></up-recommended>
    </div>
  </div>
</template>
<script lang="ts">
import GraphicList from './components/GraphicList.vue'
import HotTop from './components/HotTop.vue'
import UpRecommended from './components/UpRecommended.vue'
import MoocIsuueStatus from './components/MoocIsuueStatus.vue'
import { Component, Vue, Watch } from 'vue-property-decorator'
import MoocPaymentStatus from './components/MoocPaymentStatus.vue'
import Cloud from '@/api/cloud'
import { DirectiveOptions } from 'vue'
import { Direction } from 'element-ui/types/drawer'
import { Dictionary, Location } from 'vue-router/types/router'
@Component({
  components: {
    MoocIsuueStatus,
    GraphicList,
    MoocPaymentStatus,
    HotTop,
    UpRecommended
  }
})
export default class CourseList extends Vue {
  moocStatus: any = 1
  paymentType: number = 0
  moocList: Array<any> = []
  recommendList: Array<any> = []
  // pageMeta: Array<any> = []
  popularityList: Array<any> = []
  page: Number = 1
  pageMeta: { totalPage: number; total: number; per_page: number } = {
    totalPage: 0,
    total: 0,
    per_page: 0
  }
  @Watch('$route', { immediate: true, deep: true })
  onUrlChange(to: { id: number; query: { id: number } }) {
    this.page = 1
    this.getList()
  }
  mounted() {
    const q = this.$route.query
    const queryinfo = Object.keys(q).length // xin
    // console.log('1212:', queryinfo);// xin
    if (queryinfo) {
      // xin
      // console.log('999:', this.moocStatus);// xxin
      this.moocStatus = q.status ? +q.status : 0 // xin
    } else {
      //
      this.moocStatus = null // x
    }
    // this.moocStatus = q.status ? +q.status : 0;
    this.paymentType = q.is_free ? +q.is_free : 0
    this.getList() // 课程包列表
    this.getRecommendList() // 大咖推荐
    this.getPopularity()
  }
  searchMooc(val: any) {
    this.moocStatus = val
    this.search()
  }
  searchPayment(val: any) {
    this.paymentType = val
    this.search()
  }
  // 切换状态（全部，进行时，未开始，已结束）
  search() {
    const query: Dictionary<string> = {
      status: this.moocStatus,
      is_free: this.paymentType.toString()
    }
    // console.log(query)
    this.$router.push({ query })
  }
  // 检索
  getList() {
    const params = {
      status: this.moocStatus,
      is_free: this.paymentType,
      limit: 20,
      page: this.page
    }
    Cloud.getList(params).then((res: any) => {
      // console.log(res)
      // debugger
      this.moocList = res.data
      this.pageMeta = res.meta
      this.pageMeta.totalPage = Math.ceil(
        this.pageMeta.total / this.pageMeta.per_page
      )
    })
  }
  // 人气爆棚
  getPopularity() {
    // console.log('人气爆棚')
    Cloud.getPopularity().then((rec: any) => {
      this.popularityList = rec
      // console.log('popularityList人气=', this.popularityList)
    })
  }
  // 大咖推荐
  getRecommendList() {
    // console.log('大咖推荐==', 22)
    Cloud.getRecommendList().then((rec: any) => {
      this.recommendList = rec
      // console.log('rec=======', rec)
    })
  }

  // 分页
  handleCurrentChange(val: number) {
    this.page = val
    this.getList()
  }
}
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
.page-block {
  background: rgba(244, 244, 244, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px auto 100px;
  &::v-deep button {
    background: rgba(244, 244, 244, 1);
    background-color: rgba(244, 244, 244, 1) !important;
  }
  &::v-deep li {
    background: rgba(244, 244, 244, 1);
  }
}
</style>
