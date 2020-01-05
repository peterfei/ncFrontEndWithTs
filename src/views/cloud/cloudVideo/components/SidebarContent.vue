<template>
  <div class="sidebarContent" v-if="Syllabuses">
    <div v-for="item in Syllabuses" :key="item.index">
      <div class="title">{{ item.title }}</div>
      <ul>
        <li
          v-for="(sidelist, index) in item.child"
          :key="sidelist.id"
          @click="chapterClick(item, sidelist, index)"
        >
          <!-- {{ sidelist }} -->
          <div class="list">
            <i class="icon iconfont icon-yixuexi"></i>
            <div class="learnCon">
              {{ sidelist.title }}
            </div>
          </div>
          <div class="listIcon">
            <div class="iconBox">
              <i class="icon iconfont icon-ziyuan1"></i>
              <i class="icon iconfont icon-ceyan"></i>
              <i class="icon iconfont icon-zuoyelianxi"></i>
              <i class="icon iconfont icon-ziliao"></i>
            </div>
          </div>
        </li>
        <!-- <li>
          <div class="list">
            <i class="icon iconfont icon-xuexizhong"></i>
            <div class="learnCon">{{sidelist.info}}</div>
          </div>
          <div class="listIcon">
            <div class="iconBox">
              <i class="icon iconfont icon-ziyuan1"></i>
              <i class="icon iconfont icon-ceyan"></i>
              <i class="icon iconfont icon-zuoyelianxi"></i>
              <i class="icon iconfont icon-ziliao"></i>
            </div>
          </div>
        </li> -->
        <!-- 正在学习 -->
        <!-- <li>
            <div class="list">
              <i class="icon iconfont icon-weixuexi"></i>
              <div class="learnCon">1-4 百度站长平台-网站与搜索引擎的</div>
            </div>
            <div class="listIcon">
              <div class="iconBox">
                <span class="lean">正在学习</span>
              </div>
            </div>
        </li> -->
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component
export default class SidebarContent extends Vue {
  @Prop({ default: () => [], type: Array }) Syllabuses: Array<any>
  isActive: boolean = false
  // 点章节
  chapterClick(aa: any, bb: any) {
    const obj = {
      zId: aa.id,
      jId: bb.id
    }
    this.$emit('chapterClick', obj)
  }
}
// export default {
//   name: 'SidebarContent',
//   props: {
//     syllabuses: []
//   },
//   data() {
//     return {
//       courseList: [
//         {
//           title: '第一章 课程简介',
//           lists: [
//             {
//               info: '1-4 百度站长平台-网站与搜索引擎的'
//             },
//             {
//               info: '1-4 百度站长平台-网站与搜索引擎的'
//             },
//             {
//               info: '1-4 百度站长平台-网站与搜索引擎的'
//             }
//           ]
//         },
//         {
//           title: '第二章 课程简介',
//           lists: [
//             {
//               info: '2-4 百度站长平台-网站与搜索引擎的'
//             },
//             {
//               info: '2-4 百度站长平台-网站与搜索引擎的'
//             },
//             {
//               info: '2-4 百度站长平台-网站与搜索引擎的'
//             }
//           ]
//         }
//       ]
//     }
//   },
//   methods: {
//     // 点章节
//     chapterClick(aa, bb) {
//       const obj = {
//         zId: aa.id,
//         jId: bb.id
//       }
//       this.$emit('chapterClick', obj)
//     }
//   }
// }
</script>

<style lang="scss" scoped>
.sidebarContent .title {
  font-size: 15px;
  font-weight: bold;
  color: rgba(8, 17, 26, 1);
  margin-top: 30px;
  margin-left: 16px;
  margin-bottom: 4px;
}
.active {
  color: #ed8322 !important;
}
.sidebarContent ul {
  padding: 0px;
  margin: 0px;
}
.sidebarContent ul li {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.sidebarContent ul li .list {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 48px;
  line-height: 48px;
  padding-left: 20px;
}
.sidebarContent ul li:hover .listIcon {
  display: block;
}
.sidebarContent ul li :hover .icon-xuexizhong {
  color: #f38622;
}
.sidebarContent ul li .lean {
  font-size: 13px;
  color: rgba(243, 134, 34, 1);
  // display: none;
}
.icon-yixuexi,
.icon-xuexizhong {
  color: #40c78d;
  font-size: 20px;
}
.icon-weixuexi {
  color: #e7e7e7;
  font-size: 20px;
}
.iconBox i:last-child {
  margin-right: 0px;
}
.icon-ziyuan1,
.icon-ceyan,
.icon-zuoyelianxi,
.icon-ziliao {
  color: #f38622;
  font-size: 14px;
  margin-right: 14px;
}
.sidebarContent ul li .list .learnCon {
  margin-left: 3px;
  font-size: 14px;
  color: rgba(76, 82, 88, 1);
  line-height: 30px;
}
.sidebarContent ul li .listIcon {
  display: none;
  margin-right: 20px;
}
</style>
