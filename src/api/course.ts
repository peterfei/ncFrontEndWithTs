import Request from '@/utils/request'

export const Course = {
  getGoodCourse() {
    return Request.xget(
      'http://dev.nc.com/api/excellent_courses/courses/good_courses'
    )
  }
}
const CategoryCourses = {
  getList(id: number) {
    return Request.xget(
      `http://dev.nc.com/api/excellent_courses/courses/category_courses_recommend?category_id=${id}`
    )
  }
}
export { CategoryCourses }
