import { Commit, Action, ActionTree } from "vuex";
import { ICourseDetailsState, IRecommendCourse } from "../types";
import { Course } from "@/api/course";
import Request from "@/utils/request";
import axios from "axios";
const state = {
  recommendCourseList: [], // 好课推荐
  chapterList: [], // 章节列表
  expireTime: 0
};
const getters = {};

const actions: ActionTree<ICourseDetailsState, any> = {
  // 推荐课程  --o
  async getRecommendCourseList({ commit }) {
    const now = new Date().valueOf();
    if (now > state.expireTime) {
      const ret = await Course.getGoodCourse();

      commit("setRecommendCourseList", ret.data);
    }
  }
};

const mutations = {
  // 推荐课程
  setRecommendCourseList(
    state: ICourseDetailsState,
    ret: IRecommendCourse | any
  ) {
    state.recommendCourseList = ret;
    state.expireTime = new Date().valueOf() + 3000;
  }
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
