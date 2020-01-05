<template>
  <div class="learning-syllabus" v-if="Syllabuses != ''">
    <div class="learn-content" v-for="item in Syllabuses" :key="item.id">
      <div class="title">{{ item.title }}</div>
      <div class="info">{{ item.description }}</div>
      <div class="learn-list">
        <ul v-if="item.child !== undefined">
          <!--{item.id章id,item1.id节id,item.mooc_issue_id期id  -->
          <router-link
            v-for="item1 in item.child"
            :key="item1.id"
            :to="{
              path: `/cloudVideo/${item.id}/${item1.id}/${item.mooc_issue_id}`
            }"
          >
            <!-- 已学完 -->

            <li v-if="item1.resources_is_finish == 1">
              <div class="list">
                <i class="icon iconfont icon-yixuexi"></i>
                <div class="learn-con">{{ item1.title }}</div>
              </div>
              <div class="list-icon">
                <div class="icon-box">
                  <i class="icon iconfont icon-ziyuan1"></i>
                  <i class="icon iconfont icon-ceyan"></i>
                  <i class="icon iconfont icon-zuoyelianxi"></i>
                  <i class="icon iconfont icon-ziliao"></i>
                </div>
              </div>
            </li>
            <!-- 正在学习 -->
            <li v-else-if="item1.resources_is_finish == -1">
              <div class="list">
                <i class="icon iconfont icon-xuexizhong"></i>
                <div class="learn-con">{{ item1.title }}</div>
              </div>
              <div class="list-icon">
                <div class="icon-box">
                  <i class="icon iconfont icon-ziyuan1"></i>
                  <i class="icon iconfont icon-ceyan"></i>
                  <i class="icon iconfont icon-zuoyelianxi"></i>
                  <i class="icon iconfont icon-ziliao"></i>
                </div>
              </div>
              <div class="learning" v-if="item1.resources_is_latest == 0">
                最近学习
              </div>
            </li>
            <!-- 未学习 -->
            <li v-else>
              <div class="list">
                <i class="icon iconfont icon-weixuexi"></i>
                <div class="learn-con">{{ item1.title }}</div>
              </div>
              <div class="list-icon">
                <div class="icon-box">
                  <i class="icon iconfont icon-ziyuan1"></i>
                  <i class="icon iconfont icon-ceyan"></i>
                  <i class="icon iconfont icon-zuoyelianxi"></i>
                  <i class="icon iconfont icon-ziliao"></i>
                </div>
              </div>
            </li>
          </router-link>
        </ul>
      </div>
    </div>
  </div>
  <div class="no-data" v-else>
    暂无内容
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({})
export default class LearningSyllabus extends Vue {
  @Prop({ default: () => [] }) Syllabuses!: Array<any>
  @Prop({ default: '' }) title!: string
  @Prop({ default: '' }) description!: string
}
</script>

<style lang="scss" scoped>
.learning-syllabus {
  width: 860px;
}
.no-data {
  width: 100%;
  background: #fff;
  padding: 20px;
  color: #4c5258;
}
.learning-syllabus .learn-content {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 5px 10px 0px rgba(230, 230, 230, 1);
  border-radius: 5px;
  padding: 28px;
  margin-bottom: 10px;
}
.learn-content .title {
  font-size: 14px;
  font-weight: bold;
  color: rgba(7, 17, 27, 1);
  line-height: 30px;
}
.learn-content .info {
  font-size: 12px;
  color: rgba(138, 145, 153, 1);
  line-height: 22px;
}
.learn-content .learn-list {
  margin-top: 13px;
}
.learn-content .learn-list ul {
  padding: 0px;
  margin: 0px;
  display: flex;
  flex-direction: column;
}
.learn-content .learn-list ul li {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.learn-content .learn-list ul li .list {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 48px;
  line-height: 48px;
  padding-left: 10px;
}
.learn-content .learn-list ul li:hover {
  background: rgba(255, 252, 242, 1);
  border-radius: 3px;
}
.learn-content .learn-list ul li:hover .list-icon {
  display: block;
}
.learn-content .learn-list ul li:hover .learning {
  display: none;
}
.learn-content .learn-list ul li .learning {
  font-size: 12px;
  color: #8b9199;
}
.learn-content .learn-list ul li :hover .icon-xuexizhong {
  color: #f38622;
}
.icon-yixuexi,
.icon-xuexizhong {
  color: #40c78d;
  font-size: 18px;
}
.icon-weixuexi {
  color: #e7e7e7;
  font-size: 18px;
}
.icon-ziyuan1,
.icon-ceyan,
.icon-zuoyelianxi,
.icon-ziliao {
  color: #f38622;
  font-size: 14px;
  margin-right: 14px;
}
.learn-content .learn-list ul li .list .learn-con {
  margin-left: 10px;
  font-size: 14px;
  color: rgba(76, 82, 88, 1);
  line-height: 30px;
}
.learn-content .learn-list ul li .list-icon {
  display: none;
  margin-right: 20px;
}
</style>
