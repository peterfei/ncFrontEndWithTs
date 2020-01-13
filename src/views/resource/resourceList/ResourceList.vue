<template>
  <div style="width:100%;background:#f7f8fa">
    <div class="head">
      <!-- 上部 -->
      <div class="w-1200">
        <div class="top">
          <div class="left">
            <search-block @search="searchName"></search-block>
          </div>
          <div class="right">
            <router-link :to="{ path: `/resource/addpackage` }">
              <div class="release-btn">
                发布
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <!-- 1多级选项卡 -->
    <div class="head-nav">
      <div class="fist-query">
        <div class="content">
          <ul>
            <li class="item active">
              <span class="label">全部</span>
              <span class="line"></span>
            </li>
            <li class="item">
              <span class="label">卡里姆多</span>
              <span class="line"></span>
            </li>
            <li class="item">
              <span class="label">丹莫罗</span>
              <span class="line"></span>
            </li>
            <li class="item">
              <span class="label">希利苏斯</span>
              <span class="line"></span>
            </li>
            <li class="item">
              <span class="label">菲拉斯</span>
              <span class="line"></span>
            </li>
          </ul>
        </div>
      </div>
      <div class="queryBlcok">
        <div class="content">
          <!-- <query-item
            v-for="item in queryItems"
            :value="item.value"
            :key="item.key"
            :label="item.label"
            :options="item.options"
            :queryIsAll="item.queryIsAll"
            @change="changeHandler(item, $event)"
          >
          </query-item> -->
          <cate-filter-course></cate-filter-course>
        </div>
      </div>

      <div class="other_type w-1200">
        <div class="content"></div>
      </div>
    </div>
    <!-- 多级选项卡结束 -->
    <!-- 发布 -->
    <div class="w-1200">
      <div class="publish_block">
        <div class="type_choose">
          <span
            class="item"
            :class="{ active: pageType == 'all' }"
            @click="typeChooseClick('all')"
            >全部</span
          >
          <span
            class="item"
            :class="{ active: pageType == 'release' }"
            @click="typeChooseClick('release')"
            >我的发布</span
          >
          <span
            class="item"
            :class="{ active: pageType == 'extract' }"
            @click="typeChooseClick('extract')"
            >我的摘录</span
          >
        </div>
        <div class="sort_type">
          <el-dropdown
            @command="dropDownPackstatus"
            v-if="pageType == 'release'"
          >
            <span class="el-dropdown-link">
              {{ filterValue | statusFilter }}
              <i class="el-icon-arrow-down el-icon--right"></i>`
            </span>
            <el-dropdown-menu slot="dropdown">
              <!-- <el-dropdown-item
                command="selectStatus"
                v-if="selectStatus != '全部'"
                >全部</el-dropdown-item
              > -->
              <el-dropdown-item
                v-for="(item, index) in packDropStatus"
                :key="index"
                :command="item"
              >
                {{ item.label }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <!-- 发布按钮结束 -->
      <!-- 教学包列表 -->
      <div class="package_list">
        <!-- 优选教学包 -->
        <section>
          <div class="list_box" v-if="packagesList">
            <package-item
              v-for="item in packagesList"
              :key="item.id"
              :id="item.id"
              :title="item.name"
              :price="item.price"
              :typeChoose="pageType"
              :status="item.status"
              :is_published="item.is_published"
              :bought_num="item.bought_num"
              :tags="item.item_count"
              @deletePackage="deletePackage"
            >
            </package-item>

            <!-- <package-item
              v-for="item in packagesList.data"
              :key="item.id"
              :id="item.id"
              :title="item.name"
              :school="item.school"
              :tags="item.item_count"
              :price="item.price"
              :bodou="item.points"
              :paymentType="item.payment_type"
              :bought_num="item.bought_num"
              @setPublish="setPublish"
              @setArraignment="setArraignment"
            >
            </package-item> -->
          </div>
          <!-- <div class="no_excerpt no_data" v-if="packagesList == ''">
            <div class="content">
              <p>您还没有摘录的教学包~</p>
              <span>前往摘录</span>
            </div>
          </div> -->
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import CateFilterCourse from '@/components/CateFilterCommon/CateFilterCourse.vue'
import SearchBlock from './components/SearchBlock.vue'
import QueryItem from './components/QueryItem.vue'
import { mockQueryParams } from '@/mocks/index'
import { mockResPackFilter } from '@/mocks/index'
import PackageItem from './components/PackageItem.vue'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { ResourcePackageList, PackageOperate } from '@/api/resource'
declare module 'vue/types/vue' {
  interface Vue {
    [key: string]: any
  }
}
@Component({
  components: {
    SearchBlock,
    PackageItem,
    QueryItem,
    CateFilterCourse
  },
  filters: {
    // 下拉状态的过滤
    statusFilter(filter: number) {
      if (filter == 9) {
        return '未发布'
      } else if (filter == 2) {
        return '未通过'
      } else if (filter == 1) {
        return '已通过'
      } else if (filter == 0) {
        return '待审核'
      } else if (filter == null) {
        return '全部'
      }
    }
  }
})
export default class ResourceList extends Vue {
  // name: 'ResourceList',
  // data() {
  //   return {
  //     current: -1,
  //     index: null,
  //     publishCurrent: 'all', // 发布方筛选
  //     noList: false, // 是否有数据
  //     is_published: '', // 是否上架
  //     category_id: '', // 类别ID
  //     is_free: 'all', // 1免费 0不免费
  //     role_id: 'all', // 发布方
  //     education: 'all', // 适用层次 0 其他 1：中职 2：高职 3本科及以上
  //     order: 'created_at', // 排序 创建时间created_at  摘录量bought_num  价格price
  //     mine: '', // 我发布的
  //     bought: '', // 我摘录的
  //     sortactive: 'createtime' // 根据创建时间
  //   }
  // }
  name: string
  public mine: string = '' //我的发布
  public packagesList: Array<any> = []
  public queryItems: Array<object> = mockQueryParams
  public packDropStatus: Array<object> = mockResPackFilter
  public packstatusCN: string = '全部' //审核状态-中文

  public pageType: string = 'all' //我的发布，我的摘录，全部
  public keyword: string = '' //关键字搜索
  public sortType: string = '' //排序方式
  public filterValue: any = null //审核状态下拉
  public searchName(data: string) {}
  mounted() {
    this.getResourceList()
    console.log('mount')
    const urlParams = {
      type: this.pageType, //我的分类
      keyword: this.keyword,
      sort: this.sortType,
      filter: this.filterValue
    }
    this.routerPushParams(urlParams) //初始化URL方法调用
  }

  //每次url变化监听
  @Watch('$route', { immediate: true, deep: true })
  onUrlChange(to: {
    id: number
    query: { id: number; type: string; filter: string }
  }) {
    console.log('url 的监听')
    const url = to.query
    console.log(url)
    this.pageType = url.type
    this.mine = this.pageType == 'release' ? '1' : ''
    this.filterValue = url.filter
    this.getResourceList()
  }
  loadUrl() {
    const urlParams = {
      type: this.pageType,
      keyword: this.keyword,
      sort: this.sortType,
      filter: this.filterValue
    }
    this.$router.push({ query: urlParams })
  }
  //初始化URL方法
  routerPushParams(urlParams: any) {
    const obj = {
      type: urlParams.type, //分类——我的发布、我的摘录
      keyword: urlParams.keyword, //关键字搜索
      sort: urlParams.sort, //排序
      filter: urlParams.filter //筛选状态
    }
    this.$router.push({ query: obj })
  }
  changeHandler(obj: any, data: any) {
    this[obj.eventName] && this[obj.eventName](data)
  }
  async getResourceList() {
    const obj: Object = {}
    const postObj = {
      name: this.name, // 关键字搜索
      mine: this.mine === '' ? '' : this.mine, // 我的发布
      status: this.filterValue
      // is_free: this.is_free === 'all' ? '' : this.is_free, // 1免费 0收费
      // role_id: this.role_id === 'all' ? '' : this.role_id, // 发布方
      // education: this.education === 'all' ? '' : this.education, // 适用层次
      // order: this.order, // 排序
      // category_id: this.category_id === -1 ? '' : this.category_id, // 三级筛选
      // status: this.packstatus === '全部' ? '' : this.packstatus, // 筛选审核状态（0：待审，1：通过，2：未通过）,9为未发布
      // is_published: this.is_published === '' ? '' : this.is_published, // 上下架

      // bought: this.bought === '' ? '' : this.bought // 我的摘录
    }
    const res = await ResourcePackageList.getPackageList(postObj)
    this.packagesList = res.data
    console.log('packagesList=', this.packagesList)
  }

  // 选择全部、我的发布、我的摘录
  typeChooseClick(type: string) {
    this.pageType = type
    this.filterValue = null
    this.loadUrl()
  }

  // 最右侧下拉审核状态筛选 清空状态筛选
  dropDownPackstatus(status: any) {
    this.filterValue = status.value
    this.packstatusCN = status
    this.loadUrl()
  }

  // 删除资源包
  deletePackage(id: number) {
    PackageOperate.deletePackage(id).then(res => {
      if (res == true) {
        this.$message({
          message: '成功删除资源包',
          type: 'success'
        })
        this.getResourceList()
      }
    })
  }

  // this.data = await
  // searchName(data) {
  //     console.log('关键字', data)
  //     this.name = data
  //     this.getResourceList()
  // },
  // mounted() {
  //   // 调用分类
  //   this.getNavtypes()
  // methods: {
  //   getResourceList() {
  //     const postObj = {
  //       name: this.name, // 关键字搜索
  //       is_free: this.is_free === 'all' ? '' : this.is_free, // 1免费 0收费
  //       role_id: this.role_id === 'all' ? '' : this.role_id, // 发布方
  //       education: this.education === 'all' ? '' : this.education, // 适用层次
  //       order: this.order, // 排序
  //       category_id: this.category_id === -1 ? '' : this.category_id, // 三级筛选
  //       status: this.packstatus === '全部' ? '' : this.packstatus, // 筛选审核状态（0：待审，1：通过，2：未通过）,9为未发布
  //       is_published: this.is_published === '' ? '' : this.is_published, // 上下架
  //       mine: this.mine === '' ? '' : this.mine, // 我的发布
  //       bought: this.bought === '' ? '' : this.bought // 我的摘录
  //     }

  //   },

  // methods: {
  // getResourceList() {
  //   const postObj = {
  //     name: this.name, // 关键字搜索
  //     is_free: this.is_free === 'all' ? '' : this.is_free, // 1免费 0收费
  //     role_id: this.role_id === 'all' ? '' : this.role_id, // 发布方
  //     education: this.education === 'all' ? '' : this.education, // 适用层次
  //     order: this.order, // 排序
  //     category_id: this.category_id === -1 ? '' : this.category_id, // 三级筛选
  //     status: this.packstatus === '全部' ? '' : this.packstatus, // 筛选审核状态（0：待审，1：通过，2：未通过）,9为未发布
  //     is_published: this.is_published === '' ? '' : this.is_published, // 上下架
  //     mine: this.mine === '' ? '' : this.mine, // 我的发布
  //     bought: this.bought === '' ? '' : this.bought // 我的摘录
  //   }
  //
  // },
  // 获取一级分类
  // getNavtypes() {
  //   const url = 'http://dev.nc.com/api/categories'
  //   axios.get(url).then(res => {
  //     this.navFirstShow = res
  //     this.deepfirst = res
  //     this.getNavtypesecond()
  //   })
  // }
  // 获取二级分类 学科类别
  // getNavtypesecond() {
  //   const arrdep2 = []
  //   const arr = []
  //   const secondList = this.navFirstShow
  //   secondList.forEach(row => {
  //     if (row.children) {
  //       arrdep2.push(row.children)
  //     }
  //   })
  //   arrdep2.forEach(row => {
  //     row.forEach(item => {
  //       arr.push(item)
  //     })
  //   })
  //   this.navSecondShow = arr
  //   this.deepsecond = arr
  //   this.getNavtypethird()
  // },

  // 搜索关键字
  // searchName(data) {
  //   console.log('关键字', data)
  //   this.name = data
  //   this.getResourceList()
  // },
  // 最右侧审核状态筛选
  // setPackstatus(status) {
  //   console.log('筛选状态', status)
  //   this.packstatusCN = status
  //   if (this.packstatusCN === '全部') {
  //     this.packstatus = ''
  //     this.is_published = ''
  //   }
  //   if (this.packstatusCN === '待审核') {
  //     this.packstatus = 0
  //     this.is_published = 0
  //   }
  //   if (this.packstatusCN === '已通过') {
  //     this.packstatus = 1
  //   }
  //   if (this.packstatusCN === '未通过') {
  //     this.packstatus = 2
  //   }
  //   if (this.packstatusCN === '待发布') {
  //     this.packstatus = 9
  //   }
  //   this.getResourceList()
  // },
  // 左侧三个筛选
  // typeChoose(type) {
  //   this.typechoose = type
  //   console.log('type=', type)
  //   if (type === 'myfa') {
  //     // 我的发布
  //     this.mine = 1
  //     this.sortactive = 'createtime'
  //     this.bought = ''
  //     this.packstatus = ''
  //     this.is_published = ''
  //     this.packstatusCN = '全部'
  //     this.getResourceList()
  //     const obj = {
  //       type: 'release'
  //     }
  //     this.$router.push({ query: obj })
  //   } else if (type === 'all') {
  //     // 选择全部
  //     this.mine = ''
  //     this.bought = ''
  //     this.packstatus = ''
  //     this.is_published = ''
  //     this.getResourceList()
  //     const obj = {
  //       type: 'all'
  //     }
  //     this.$router.push({ query: obj })
  //   } else if (type === 'myzhai') {
  //     // 我的摘录
  //     this.mine = ''
  //     this.bought = 1
  //     this.packstatus = ''
  //     this.getResourceList()
  //     const obj = {
  //       type: 'excerpt'
  //     }
  //     this.$router.push({ query: obj })
  //   }
  // },
  // typeChoose(type) {
  //   this.typechoose = type
  //   console.log('type=', type)
  //   if (type === 'myfa') {
  //     // 我的发布
  //     this.mine = 1
  //     this.sortactive = 'createtime'
  //     this.bought = ''
  //     this.packstatus = ''
  //     this.is_published = ''
  //     this.packstatusCN = '全部'
  //     this.getResourceList()
  //
  //     this.$router.push({ query: obj })
  //   } else if (type === 'all') {
  //     // 选择全部
  //     this.mine = ''
  //     this.bought = ''
  //     this.packstatus = ''
  //     this.is_published = ''
  //     this.getResourceList()
  //
  //   } else if (type === 'myzhai') {
  //     // 我的摘录
  //     this.mine = ''
  //     this.bought = 1
  //     this.packstatus = ''

  //     this.getResourceList()
  //
  //   }
  // },

  // 上下架
  // setPublish(params) {
  //   Resource.ResourcePackage.setPublish(params.id, params.is_publish)
  //     .then(rec => {
  //       this.$message({
  //         message: rec,
  //         type: 'success',
  //       })
  //       this.typeChoose('myfa')
  //     })
  //     .catch(rec => {
  //       console.log(rec)
  //     })
  // },
  // 提交审核
  // setArraignment(obj) {
  //   Resource.ResourcePackage.packageArraignment(obj)
  //     .then(rec => {
  //       this.$message({
  //         message: rec,
  //         type: 'success',
  //       })
  //       this.getResourceList()
  //     })
  //     .catch(rec => {
  //       console.log(rec)
  //     })
  // },
  // 根据创建时间或摘录量进行排序
  // setSorttype(tab) {
  //   if (tab === 'createtime') {
  //     this.sortactive = 'createtime'
  //     console.log('创建时间')
  //   } else if (tab === 'excerptnum') {
  //     this.sortactive = 'excerptnum'
  //   }
  // }
  //   setSorttype(tab) {
  //     if (tab === 'createtime') {
  //       this.sortactive = 'createtime'
  //       console.log('创建时间')
  //     } else if (tab === 'excerptnum') {
  //       this.sortactive = 'excerptnum'
  //     }
  //   }
  // }
}
</script>

<style lang="scss" scoped>
.head {
  width: 100%;
  padding-top: 56px;
  height: 170px;
  background: url('../../../../src/assets/image/bg/resource_banner.jpg');
  .top {
    display: flex;
    justify-content: space-between;
    .left {
      .oneword {
        color: #fff;
        font-size: 16px;
        vertical-align: middle;
        display: inline-block;
        margin-right: 38px;
      }
      .title {
        vertical-align: middle;
        display: inline-block;
        font-size: 32px;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        margin-right: 38px;
      }
    }
    .right {
      .release-btn {
        width: 120px;
        height: 40px;
        background: rgba(255, 120, 60, 1);
        border-radius: 5px;
        text-align: center;
        color: #fff;
        line-height: 37px;
        margin-top: 15px;
        cursor: pointer;
        &:hover {
          background: #f6601d;
          transition: 0.3s;
        }
      }
    }
  }
}
.head-nav {
  margin-bottom: 20px;
  .fist-query {
    -webkit-box-shadow: 0px 5px 10px 0px #e6e6e6;
    box-shadow: 0px 5px 10px 0px #e6e6e6;
    background: #fff;
    height: 70px;
    ul {
      margin-top: 0;
      display: flex;
      padding-left: 0;
      li {
        margin-right: 40px;
        .label {
          display: block;
          line-height: 70px;
          font-weight: 400;
          color: #4c5258;
          cursor: pointer;
          text-align: center;
        }
        .line {
          width: 20px;
          height: 2px;
          background: #ff783c;
          display: none;
          position: relative;
          top: -15px;
          margin: 0 auto;
        }
      }
      li.active {
        .line {
          display: block;
        }
      }
    }
  }
}
.switch_type {
  height: 70px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 5px 10px 0px rgba(230, 230, 230, 1);
  .content {
    font-size: 16px;
    padding-top: 0;
    .title {
      font-weight: bold;
      color: rgba(7, 17, 27, 1);
      width: 60px;
      display: inline-block;
    }
    .item {
      font-weight: 400;
      color: #4c5258;
      margin-right: 40px;
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 70px;
      text-align: center;
      .type {
        display: block;
        line-height: 70px;
      }
      .line {
        width: 20px;
        height: 2px;
        background: #ff783c;
        display: none;
        position: relative;
        top: -15px;
        margin: 0 auto;
      }
    }
    .active {
      color: #ff783c;
      .line {
        display: block;
      }
    }
  }
}
.other_type {
  border-bottom: 1px solid rgba(231, 231, 231, 1);
  padding-bottom: 10px;
  .content {
    padding-top: 28px;
    .type_div {
      margin-bottom: 16px;
      .items {
        width: 992px;
        display: inline-block;
        vertical-align: top;
      }
      .active {
        background: #f5e9e4;
        border-radius: 4px;
        padding: 0px 22px;
        color: #db6735;
      }
    }
    .title {
      display: inline-block;
      font-size: 14px;
      font-weight: 400;
      color: rgba(76, 82, 88, 1);
      margin-right: 32px;
      width: 60px;
      text-align: right;
    }

    .item {
      display: inline-block;
      font-size: 14px;
      font-weight: 400;
      height: 34px;
      line-height: 34px;
      color: rgba(139, 145, 153, 1);
      margin-right: 30px;
      cursor: pointer;
    }
  }
  .subject {
    margin-bottom: 0 !important;
    .item {
      margin-bottom: 13px;
    }
  }
}
.content_box {
  width: 1200px;
  margin: 0 auto;
}
.publish_block {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .type_choose {
    .item {
      font-weight: 400;
      cursor: pointer;
      color: rgba(87, 94, 102, 1);
      margin-right: 37px;
      font-size: 14px;
    }
    .active {
      padding: 2px 13px;
      color: #fff;
      background: #ff783c;
      border-radius: 10px;
    }
  }
  .sort_type {
    .active {
      color: #ff783c;
    }
    .createtime {
      i {
        margin-left: -2px;
        font-size: 13px;
      }
    }
    .excerptnum {
      i {
        margin-left: -2px;
        font-size: 13px;
      }
    }
    span {
      color: #575e66;
      font-size: 14px;
      margin-left: 30px;
      cursor: pointer;
    }
  }
}
.package_list {
  margin-top: 22px;
  .title_block {
    display: flex;
    margin-bottom: 20px;
    justify-content: space-between;
    // .title {
    //   .line {
    //     width: 3px;
    //     display: inline-block;
    //     position: relative;
    //     top: 2px;
    //     margin-right: 10px;
    //     height: 16px;
    //     background: rgba(255, 120, 0, 1);
    //   }
    //   font-size: 18px;
    //   font-weight: bold;
    //   color: #4c5258;
    // }
    .more {
      font-size: 14px;
      transition: 0.3s;
      font-weight: 400;
      color: rgba(139, 145, 153, 1);
      &:hover {
        color: #ff7800;
      }
    }
  }
  .list_box {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .no_data {
    padding-top: 60px;
    text-align: center;
    margin-bottom: 180px;
    .content {
      p {
        font-size: 32px;
        font-weight: 400;
        color: rgba(139, 145, 153, 1);
      }

      span {
        display: inline-block;
        margin-top: 6px;
        cursor: pointer;
        width: 120px;
        line-height: 40px;
        height: 40px;
        background: rgba(255, 211, 0, 1);
        border-radius: 5px;
        color: #993c1e;
      }
    }
  }
  section {
    margin-bottom: 22px;
  }
}
</style>
