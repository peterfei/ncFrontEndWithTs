export abstract class CourseBase implements courseBase.Util {
  abstract handleSpread(items: object, lists: Array<any>): void
  abstract setCateList(
    cateAll: Array<any>,
    id: number,
    cateList: Array<any>
  ): void
}
import { ICategories, ICateList } from '@/types'
class Course extends CourseBase {
  // 将分类递归，变成一维数组
  handleSpread(items: ICategories, lists: Array<any>) {
    if (items.children) {
      items.children.forEach((child: any) => this.handleSpread(child, lists))
    }
    const item = '' + items.parent_id_list
    items.parent_id_list = item
      .substring(0, item.length - 1)
      .substr(1)
      .split(',')

    lists.push(items)
  }

  setCateList(cateAll: ICategories[], id: number, cateList: Array<ICateList>) {
    const len = cateAll.length
    // depth 当前分类等级1，2，3
    for (let i = 0; i < len; i += 1) {
      const item = cateAll[i]
      if (item.id === id) {
        for (let d = 0; d < 3; d += 1) {
          const n = +item.parent_id_list[d]
          // 设置当前activeID 等级
          cateList[d].activeId = n || 0
          // 设置children 清空记录
          cateList[d].children = []
        }
        // 设置 一级children
        cateAll.forEach(r => {
          const _cate_children = cateList[0].children
          if (r.depth === 1) _cate_children.push(r)
        })

        if (item.depth === 1) {
          // 设置二级分类
          cateList[item.depth].children = item.children || []
          // 设置三级分类
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
          cateAll.forEach((c: any) => {
            if (c.id === parseInt(item.parent_id_list[0], 10)) {
              cateList[item.depth - 1].children = c.children || []
            }
          }) // 设置三级分类
          cateList[item.depth].children = item.children || []
        }
        if (item.depth === 3) {
          // 设置上一级
          cateAll.forEach((c: any) => {
            if (c.id === parseInt(item.parent_id_list[0], 10)) {
              cateList[item.depth - 2].children = c.children || []
            }
          })
          // 设置当前级
          const d: Array<ICategories> = []
          cateAll.forEach((c: any) => {
            if (c.parent_id === item.parent_id) {
              d.push(c)
            }
          })
          cateList[item.depth - 1].children = d || []
        }
        return
        // 找到每个等级的 activeID
      }
      if (i + 1 === len) {
        for (let d = 0; d < 3; d += 1) {
          cateList[d].activeId = 0
          cateList[d].children = []
          //  this.cateList[d].children.push(cateAll)
          cateList[d].children = cateAll.filter(
            (j: ICategories) => j.depth === d + 1
          )
        }
      }
    }
  }
}

export default Course
