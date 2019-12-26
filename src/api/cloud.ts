import Request from '@/utils/request'

const moocModuleBasedUrl = '/api/mooc'

const moocPackageUrl = `${moocModuleBasedUrl}/packages` // 课程包列表
const moocPopularity = `${moocModuleBasedUrl}/popularity` // 课程包列表【人气爆棚】
const moocMogulUrl = `${moocModuleBasedUrl}/mogul` // 课程包列表【大咖推荐】
const moocIssues = `${moocModuleBasedUrl}/issues` // 期刊
// export const Cloud = {
//   getList(params:any) {
//     return Request.xget(
//       '/api/mooc/packages',
//       params
//     )
//   }
// }
export const MoocList = {
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
  // 学习大纲
  getSyllabuses(id: number) {
    const url = `${moocIssues}/${id}/syllabuses`
    return Request.get(url)
  }
}

export default {
  MoocList
}
