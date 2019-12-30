<template>
  <div class="cate-filter-course">
    <cate-filter-group>
      <template slot="cate">
        <div v-for="item in cateList" :key="item.id">
          <cate-filter-item :cata-data="item"></cate-filter-item>
        </div>
      </template>
      <template slot="cateFixed">
        <div v-for="item in cateFixedList" :key="item.id">
          <cate-fixed-filter :cata-data="item"></cate-fixed-filter>
        </div>
      </template>
    </cate-filter-group>
  </div>
</template>

<script lang="ts">
import Course from '@/views/course/course' //抽离部分方法在这个类里,目的是更好的融合使用OOP思想在项目
import { Component, Vue, Prop, Model, Watch } from 'vue-property-decorator'
import { Categories } from '@/api/categories'
import CateFilterGroup from './CateFilterGroup.vue'
import CateFilterItem from './CateFilterItem.vue'
import CateFixedFilter from './CateFixedFilter.vue'
import { ICateList, ICateFixedList, ICateOption, ICategories } from '@/types'
import { mockCateLists, mockCateFixedList } from '@/mocks'
@Component({
  components: {
    CateFilterGroup,
    CateFilterItem,
    CateFixedFilter
  }
})
export default class CateFilterCourse extends Vue {
  @Prop({ default: '0' }) cateId!: string
  id: any = 0 // 根据路由获取的cateID
  cateListSpread: Array<any> = [] // 将分类递归，变成一维数组
  cateList: Array<ICateList> = mockCateLists
  cateFixedList: Array<ICateFixedList> = mockCateFixedList
  categories: Array<ICategories> = []

  @Watch('$route', { immediate: true, deep: true })
  onUrlChange(to: { id: number; query: { id: number } }) {
    const url = to.query
    this.id = url.id ? +url.id : 0
    let _course = new Course()
    _course.handleUrl(
      url,
      this.id,
      this.cateListSpread,
      this.cateList,
      this.cateFixedList
    )
  }

  async mounted() {
    const obj = JSON.stringify(this.$route.query)

    //  获取数据

    this.categories = await Categories.getCategoriesList()
    console.log(`categories dicts is `, this.categories)
    let _course = new Course()
    for (const x of _course.handleSpread(this.categories)) {
      this.cateListSpread.push(x)
      //this.cateListSpread = Array.from(new Set([...this.cateListSpread, ...x]))
    }
    console.log(`-------cateListSpread`, this.cateListSpread)
    if (obj !== '{}') {
      let _course = new Course()
      _course.handleUrl(
        this.$route.query,
        this.id || 0,
        this.cateListSpread,
        this.cateList,
        this.cateFixedList
      )
    }
  }

  handleOut() {}
}
</script>

<style>
.cate-filter-course {
  position: relative;
  width: 100%;
  height: 256px;
}
</style>
