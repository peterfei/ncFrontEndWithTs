<template>
  <div class="course-list">
    <div class="filter-panel">
      <div class="container">
        <cate-filter-course></cate-filter-course>
      </div>
    </div>
    <div class="list-box-filter">
      <div class="container">
        <div class="list-select">
          <div class="list-select-left">
            <span
              type="text"
              @click="selectActiveFun('date')"
              :style="{
                color: selectActive === 'date' ? '#ff5000' : '#4c5359'
              }"
              >最新</span
            >
            <span
              type="text"
              @click="selectActiveFun('learners')"
              :style="{
                color: selectActive === 'learners' ? '#ff5000' : '#4c5359'
              }"
              >最热</span
            >
            <span
              type="text"
              @click="selectActiveFun('stars')"
              :style="{
                color: selectActive === 'stars' ? '#ff5000' : '#4c5359'
              }"
              >好评</span
            >
          </div>
          <div class="list-select-right">
            <div class="list-select-right-page">
              <span>{{ courseMeta.current_page }}</span
              >/<span>{{ courseMeta.totalPage }}</span>
            </div>
            <div>
              <mini-pagination
                @simplePaginnation="simplePaginnation"
                :totalNum="courseMeta.total"
              ></mini-pagination>
            </div>
          </div>
        </div>
        <div class="list-box" v-if="courseListData.length > 0">
          <div class="list-box-inner">
            <course-item
              :item="item"
              v-for="item in courseListData"
              :key="item.id"
              :courseTitle="item.name"
              :studyMember="item.learners_count"
              :basePrice="item.base_price"
              :imgUrl="item.cover"
              :rateValue="item.stars"
              :labelTitle="item.mark"
              :category="item.category.name"
              :id="item.id"
            >
            </course-item>
          </div>
          <br />
          <div class="block page-block">
            <div class="block ">
              <el-pagination
                layout="prev, pager, next"
                :total="courseMeta.total"
                :page-size="parseInt(courseMeta.per_page, 10)"
                @current-change="handleCurrentChange"
              >
              </el-pagination>
            </div>
          </div>
        </div>
        <div class="list-box" v-else>
          <h6>暂无数据</h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model, Watch } from 'vue-property-decorator'
import { Course } from '@/api/course'
import CateFilterCourse from './components/CateFilterCourse.vue'
import CourseItem from '../../../components/CourserPosterItem/CourserPosterItem.vue'
import MiniPagination from '../../../components/MiniPagination/MiniPagination.vue'
@Component({
  components: {
    CateFilterCourse,
    CourseItem,
    MiniPagination
  }
})
export default class CourseList extends Vue {
  selectActive: string | any = 'date'
  // cateId: '',
  postObj: Object = {}
  courseListData: Array<any> = []
  courseMeta: { totalPage: number; total: number; per_page: number } = {
    totalPage: 0,
    total: 0,
    per_page: 0
  }
  page: number = 1
  @Watch('$route')
  onUrlChange(to: { id: number; query: { id: number } }) {
    // // 获取分类的id
    // this.cateId = to.query.type;
    //next()
    this.page = 1
    this.getCoursesList()
  }

  mounted() {
    this.getCoursesList() // 课程列表
  }
  // 分页
  handleCurrentChange(val: any) {
    this.page = val
    this.getCoursesList() // 课程列表
  }
  // 上面翻页
  simplePaginnation(pageid: number) {
    this.page = pageid
    this.getCoursesList() // 课程列表
  }
  // 根据热度查找
  selectActiveFun(str: string) {
    this.postObj = {
      sort: str
    }
    const obj = {
      ...this.$route.query,
      sort: str
    }
    this.$router.push({
      query: obj
    })
  }
  // 获取课程列表
  getCoursesList() {
    const obj = this.$route.query
    this.selectActive = obj.sort ? obj.sort : 'date'
    const postUrl: {
      limit: number
      page: number
      is_free: number
      category_id: number
      [item: number]: Object //定义索引类型
    } = {
      limit: 20,
      page: this.page,
      is_free: 0,
      category_id: 0
    }
    Object.keys(obj).forEach((item: any) => {
      if (item === 'isPrice') {
        if (obj[item] === 'free') postUrl.is_free = 1
        if (obj[item] === 'charge') postUrl.is_free = 0
      } else if (item === 'id') {
        postUrl.category_id = +obj[item]
        if (+obj[item] === 0 || obj[item] === '0') delete postUrl.category_id
      } else if (item !== 'title') {
        postUrl[item] = obj[item]
      }
    })
    Course.getList(postUrl).then((rec: any) => {
      this.courseListData = rec.data
      this.courseMeta = rec.meta
      this.courseMeta.totalPage = Math.ceil(
        this.courseMeta.total / this.courseMeta.per_page
      )
    })
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 1200px;
  margin: 0 auto;
}
.course-list {
  width: 100%;

  background: rgba(244, 244, 244, 1);
  .list-box {
    width: 100%;
    .list-box-inner {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .courser-poster-item {
        margin-bottom: 20px;
      }
    }
    h6 {
      width: 100%;
      margin: 50px auto;
      text-align: center;
      color: #08111a;
    }
  }
}
.filter-panel {
  width: 100%;
  height: auto;
  background: #fff;
}
.list-box-filter {
  width: 100%;
}
.list-select {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .list-select-left {
    height: 50px;
    line-height: 50px;
    & > span {
      font-size: 14px;
      display: inline-block;
      padding-right: 20px;
      color: #4c5359;
      cursor: pointer;
      &:hover {
        color: #ff5000;
      }
    }
  }
  .list-select-right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 50px;
    color: #4c5359;
    font-size: 12px;
    .list-select-right-page {
      margin-right: 10px;
    }
    .list-select-right-page > span:first-child {
      color: rgba(255, 80, 0, 1);
    }
  }
}
.page-block {
  background: rgba(244, 244, 244, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px auto 100px;
  & ::v-deep button {
    background: rgba(244, 244, 244, 1);
    background-color: rgba(244, 244, 244, 1) !important;
  }
  & ::v-deep li {
    background: rgba(244, 244, 244, 1);
  }
}
</style>
