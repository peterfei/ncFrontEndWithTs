import Request from '@/utils/request'
const categoriesListUrl = '/api/categories' // 课程列表分类选择
export const Categories = {
  getCategoriesList() {
    return Request.get(categoriesListUrl)
  }
}
