export abstract class CourseBase implements courseBase.Util {
  abstract handleSpread(items: object): any
  abstract setCateList(
    cateAll: Array<any>,
    id: number,
    cateList: Array<any>
  ): void
  abstract handleUrl(
    url: any,
    id: number,
    cateListSpread: Array<any>,
    cateList: Array<any>,
    cateFixedList: Array<any>
  ): void
}
import { ICategories, ICateList, ICateFixedList } from '@/types'
class Course extends CourseBase {
  // 将分类递归，变成一维数组
  *handleSpread(items: ICategories[] | any): any {
    for (let i = 0; i < items.length; i++) {
      if (items[i].children) {
        yield* this.handleSpread(items[i].children)
      }
      const _item = '' + items[i].parent_id_list
      items[i].parent_id_list = _item
        .substring(0, items[i].parent_id_list.length - 1)
        .substr(1)
        .split(',')
      yield items[i]
    }
  }
  *generatorCate(cateAll: Array<any>, id: number, cateList: Array<any>): any {
    for (let i = 0; i < cateAll.length; i++) {
      const item = cateAll[i]
      if (item.id === id) {
        for (let d = 0; d < 3; d += 1) {
          const n = +item.parent_id_list[d]
          // 设置当前activeID 等级
          cateList[d].activeId = n || 0
          // 设置options 清空记录
          cateList[d].children = []
        }

        for (let x of cateAll) {
          if (x.depth === 1) {
            cateList[0].children.push(x)
          }
        }

        if (item.depth === 1) {
          // 设置二级分类
          cateList[item.depth].children = item.children || []
          if (item.children) {
            item.children.forEach((s: any) => {
              if (s.children) {
                s.children.forEach((t: any) => {
                  cateList[item.depth + 1].children.push(t)
                })
              }
            })
          } else {
            cateList[item.depth + 1].children = []
          }
        }
        if (item.depth === 2) {
          cateAll.forEach(c => {
            if (c.id === +item.parent_id_list[0]) {
              cateList[item.depth - 1].children = c.children || []
            }
          }) // 设置三级分类
          cateList[item.depth].children = item.children || []
        }
        if (item.depth === 3) {
          // 设置上一级
          cateAll.forEach((c: any) => {
            if (c.id === +item.parent_id_list[0]) {
              cateList[item.depth - 2].children = c.children || []
            }
          })
          // 设置当前级
          const d: Array<any> = []
          cateAll.forEach((c: any) => {
            if (c.parent_id === item.parent_id) {
              d.push(c)
            }
          })
          cateList[item.depth - 1].children = d || []
        }
        return
      }

      if (i + 1 === cateAll.length) {
        for (let d = 0; d < 3; d += 1) {
          cateList[d].activeId = 0
          cateList[d].children = []
          cateList[d].children = cateAll.filter(j => j.depth === d + 1)
        }
      }
    }

    yield
  }
  setCateList(cateAll: ICategories[], id: number, cateList: Array<ICateList>) {
    this.generatorCate(cateAll, id, cateList).next()
  }
  // 解析url
  handleUrl(
    url: any,
    id: number,
    cateListSpread: Array<any>,
    cateList: Array<ICateList>,
    cateFixedList: Array<ICateFixedList>
  ) {
    const arr = cateFixedList.filter(item => {
      const a = Object.keys(url).includes(item.types)
      return a
    })

    if (arr.length > 0) {
      id = +url.id || 0
      this.setCateFixedList(arr, url)
      this.setCateList(
        cateListSpread.map(item => item),
        id,
        cateList
      )
    } else {
      id = +url.id || 0
      this.setCateList(
        cateListSpread.map(item => item),
        id,
        cateList
      )
    }
  }

  setCateFixedList(arr: any, url: any) {
    arr.forEach((item: any) => {
      const a = item
      a.activeId = url[item.types]
    })
  }
}

export default Course
