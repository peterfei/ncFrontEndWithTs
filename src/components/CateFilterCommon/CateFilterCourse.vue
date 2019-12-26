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
import { Categories } from '@/api/categories'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { mockCateLists } from '@/mocks/index'
import { mockCateFixedList } from '@/mocks/index'
import { ICateList, ICateFixedList, ICateOption, ICategories } from '@/types'

import CateFilterGroup from './CateFilterGroup.vue'
import CateFilterItem from './CateFilterItem.vue'
import CateFixedFilter from './CateFixedFilter.vue'

@Component({
  components: {
    CateFilterGroup,
    CateFilterItem,
    CateFixedFilter
  }
})
export default class CateFilterCourse extends Vue {
  public cateListSpread: Array<any> = [] // 将分类递归，变成一维数组
  public cateList: Array<any> = mockCateLists //三级后端接口分类
  public cateFixedList: Array<any> = mockCateFixedList //自定义数据配置
  async mounted() {
    const obj = JSON.stringify(this.$route.query)
    // 获取课程分类
    // const res = await Categories.getCategoriesList()
    // if (res.length > 0) {
    //   res.forEach((item: any) => {
    //     this.handleSpread(item)
    //   })
    //   // 排序
    //   this.cateListSpread.sort((a, b) => a.depth - b.depth)
    //   await this.setCateList(this.cateListSpread.map(item => JSON.parse(item)))
    // }
    // if (obj !== '{}') {
    //   this.handleUrl(this.$route.query)
    // }
    this.categories = await Categories.getCategoriesList()
    console.log(`categories dicts is `, this.categories)
    this.categories.forEach((cate: any) => {
      this.handleSpread(cate)
    })

    console.log(`cateListSpread`, this.cateListSpread)
    if (obj !== '{}') {
      this.handleUrl(this.$route.query)
    }
  }
  @Watch('$route', { immediate: true, deep: true })
  onUrlChange(to: { id: number; query: { id: number } }) {
    console.log('监听watch route')
    const url = to.query
    this.id = url.id ? +url.id : -1
    this.handleUrl(url)
  }
  // 解析url
  handleUrl(url: any) {
    console.log(111)
    // 自定义的配置
    const arr = this.cateFixedList.filter(item => {
      const a = Object.keys(url).includes(item.type)
      return a
    })
    if (arr.length > 0) {
      this.id = parseInt(url.id, 10) || null
      this.setCateFixedList(arr, url)
    } else {
      this.id = parseInt(url.id, 10) || null
    }
    this.setCateList(this.cateListSpread.map(item => JSON.parse(item)))
  }
  handleSpread(item: any) {
    if (item.children) {
      item.children.forEach((a: any) => this.handleSpread(a))
    }
    const a = item
    a.parent_id_list = item.parent_id_list
      .substring(0, item.parent_id_list.length - 1)
      .substr(1)
      .split(',')
    const b = JSON.stringify(a)
    this.cateListSpread.push(b)
  }
  setCateList(cateAll: any) {
    const len = cateAll.length
    // depth 当前分类等级1，2，3
    for (let i = 0; i < len; i += 1) {
      const item = cateAll[i]
      if (item.id === this.id) {
        for (let d = 0; d < 3; d += 1) {
          const n = parseInt(item.parent_id_list[d], 10)
          // 设置当前activeID 等级
          this.cateList[d].activeId = n || 0
          // 设置options 清空记录
          this.cateList[d].options = []
        }
        // 设置 一级options
        cateAll.forEach((r: any) => {
          if (r.depth === 1) this.cateList[0].options.push(r)
        })

        if (item.depth === 1) {
          // 设置二级分类
          this.cateList[item.depth].options = item.children || []
          // 设置三级分类
          if (item.children) {
            item.children.forEach((s: any) => {
              if (s.children) {
                s.children.forEach((t: any) => {
                  this.cateList[item.depth + 1].options.push(t)
                })
              }
            })
          } else {
            this.cateList[item.depth + 1].options = []
          }
        }
        if (item.depth === 2) {
          cateAll.forEach((c: any) => {
            if (c.id === parseInt(item.parent_id_list[0], 10)) {
              this.cateList[item.depth - 1].options = c.children || []
            }
          }) // 设置三级分类
          this.cateList[item.depth].options = item.children || []
        }
        if (item.depth === 3) {
          // 设置上一级
          cateAll.forEach((c: any) => {
            if (c.id === parseInt(item.parent_id_list[0], 10)) {
              this.cateList[item.depth - 2].options = c.children || []
            }
          })

          // 设置当前级
          const d: Array<any> = []
          cateAll.forEach((c: any) => {
            if (c.parent_id === item.parent_id) {
              d.push(c)
            }
          })
          this.cateList[item.depth - 1].options = d || []
        }
        // 找到每个等级的 activeID
        return
      }
      if (i + 1 === len) {
        for (let d = 0; d < 3; d += 1) {
          this.cateList[d].activeId = 0
          this.cateList[d].options = []
          //  this.cateList[d].options.push(cateAll)
          this.cateList[d].options = cateAll.filter(
            (j: any) => j.depth === d + 1
          )
        }
      }

      // this.cateList[item.depth - 1].options.push(item);
    }
  }
  // 找url对应的具体那一个，并设置他的样式 设置样式
  setCateFixedList(arr: any, url: any) {
    console.log('设置样式')
    arr.forEach((item: any) => {
      const a = item
      a.activeId = url[item.type]
    })
  }
  handleOut() {}
}
</script>
<style>
.cate-filter-course {
  position: relative;
  width: 100%;
  min-height: 256px;
}
</style>
