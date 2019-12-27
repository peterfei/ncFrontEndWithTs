import { getInfo } from './../utils/test'
import Request from '@/utils/request'
const moocModuleBasedUrl = '/api/mooc'

const moocPackageUrl = `${moocModuleBasedUrl}/packages` // 课程包列表
const moocPopularity = `${moocModuleBasedUrl}/popularity` // 课程包列表【人气爆棚】
const moocMogulUrl = `${moocModuleBasedUrl}/mogul` // 课程包列表【大咖推荐】
const moocIssues = `${moocModuleBasedUrl}/issues` // 期刊


export default {
  // 课程包列表
  getList(params: any) {
    const url = `${moocPackageUrl}`
    console.log(params)
    return Request.get(url, params)
  },
  // 课程包(人气爆棚)
  getPopularity() {
    return Request.get(moocPopularity)
  },
  // 课程包(大咖推荐)
  getRecommendList() {
    return Request.get(moocMogulUrl)
  },
  // 单个期刊的详情接口{{host}}/api/mooc/issues/{id}
  getPeriodical(id: number) {
    // console.log(1111111111111111111111, id);
    const url = `${moocIssues}/${id}`
    return Request.get(url)
  },
  //all_issues期刊 api/mooc/packages/{id}/all_issues
  getIssuesOptions(id: number) {
    const url = `${moocPackageUrl}/${id}/all_issues`
    return Request.get(url)
  },
  // 学习大纲
  getSyllabuses(id: number) {
    const url = `${moocIssues}/${id}/syllabuses`
    return Request.get(url)
  },
  // 公告
  getNotice(id: number) {
    const url = `${moocIssues}/${id}/notices`
    return Request.get(url)
  },
  // 课程评价
  // c_id课程包id;qi_id期刊id
  getComment(commentListObj: any) {
    const url = `${moocPackageUrl}/${commentListObj.c_id}/comments?mooc_issue_id=${commentListObj.qi_id}`
    return Request.get(url)
  },
  // 新增评论 {{host}}/api/mooc/issues/{id}/comments
  getAddComment(params: any) {
    const url = `${moocIssues}/${params.id}/comments`
    return Request.post(url, params)
  }
}
