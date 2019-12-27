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

<script>
// import CategoriesApi from '@/api/categories/categories'
import CateFilterGroup from './CateFilterGroup.vue'
import CateFilterItem from './CateFilterItem.vue'
import CateFixedFilter from './CateFixedFilter.vue'

export default {
  name: 'CateFilterCourse',
  components: {
    CateFilterGroup,
    CateFilterItem,
    CateFixedFilter
  },
  props: ['cateId'],
  data() {
    return {
      id: null, // 根据路由获取的cateID
      cateListSpread: [], // 将分类递归，变成一维数组
      arr: ['学科类别', '学习方向'],
      cateList: [
        {
          id: 'cate1',
          activeId: 1,
          title: '学科类别',
          options: []
        },
        {
          id: 'cate2',
          activeId: 1,
          title: '学习方向',
          options: []
        },
        {
          id: 'cate3',
          activeId: 1,
          title: '课程类别',
          options: []
        }
      ],
      cateFixedList: [
        {
          id: 'cate4',
          activeId: 0,
          title: '收费类型',
          type: 'isCharge',
          options: [
            {
              name: '免费',
              value: 'free',
              id: 'free',
              type: 'isCharge'
            },
            {
              name: '收费',
              value: 'charge',
              id: 'charge',
              type: 'isCharge'
            }
          ]
        },
        {
          id: 'cate5',
          activeId: 0,
          title: '发布方',
          type: 'publisher',
          options: [
            {
              name: '教师',
              value: 'tec',
              id: 'tec',
              type: 'publisher'
            },
            {
              name: '企业',
              value: 'co',
              id: 'co',
              type: 'publisher'
            },
            {
              name: '专家',
              value: 'expert',
              id: 'expert',
              type: 'publisher'
            },
            {
              name: '学生',
              value: 'stu',
              id: 'stu',
              type: 'publisher'
            }
          ]
        },
        {
          id: 'cate6',
          activeId: 0,
          title: '适合层次',
          type: 'level',
          options: [
            {
              name: '中职',
              value: 'sv',
              id: 'sv',
              type: 'level'
            },
            {
              name: '高职',
              value: 'hv',
              id: 'hv',
              type: 'level'
            },
            {
              name: '本科及以上',
              value: 'bs',
              id: 'bs',
              type: 'level'
            },
            {
              name: '其他',
              value: 'other',
              id: 'other',
              type: 'level'
            }
          ]
        }
        // {
        //   id: 'cate7',
        //   activeId: 0,
        //   title: '排序',
        //   type: 'sort',
        //   options: [
        //     {
        //       name: '创建时间',
        //       value: 'ct',
        //       id: 'ct',
        //       type: 'sort'
        //     },
        //     {
        //       name: '摘录量',
        //       value: 'excer',
        //       id: 'excer',
        //       type: 'level'
        //     },
        //     {
        //       name: '价格',
        //       value: 'price',
        //       id: 'price',
        //       type: 'level'
        //     },
        //     {
        //       name: '其他',
        //       value: 'other',
        //       id: 'other',
        //       type: 'level'
        //     }
        //   ]
        // }
      ]
    }
  },
  watch: {
    $route(to) {
      const url = to.query
      this.id = url.id ? parseInt(url.id, 10) : null
      this.handleUrl(url)
    }
  },
  mounted() {
    const obj = JSON.stringify(this.$route.query)
    //  获取数据
    // CategoriesApi.getCategoriesList()
    //   .then(async rec => {
    //     if (rec.length > 0) {
    //       rec.forEach(item => {
    //         this.handleSpread(item)
    //       })
    //       // 排序
    //       this.cateListSpread.sort((a, b) => a.depth - b.depth)

    //       await this.setCateList(
    //         this.cateListSpread.map(item => JSON.parse(item))
    //       )
    //     }
    //   })
    //   .catch(() => {})

    if (obj !== '{}') {
      this.handleUrl(this.$route.query)
    }
  },
  methods: {
    // 解析url
    handleUrl(url) {
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
    },
    // 将分类递归，变成一维数组
    handleSpread(item) {
      if (item.children) {
        item.children.forEach(a => this.handleSpread(a))
      }
      const a = item
      a.parent_id_list = item.parent_id_list
        .substring(0, item.parent_id_list.length - 1)
        .substr(1)
        .split(',')
      const b = JSON.stringify(a)
      this.cateListSpread.push(b)
    },
    setCateList(cateAll) {
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
          cateAll.forEach(r => {
            if (r.depth === 1) this.cateList[0].options.push(r)
          })

          if (item.depth === 1) {
            // 设置二级分类
            this.cateList[item.depth].options = item.children || []
            // 设置三级分类
            if (item.children) {
              item.children.forEach(s => {
                if (s.children) {
                  s.children.forEach(t => {
                    this.cateList[item.depth + 1].options.push(t)
                  })
                }
              })
            } else {
              this.cateList[item.depth + 1].options = []
            }
          }
          if (item.depth === 2) {
            cateAll.forEach(c => {
              if (c.id === parseInt(item.parent_id_list[0], 10)) {
                this.cateList[item.depth - 1].options = c.children || []
              }
            }) // 设置三级分类
            this.cateList[item.depth].options = item.children || []
          }
          if (item.depth === 3) {
            // 设置上一级
            cateAll.forEach(c => {
              if (c.id === parseInt(item.parent_id_list[0], 10)) {
                this.cateList[item.depth - 2].options = c.children || []
              }
            })

            // 设置当前级
            const d = []
            cateAll.forEach(c => {
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
            this.cateList[d].options = cateAll.filter(j => j.depth === d + 1)
          }
        }

        // this.cateList[item.depth - 1].options.push(item);
      }
    },
    // 找url对应的具体那一个，并设置他的样式 设置样式
    setCateFixedList(arr, url) {
      arr.forEach(item => {
        const a = item
        a.activeId = url[item.type]
      })
    },
    handleOut() {}
  }
}
</script>

<style>
.cate-filter-course {
  position: relative;
  width: 100%;
  min-height: 256px;
}
</style>
