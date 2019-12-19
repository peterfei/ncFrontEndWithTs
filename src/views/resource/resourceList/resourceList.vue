<template>
  <div style="width:100%;background:#f7f8fa">
    <div class="head">
      <!-- 上部 -->
      <div class="w-1200">
        <div class="top">
          <div class="left">
            <!-- <search-block @search="searchName"></!-->
            -->
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
    <!-- 多级选项卡 -->
    <div class="head-nav">
      <div class="switch_type">
        <div class="content">
          <div
            class="item"
            @click="setNavActive(-1)"
            :class="{ active: navFirstCurrent == -1 }"
          >
            <span class="type">全部</span>
            <span class="line"></span>
          </div>
          <div
            class="item"
            v-for="item in navFirstShow"
            :key="item.id"
            @click="setNavActive(item.id)"
            :class="{ active: item.id == navFirstCurrent }"
          >
            <span class="type">{{ item.name }}</span>
            <span class="line"></span>
          </div>
        </div>
      </div>
      <div class="other_type w-1200">
        <div class="content">
          <!-- 学科类别 -->
          <div class="subject type_div" v-if="navSecondShow.length">
            <span class="title">学科类别:</span>
            <span
              class="item"
              :class="{ active: navActiveSecond == -1 }"
              @click="setNavSecond(-1)"
              :index="-1"
              >全部{{ index }}</span
            >
            <div class="items">
              <span
                class="item"
                v-for="item in navSecondShow"
                :index="item.id"
                :key="item.id"
                :class="{ active: item.id == navActiveSecond }"
                @click="setNavSecond(item.id)"
              >
                {{ item.name }}
              </span>
            </div>
          </div>
          <!-- 课程类别 -->
          <div class="course type_div" v-if="navThirdShow.length">
            <span class="title">课程类别:</span>
            <span
              class="item"
              @click="setNavThird(-1)"
              :class="{ active: navThirdActive == -1 }"
              >全部</span
            >
            <span
              class="item"
              v-for="item in navThirdShow"
              :index="item.id"
              :class="{ active: item.id == navThirdActive }"
              :key="item.id"
              @click="setNavThird(item.id)"
            >
              {{ item.name }}
            </span>
          </div>

          <!-- 收费类型 -->
          <div class="charge type_div">
            <span class="title">收费类型:</span>
            <span
              class="item"
              @click="setChargeActive('all')"
              :class="{ active: is_free == 'all' }"
              >全部</span
            >
            <span
              class="item"
              @click="setChargeActive(0)"
              :class="{ active: is_free == 0 }"
              >收费</span
            >
            <span
              class="item"
              @click="setChargeActive(1)"
              :class="{ active: is_free == 1 }"
              >免费</span
            >
          </div>

          <!-- 发布方role_id -->
          <div class="publish type_div">
            <span class="title">发布方:</span>
            <span
              class="item"
              @click="setPublishActive('all')"
              :class="{ active: role_id == 'all' }"
              >全部</span
            >
            <span
              class="item"
              @click="setPublishActive(3)"
              :class="{ active: role_id == 3 }"
              >教师</span
            >
            <span
              class="item"
              @click="setPublishActive(4)"
              :class="{ active: role_id == 4 }"
              >企业</span
            >
            <span
              class="item"
              @click="setPublishActive(5)"
              :class="{ active: role_id == 5 }"
              >专家</span
            >
            <span
              class="item"
              @click="setPublishActive(2)"
              :class="{ active: role_id == 2 }"
              >学生</span
            >
          </div>

          <!-- 适合层次 -->
          <div class="scope type_div">
            <span class="title">适合层次:</span>
            <span
              class="item"
              @click="setScopeActive('all')"
              :class="{ active: education == 'all' }"
              >全部</span
            >
            <span
              class="item"
              @click="setScopeActive(1)"
              :class="{ active: education == 1 }"
              >中职</span
            >
            <span
              class="item"
              @click="setScopeActive(2)"
              :class="{ active: education == 2 }"
              >高职</span
            >
            <span
              class="item"
              @click="setScopeActive(3)"
              :class="{ active: education == 3 }"
              >本科及以上</span
            >
            <span
              class="item"
              @click="setScopeActive(0)"
              :class="{ active: education == 0 }"
              >其他</span
            >
          </div>
          <!-- 排序order -->
          <div class="sort type_div">
            <span class="title">排序:</span>
            <span
              class="item"
              @click="setSortActive('created_at')"
              :class="{ active: order == 'created_at' }"
              >创建时间</span
            >
            <span
              class="item"
              @click="setSortActive('bought_num')"
              :class="{ active: order == 'bought_num' }"
              >摘录量</span
            >
            <span
              class="item"
              @click="setSortActive('price')"
              :class="{ active: order == 'price' }"
              >价格</span
            >
          </div>
        </div>
      </div>
    </div>
    <!-- 多级选项卡结束 -->
    <!-- 发布 -->
    <div class="w-1200">
      <div class="publish_block">
        <div class="type_choose">
          <span
            class="item"
            :class="{ active: typechoose == 'all' }"
            @click="typeChoose('all')"
            >全部</span
          >
          <span
            class="item"
            :class="{ active: typechoose == 'myfa' }"
            @click="typeChoose('myfa')"
            >我的发布</span
          >
          <span
            class="item"
            :class="{ active: typechoose == 'myzhai' }"
            @click="typeChoose('myzhai')"
            >我的摘录</span
          >
        </div>
        <div class="sort_type">
          <el-dropdown @command="setPackstatus" v-if="typechoose == 'myfa'">
            <span class="el-dropdown-link">
              {{ packstatusCN
              }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="全部" v-if="packstatusCN != '全部'"
                >全部</el-dropdown-item
              >
              <el-dropdown-item command="待审核">待审核</el-dropdown-item>
              <el-dropdown-item command="已通过">已通过</el-dropdown-item>
              <el-dropdown-item command="未通过">未通过</el-dropdown-item>
              <el-dropdown-item command="待发布">待发布</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <!-- 发布按钮结束 -->
      <!-- 教学包列表 -->
      <div class="package_list">
        <!-- 优选教学包 -->
        <section>
          <div class="list_box" v-if="noList == false">
            <!-- {{packagesList.data}} -->
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
              :status="item.status"
              :is_published="item.is_published"
              :typechoose="typechoose"
              @setPublish="setPublish"
              @setArraignment="setArraignment"
            >
            </package-item> -->
          </div>
          <div class="no_excerpt no_data" v-if="noList == true">
            <div class="content">
              <p>您还没有摘录的教学包~</p>
              <span>前往摘录</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios';
// import Resource from '@/api/resource/index';
// import SearchBlock from './components/SearchBlock.vue';
// import PackageItem from './components/PackageItem.vue';

export default {
  name: 'ResourceList',
  data() {
    return {
      current: -1,
      index: null,
      deepfirst: '', // 一级分类总数据
      navFirstShow: '', // 一级分类实际显示数据
      navFirstCurrent: -1,
      deepsecond: '', // 二级学科类别总数据
      navSecondShow: '', // 二级学科类别显示数据
      navActiveSecond: -1,
      deepthird: '', // 三级课程类别总数据
      navThirdShow: '', // 三级课程类别展示数据
      navThirdActive: -1,
      name: '', // 关键字搜搜
      publishCurrent: 'all', // 发布方筛选
      packagesList: [],
      noList: false, // 是否有数据
      selected: null,
      packstatusCN: '全部', // 审核状态 中文
      packstatus: '', // 审核状态
      typechoose: 'all',
      status: '', // 审核状态
      is_published: '', // 是否上架
      category_id: '', // 类别ID
      is_free: 'all', // 1免费 0不免费
      role_id: 'all', // 发布方
      education: 'all', // 适用层次 0 其他 1：中职 2：高职 3本科及以上
      order: 'created_at', // 排序 创建时间created_at  摘录量bought_num  价格price
      mine: '', // 我发布的
      bought: '', // 我摘录的
      sortactive: 'createtime' // 根据创建时间
    }
  },
  components: {
    // SearchBlock,
    // PackageItem,
  },
  mounted() {
    // 调用分类
    this.getNavtypes()

    // 获取列表数据
    this.getResourceList()
  },

  methods: {
    getResourceList() {
      const postObj = {
        name: this.name, // 关键字搜索
        is_free: this.is_free === 'all' ? '' : this.is_free, // 1免费 0收费
        role_id: this.role_id === 'all' ? '' : this.role_id, // 发布方
        education: this.education === 'all' ? '' : this.education, // 适用层次
        order: this.order, // 排序
        category_id: this.category_id === -1 ? '' : this.category_id, // 三级筛选
        status: this.packstatus === '全部' ? '' : this.packstatus, // 筛选审核状态（0：待审，1：通过，2：未通过）,9为未发布
        is_published: this.is_published === '' ? '' : this.is_published, // 上下架
        mine: this.mine === '' ? '' : this.mine, // 我的发布
        bought: this.bought === '' ? '' : this.bought // 我的摘录
      }
      // Resource.ResourcePackage.getResourceList(postObj)
      //   .then(rec => {
      //     console.log('列表=', rec)
      //     this.packagesList = rec
      //     if (rec.data.length > 0) {
      //       console.log(rec)
      //     } else {
      //       console.log(rec)
      //     }
      //   })
      //   .catch(rec => {
      //     console.log(rec)
      //   })
    },

    // 获取一级分类
    getNavtypes() {
      const url = 'http://dev.nc.com/api/categories'
      // axios.get(url).then(res => {
      //   this.navFirstShow = res
      //   this.deepfirst = res
      //   this.getNavtypesecond()
      // })
    },

    // 获取二级分类 学科类别
    getNavtypesecond() {
      const arrdep2 = []
      const arr = []
      const secondList = this.navFirstShow
      secondList.forEach(row => {
        if (row.children) {
          arrdep2.push(row.children)
        }
      })
      arrdep2.forEach(row => {
        row.forEach(item => {
          arr.push(item)
        })
      })
      this.navSecondShow = arr
      this.deepsecond = arr
      this.getNavtypethird()
    },

    // 获取三级分类 课程类别
    getNavtypethird() {
      const arrdep3 = []
      const arr = []
      const thirdList = this.navSecondShow
      console.log('thirdList', thirdList)
      thirdList.forEach(row => {
        if (row.children) {
          arrdep3.push(row.children)
        }
      })
      arrdep3.forEach(row => {
        row.forEach(item => {
          arr.push(item)
        })
      })
      this.deepthird = arr
      this.navtypethird = arr
      this.navThirdShow = arr
    },

    // 一级分类选中
    setNavActive(index) {
      console.log('this.deepsecond', this.deepsecond)
      this.navActiveSecond = -1 // 确保学科类别 全部 选中
      const arr = []
      // 当选择全部时
      if (index === -1) {
        this.navSecondShow = this.deepsecond
      } else {
        // 没有选择全部时
        this.deepsecond.forEach(item => {
          if (item.parent_id === index) {
            arr.push(item)
          }
        })
        this.navSecondShow = arr
      }
      // 获取三级分类
      this.getNavtypethird()

      // 如果该一级分类下不存在二级分类 则二级分类不用展示
      if (this.navSecondShow.length === 0) {
        this.navSecondShow = ''
        this.category_id = index
        console.log('没有二级分类时category_id=', this.category_id)
      } else {
        this.navSecondShow = arr
      }
      this.category_id = index
      this.getResourceList()
      this.navFirstCurrent = index
    },

    // 二级分类选中
    setNavSecond(index) {
      const arr = []
      // 当选择全部时
      if (index === -1) {
        this.navThirdShow = this.deepthird
      } else {
        this.deepthird.forEach(item => {
          if (item.parent_id === index) {
            arr.push(item)
          }
        })
        this.navThirdShow = arr
      }
      this.category_id = index
      this.getResourceList()
      console.log('课程类别=', this.navThirdShow)
      this.navActiveSecond = index
    },

    // 第三行选中
    setNavThird(index) {
      this.navThirdActive = index
      this.category_id = index
      this.getResourceList()
    },
    // 收费类型
    setChargeActive(name) {
      this.is_free = name
      this.getResourceList()
    },
    // 发布方 role_id
    setPublishActive(name) {
      this.role_id = name
      this.getResourceList()
    },
    // 适合层次
    setScopeActive(name) {
      this.education = name
      this.getResourceList()
    },
    // 排序 order
    setSortActive(name) {
      this.order = name
      this.getResourceList()
    },

    // 搜索关键字
    searchName(data) {
      console.log('关键字', data)
      this.name = data
      this.getResourceList()
    },

    // 最右侧审核状态筛选
    setPackstatus(status) {
      console.log('筛选状态', status)
      this.packstatusCN = status
      if (this.packstatusCN === '全部') {
        this.packstatus = ''
        this.is_published = ''
      }
      if (this.packstatusCN === '待审核') {
        this.packstatus = 0
        this.is_published = 0
      }
      if (this.packstatusCN === '已通过') {
        this.packstatus = 1
      }
      if (this.packstatusCN === '未通过') {
        this.packstatus = 2
      }
      if (this.packstatusCN === '待发布') {
        this.packstatus = 9
      }
      this.getResourceList()
    },
    // 左侧三个筛选
    typeChoose(type) {
      this.typechoose = type
      console.log('type=', type)
      if (type === 'myfa') {
        // 我的发布
        this.mine = 1
        this.sortactive = 'createtime'
        this.bought = ''
        this.packstatus = ''
        this.is_published = ''
        this.packstatusCN = '全部'
        this.getResourceList()
        const obj = {
          type: 'release'
        }
        this.$router.push({ query: obj })
      } else if (type === 'all') {
        // 选择全部
        this.mine = ''
        this.bought = ''
        this.packstatus = ''
        this.is_published = ''
        this.getResourceList()
        const obj = {
          type: 'all'
        }
        this.$router.push({ query: obj })
      } else if (type === 'myzhai') {
        // 我的摘录
        this.mine = ''
        this.bought = 1
        this.packstatus = ''

        this.getResourceList()
        const obj = {
          type: 'excerpt'
        }
        this.$router.push({ query: obj })
      }
    },

    // 上下架
    setPublish(params) {
      // Resource.ResourcePackage.setPublish(params.id, params.is_publish)
      //   .then(rec => {
      //     this.$message({
      //       message: rec,
      //       type: 'success',
      //     })
      //     this.typeChoose('myfa')
      //   })
      //   .catch(rec => {
      //     console.log(rec)
      //   })
    },

    // 提交审核
    setArraignment(obj) {
      // Resource.ResourcePackage.packageArraignment(obj)
      //   .then(rec => {
      //     this.$message({
      //       message: rec,
      //       type: 'success',
      //     })
      //     this.getResourceList()
      //   })
      //   .catch(rec => {
      //     console.log(rec)
      //   })
    },

    // 根据创建时间或摘录量进行排序
    setSorttype(tab) {
      if (tab === 'createtime') {
        this.sortactive = 'createtime'
        console.log('创建时间')
      } else if (tab === 'excerptnum') {
        this.sortactive = 'excerptnum'
      }
    }
  }
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
