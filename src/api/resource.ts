import Request from '@/utils/request'
const moduleBasedUrl = 'resource_library'

// const Course = {
//   getGoodCourse() {
//     return Request.xget(
//       'http://dev.nc.com/api/excellent_courses/courses/good_courses'
//     )
//   }
// }
const ResourcePackageList = {
  getPackageList(obj: any): Promise<any> {
    const url = `http://dev.nc.com/api/${moduleBasedUrl}`

    return Request.get(url, obj)
  }
}
export { ResourcePackageList }
