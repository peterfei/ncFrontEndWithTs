import Request from '@/utils/request'

export const Cloud = {
  getList(params:any) {
    return Request.xget(
      '/api/mooc/packages',
      params
    )
  }
}
// const CategoryCourses = {
//   getList(id: number) {
//     return Request.xget(
//       `http://dev.nc.com/api/excellent_courses/courses/category_courses_recommend?category_id=${id}`
//     )
//   }
// }
export { }


// const moocPackageUrl = `${moocModuleBasedUrl}/packages`;// 课程包列表