import Request from '@/utils/request'
const moduleName = '/excellent_courses' // 模块名

const courseUrl = `/api/${moduleName}/courses` // 课程
const apisUrl = '/apis' // 通用接口
const goodCoursesUrl = `${courseUrl}/good_courses` // 好课推荐
const courseNoteUrl = `${moduleName}/course_notes` // 笔记
const notesListUrl = `${moduleName}/notes/my_list?course_resource_id=` // 获取笔记列表
const replyToUrl = `${courseUrl}/comment_replies` // 评论回复

const discussionListUrl = `${moduleName}/course_resources` // 获取课程资源讨论
const discussionUrl = `${moduleName}/discussions` // 发布讨论接口
const vodPlayAuthUel = '/vod_play_auth' // 获取视频播放授权
const categoryCoursesUrl = `${courseUrl}/category_courses_recommend?category_id=` // 一级分类下的课程列表接口
export const Course = {
  getList(obj: object) {
    //return axios({
    //  url: `${courseUrl}`,
    //  method: 'get',
    //  params: obj
    //})
    return Request.get(`${courseUrl}`, obj)
  },
  getGoodCourse() {
    return Request.xget('/api/excellent_courses/courses/good_courses')
  },
  getDetail(postUrl: string) {
    return Request.post(postUrl)
  },
  // 获取该讲师的其他推荐课程
  getLecture(postObj: any) {
    const url = `${courseUrl}/${postObj.packageId}/other_courses?limit=${postObj.limit}`
    return Request.get(url)
  },
  // 获取右侧推荐课程列表
  getRecommend(postObj: any) {
    const url = `${courseUrl}/${postObj.packageId}/other_courses?type=2&limit=${postObj.limit}`
    return Request.get(url)
  },
  // 获取课程下载资源列表 --o
  getResourcesUploadList(resourceId: number) {
    const url = `${courseUrl}/${resourceId}/supporting_resources_list`
    return Request.get(url)
  },
  // 下载单个资源的url
  getDownloadUrl(postObj: any) {
    const url = `${courseUrl}/${postObj.packageId}/download_attachment`
    return Request.post(url, postObj)
  }
}
const CategoryCourses = {
  getList(id: number) {
    return Request.xget(
      `/api/excellent_courses/courses/category_courses_recommend?category_id=${id}`
    )
  }
}
export { CategoryCourses }
