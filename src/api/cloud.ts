import Request from '@/utils/request'
const moocModuleBasedUrl = '/api/mooc'
const moocSurveyBaseUrl = '/api'
const moocModuleBasedUrlUser = '/api/user_homework'

const moocPackageUrl = `${moocModuleBasedUrl}/packages` // 课程包列表
const moocPopularity = `${moocModuleBasedUrl}/popularity` // 课程包列表【人气爆棚】
const moocMogulUrl = `${moocModuleBasedUrl}/mogul` // 课程包列表【大咖推荐】
const moocIssues = `${moocModuleBasedUrl}/issues` // 期刊
const moocSupport = `${moocModuleBasedUrl}/comments/support` // 点赞
const moocRelated = `${moocModuleBasedUrl}/related` // 相关课程
const moocChapter = `${moocModuleBasedUrl}/syllabuse` // 章节
const moocSurveys = `${moocModuleBasedUrl}/surveys` // 测验答题
const moocModuleCountDown = `${moocSurveyBaseUrl}/user_survey` // 测验开始时间
const MoocHomework = `${moocModuleBasedUrlUser}/answer_submit` // 作业提交
const moocDownLoadUrl = `${moocModuleBasedUrl}/material` //下载资料

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
    const url = `${moocIssues}/${id}`
    return Request.get(url)
  },
  //期刊列表 api/mooc/packages/{id}/all_issues
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
  },
  // 点赞
  getSupport(sObj: any) {
    return Request.post(moocSupport, sObj)
  },
  // 相关课程
  getRelatedcourse(id: number) {
    const url = `${moocRelated}/${id}`
    return Request.get(url)
  },
  // 章节下面小节内容
  getChapter(params: any) {
    const url = `${moocChapter}/${params.syllabuseId}/chapter_content`
    return Request.get(url, params)
  },
  // 测验答题
  getQuestion(id: any) {
    console.log('cloud', id)
    const url = `${moocSurveys}/${id}`
    return Request.get(url)
  },
  // 测验倒计时开始时间
  getCountDown(id: number) {
    const url = `${moocModuleCountDown}/${id}/start_time`
    return Request.get(url)
  },
  // 提交测验
  getAnswerSubmit(postObj: any) {
    const url = `${moocModuleCountDown}/answer_submit`
    return Request.post(url, postObj)
  },
  // 提交测验详情{{host}}/api/user_survey/{id}/info
  getTestDetail(id: number) {
    const url = `${moocModuleCountDown}/${id}/info`
    return Request.get(url)
  },

  // 评论区-发布帖子
  getDiscussion(postObj: any) {
    const url = `${moocModuleBasedUrl}/discussions`
    return Request.post(url, postObj)
  },
  // 评论区-帖子列表
  getListDisscussion(issueId: number, obj: any) {
    // {{host}}/api/mooc/discussions?mooc_issue_id=1
    console.log('sss=========', obj)
    const url = `${moocModuleBasedUrl}/discussions?mooc_issue_id=${issueId}`
    return Request.get(url, obj)
  },
  // 评论区-回复帖{{host}}/api/mooc/replies
  getReplies(obj: any) {
    const url = `${moocModuleBasedUrl}/replies`
    return Request.post(url, obj)
  },
  // 评论区-回帖列表{{host}}/api/mooc/replies?mooc_discussion_id=1
  getListReplies(discussionId: any, page: any) {
    const url = `${moocModuleBasedUrl}/replies`
    return Request.get(url, {
      mooc_discussion_id: discussionId,
      page
    })
  },
  // 评论区-点赞
  getSupportDis(supportObj: any) {
    const url = `${moocModuleBasedUrl}/discussions/support`
    return Request.post(url, supportObj)
  },
  // 提交作业
  getHomeworkSubmit(postObj: any) {
    return Request.post(MoocHomework, postObj)
  },
  //下载资料http://dev.nc.com/api/mooc/material/8/download
  getDownLoad(resource_id: number) {
    const url = `${moocDownLoadUrl}/${resource_id}/download`
    return Request.get(url)
  }
}
