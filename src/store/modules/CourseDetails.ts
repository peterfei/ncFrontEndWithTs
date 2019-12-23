import { Commit, Action, ActionTree } from 'vuex'
import { ICourseDetailsState, IRecommendCourse, ICoursePostURL } from '../types'
import { Course } from '@/api/course'
import Request from '@/utils/request'
import axios from 'axios'
const moduleName = '/excellent_courses' // 模块名

const getters = {}
export interface State {
  expireTime: any
  recommendCourseList: any[]
  chapterList: any[]
  chapterProgress: {}
  chapterProgressList: any[]
  courseDetail: {}
  lectureCourseList: any[]
  coursesRecommendList: any[]
  courseCommentsList: any[]
}

const state: State = {
  recommendCourseList: [], // 好课推荐
  chapterList: [], // 章节列表
  chapterProgress: {}, // 课程包学习进度 总进度
  chapterProgressList: [], // 单个课程下用户的观看记录接口 列表记录
  courseDetail: {}, // 课程详情接口
  lectureCourseList: [], // 获取该讲师的其他推荐课程
  coursesRecommendList: [], // 获取右侧推荐课程列表
  courseCommentsList: [], // 获取评论列表
  expireTime: 0
}
const actions: ActionTree<ICourseDetailsState, any> = {
  // 推荐课程  --o
  async getRecommendCourseList({ commit }) {
    const now = new Date().valueOf()
    if (now > state.expireTime) {
      const ret = await Course.getGoodCourse()

      commit('setRecommendCourseList', ret.data)
    }
  },

  async getCourseDetail({ commit }, packageId) {
    const postUrl: Array<ICoursePostURL> = []
    const data = await Course.getDetail(
      `http://dev.nc.com/api${moduleName}/courses/${packageId}/chapters`
    )
    //const postUrl: Array<{ url: string; mutations: string }> = [
    //  {
    //    url: `/api${moduleName}/courses/${packageId}/chapters`,
    //    mutations: 'setChapters'
    //  }, // 章节列表
    //  {
    //    url: `/api${moduleName}/courses/${packageId}/course_study_progress`,
    //    mutations: 'setUserWatch'
    //  }, // 课程包学习进度 总进度
    //  {
    //    url: `/api${moduleName}/courses/${packageId}/watching_records`,
    //    mutations: 'setWatchingRecords'
    //  }, // 单个课程下用户的观看记录接口 列表记录
    //  {
    //    url: `/api${moduleName}/courses/${packageId}`,
    //    mutations: 'setchaptersDetail'
    //  } // 课程详情接口
    //]
    //const AllData = await Course.getDetail(postUrl.map(rec => rec.url))
    //postUrl.forEach(rec => {
    //  if (AllData[rec.url] && AllData[rec.url].status_code === 200) {
    //    commit(rec.mutations, AllData[rec.url].content)
    //  }
    //})
  },
  // 获取该讲师的其他推荐课程 --o
  async getLectureCourse({ commit }, postObj) {
    const LectureCourseList = await Course.getLecture(postObj)
    commit('setLectureCourseList', LectureCourseList)
  },
  // 获取右侧推荐课程列表--o
  async getCoursesRecommend(store, postObj) {
    const coursesRecommendList = await Course.getRecommend(postObj)
    store.commit('setCourseRecommendList', coursesRecommendList)
  }
  //// 获取评论列表--o
  //async getCommentsList(store, obj) {
  //  const coursesCommentsList = await CourseComment.getList(obj.id, obj.type)
  //  store.commit('setCommentslist', coursesCommentsList)
  //},
  //// 点赞--o
  //async userThumbsUp(store, obj) {
  //  const data = await CourseComment.userThumbsUp(obj)
  //  const postObj = {
  //    id: obj.packageId,
  //    type: obj.type
  //  }
  //  if (data.message) {
  //    await this.dispatch('CoursesDetail/getCommentsList', postObj)
  //  }
  //},
  //// 提交新的评论--o
  //async postCourseComment(store, obj) {
  //  const commentsData = await CourseComment.postComment(obj)
  //  const postObj = {
  //    id: obj.packageId,
  //    type: obj.type
  //  }
  //  if (commentsData.id !== '') {
  //    await this.dispatch('CoursesDetail/getCommentsList', postObj)
  //  }
  //},
  //// 评论回复
  //async userReplyTo(store, obj) {
  //  const data = await CourseComment.ReplyTo(obj.postObj)
  //  const postObj = {
  //    id: obj.packageId,
  //    type: obj.type
  //  }
  //  if (data.id) {
  //    await this.dispatch('CoursesDetail/getCommentsList', postObj)
  //  }
  //}
}

const mutations = {
  // 推荐课程
  setRecommendCourseList(
    state: ICourseDetailsState,
    ret: IRecommendCourse | any
  ) {
    state.recommendCourseList = ret
    state.expireTime = new Date().valueOf() + 3000
  },
  // 章节列表
  setChapters(store: any, data: any) {
    state.chapterList = data
  },
  // 课程包学习进度 总进度
  setUserWatch(store: any, data: any) {
    state.chapterProgress = data
  },
  // 单个课程下用户的观看记录接口 列表记录
  setWatchingRecords(store: any, data: any) {
    state.chapterProgressList = data
  },
  // 课程详情接口
  setchaptersDetail(store: any, data: any) {
    state.courseDetail = data
  },
  // 该讲师其他课程包
  setLectureCourseList(store: any, data: any) {
    state.lectureCourseList = data
  },
  // 获取右侧推荐课程列表
  setCourseRecommendList(store: any, data: any) {
    state.coursesRecommendList = data
  }
  //// 获取评论列表
  //setCommentslist(store, data) {
  //  state.courseCommentsList = data
  //}
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
