export class CourseBase implements courseBase.Util {
  handleSpread(items: object, lists: Array<any>): void
}
import { ICategories } from '@/types'
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
}

export default Course
