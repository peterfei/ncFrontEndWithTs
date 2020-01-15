<template>
  <div style="width:100%;background:#f7f8fa">
    <div class="banner">
      <detail-banner
        :packageTitle="packageTitle"
        :packageIntro="packageIntro"
        :packageUpdate="packageUpdate"
        :packageEducation="packageEducation"
      ></detail-banner>
    </div>

    <!-- 1200布局 -->
    <div class="layout-content">
      <!-- 购买模块 -->
      <buy-btn :id="packageId" :price="packagePrice"></buy-btn>

      <!-- 分类标签模块 -->
      <div class="nav-box types-block">
        <div class="types">
          <span
            v-for="item in navTypes"
            :key="item.index"
            class="type-item"
            @click="setNav(item.name)"
            :class="{ active: navType == item.name }"
          >
            {{ item.label }}
          </span>
        </div>
      </div>

      <div class="detail-content">
        <!-- 左侧模块 -->
        <div class="left-list-block">
          <div class="no-data" v-if="arrListShow.length == 0">暂无数据</div>
          <div
            class="detail-item"
            v-for="(item, index) in arrListShow"
            :class="{ active: index === hoverIndex }"
            :key="item.index"
            @mouseover="hoverIndex = index"
            @mouseout="hoverIndex = -1"
          >
            <router-link class="item-block-a" :to="{ path: `/resource` }">
              <div class="left">
                <i class="iconfont icon-ceyan"></i>
                <span class="name">{{ item.name }}</span>
                <span class="limited-time">{{ item.limitedTime }}</span>
                <span class="tag-type">上传</span>
              </div>
              <div class="right">
                查看
              </div>
            </router-link>
          </div>
        </div>
        <!-- 右侧模块 -->
        <div class="right-recommend-block">
          <!-- 教师的其他教学包 -->
          <div class="teacher-packages-block">
            <div class="title">该老师其他的教学包</div>
            <div class="teacher-packages-list">
              <div
                class="teacher-packages-item"
                v-for="item in tecPackageList"
                :key="item.index"
              >
                <div class="left">
                  <div class="img-block">
                    <!-- :src="cover" -->
                    <img alt="" class="seat" />
                  </div>
                </div>
                <div class="right">
                  <router-link
                    tag="div"
                    class="name"
                    :to="{ path: `/resource` }"
                    >{{ item.name }}
                  </router-link>
                  <div class="expert-num">
                    <span>
                      <i class="icon iconfont icon-guankanshu"></i>
                      <span class="people-num fs12">{{ item.excerpt }}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 相关教学包 -->
          <div class="relate-packages-block">
            <div class="title">相关教学包</div>
            <div class="relate-packages-list">
              <div
                class="relate-packages-item"
                v-for="item in relatePackageList"
                :key="item.index"
              >
                <div class="left">
                  <div class="img-block">
                    <img alt="" class="seat" />
                  </div>
                </div>
                <div class="right">
                  <router-link
                    tag="div"
                    class="name"
                    :to="{ path: `/resource` }"
                    >{{ item.name }}
                  </router-link>
                  <div class="school">
                    {{ item.school }}
                  </div>
                  <div class="author-views">
                    <span class="author">{{ item.author }}</span>
                    <span class="views">
                      <i class="icon iconfont icon-guankanshu"></i>
                      <span class="people-num fs12">{{ item.views }}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import DetailBanner from './components/DetailBanner.vue'
import BuyBtn from './components/BuyBtn.vue'
import { mockResourceDetailType } from '@/mocks/index'
import { mockResourceTeacherPackages } from '@/mocks/index' //教师其他资源包
import { mockResourcerelatePackages } from '@/mocks/index' //相关资源包
import { mockResourceTestList } from '@/mocks/index' //测验
import { mockResourceTaskList } from '@/mocks/index' //作业

import { Component, Vue, Watch } from 'vue-property-decorator'
import { PackageDetail } from '@/api/resource'

@Component({
  components: {
    DetailBanner,
    BuyBtn
  }
})
export default class ResourceDetail extends Vue {
  public packageId: any //资源包id
  public packageTitle: string = '' //资源包标题
  public packageIntro: string = '' //资源包简介
  public packageUpdate: string = '' //资源包更新时间
  public packageEducation: string = '' //资源包适用等级
  public packagePrice: string = '' //资源包价格
  public navTypes: Array<object> = mockResourceDetailType
  public navType: string = 'all' //选中的标签

  public tecPackageList: Array<object> = mockResourceTeacherPackages
  public relatePackageList: Array<object> = mockResourcerelatePackages
  public testList: Array<object> = mockResourceTestList //测验
  public taskList: Array<object> = mockResourceTaskList //作业
  public hoverIndex: string = '-1' //hover 效果
  public arrListShow: any = [] //当前展示的列表

  created() {
    this.packageId = this.$route.params.id
    this.getPackageDetail()
    this.$router.push({
      query: {
        type: this.navType
      }
    })
  }
  getPackageDetail() {
    PackageDetail.getDetail(this.packageId).then((res: any) => {
      this.packageTitle = res.name
      this.packageIntro = res.intro
      this.packageUpdate = res.updated_at
      this.packageEducation = res.education
      this.packagePrice = res.price
    })
  }
  //监听URL变化
  @Watch('$route', { immediate: true, deep: true })
  onUrlChange(to: { id: number; query: { id: number; type: string } }) {
    const url = to.query
    this.navType = url.type
    if (this.navType === 'test') {
      this.arrListShow = this.testList
    } else if (this.navType === 'task') {
      this.arrListShow = this.taskList
    }
  }
  loadurl(val: string) {
    this.$router.push({
      query: {
        type: val
      }
    })
  }

  setNav(nav: string) {
    this.navType = nav
    // this.loadurl()
    this.$router.push({
      query: {
        type: this.navType
      }
    })
  }
}
</script>

<style lang="scss" scoped>
body {
  background: #ffffff;
}
.banner {
  width: 100%;
  overflow: hidden;
  height: 220px;
  position: relative;
}

.content-block {
  position: relative;
  margin-top: -25px;
  margin-bottom: 120px;
}
// 中间布局
.layout-content {
  width: 1200px;
  margin: 0 auto;
  position: relative;
  top: -25px;
}
.types-block {
  border-bottom: 1px solid #ebeff3;
  padding-bottom: 35px;
  margin-bottom: 30px;
  .types {
    width: 610px;
    display: flex;
    justify-content: space-evenly;
    margin: 0 auto;
    .active {
      color: #0a121a;
      border-bottom: 2px solid #0a121a;
      padding-bottom: 10px;
    }
  }
  .type-item {
    font-size: 16px;
    position: relative;
    font-weight: bold;
    color: rgba(176, 180, 185, 1);
    display: inline-block;
    cursor: pointer;
    .tag {
      color: #8b9199;
      font-size: 12px;
      position: absolute;
      left: 35px;
      top: -5px;
      font-weight: 400;
    }
  }
}
.detail-content {
  display: flex;
  justify-content: space-between;
  // 左侧列表展示
  .left-list-block {
    width: 840px;
    margin-right: 40px;
    .detail-item {
      .item-block-a {
        padding: 0 11px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #ebeff3;
        font-size: 14px;
        i {
          color: #ced1d4;
          margin-right: 10px;
          font-size: 14px;
        }
        .name {
          font-weight: 400;
          color: #4c5258;
          margin-right: 8px;
        }
        .limited-time {
        }
        .tag-type {
          width: 24px;
          font-size: 12px;
          color: #8b9199;
          border: 1px solid #8b9199;
          padding: 2px 6px;
          margin-left: 10px;
        }
        // 查看按钮显示
        .right {
          width: 56px;
          height: 24px;
          background: #ffe4d8;
          border-radius: 3px;
          color: #ff783c;
          line-height: 24px;
          text-align: center;
          margin-top: 13px;
          display: none;
        }
      }
    }
    .detail-item.active {
      .detail-item {
        background: $main;
      }
      i {
        color: $main;
      }
      .name {
        color: $main;
      }
      color: $main;
      background: #fffcf2;
      .right {
        display: block;
      }
    }
  }
  // 右侧推荐展示
  .right-recommend-block {
    width: 320px;
    .title {
      font-size: 16px;
      font-weight: bold;
      color: rgba(7, 17, 27, 1);
      margin-bottom: 20px;
    }
    // 教师其他教学包
    .teacher-packages-block {
      padding-bottom: 30px;
      border-bottom: 1px solid #ebeff3;
      margin-bottom: 28px;
      .teacher-packages-item {
        display: flex;
        margin-bottom: 15px;
        .img-block {
          width: 80px;
          height: 60px;
          margin-right: 12px;
          img {
            width: 100%;
            height: 100%;
            background: #ccc;
            display: block;
            border-radius: 4px;
          }
        }
        .right {
          .name {
            font-size: 14px;
            font-weight: 400;
            color: #07111b;
            margin-bottom: 18px;
            cursor: pointer;
            overflow: hidden; //超出的文本隐藏
            text-overflow: ellipsis; //溢出用省略号显示
            white-space: nowrap; //溢出不换行
            &:hover {
              transition: 0.3s;
              color: $hover-main;
            }
          }
          .expert-num {
            i {
              color: #8a9199;
              font-size: 12px;
            }
            .people-num {
              font-size: 12px;
              color: #8a9199;
            }
          }
        }
      }
    }

    // 相关教学包
    .relate-packages-item {
      margin-bottom: 15px;
      display: flex;
      .left {
        margin-right: 20px;
        .img-block {
          width: 80px;
          height: 60px;

          img {
            background: #ccc;
            display: block;
            width: 100%;
            height: 100%;
            border-radius: 4px;
          }
        }
      }
      .right {
        position: relative;
        top: -2px;
        .name {
          font-size: 14px;
          font-weight: 400;
          color: #07111b;
          margin-bottom: 3px;
          cursor: pointer;
          overflow: hidden; //超出的文本隐藏
          text-overflow: ellipsis; //溢出用省略号显示
          white-space: nowrap; //溢出不换行
          &:hover {
            transition: 0.3s;
            color: $hover-main;
          }
        }
        .school {
          margin-bottom: 3px;
        }
        .author-views,
        .school {
          color: #8b9199;
          font-size: 14px;
        }
        .author-views {
          .author {
            margin-right: 8px;
          }
          .views {
            i {
              margin-right: 3px;
              font-size: 13px;
            }
          }
        }
      }
    }
  }
}
::v-deep .el-dialog {
  border-radius: 15px;
}
::v-deep .el-dialog__title {
  font-weight: bold;
  font-size: 14px;
  color: #4c5258;
}
::v-deep .el-dialog__body {
  .head-info {
    border-bottom: 1px solid #e7e7e7;
    padding-bottom: 22px;
    .title {
      font-size: 16px;
      font-weight: bold;
      color: rgba(76, 82, 88, 1);
      text-align: center;
      margin-bottom: 15px;
    }
    .author-date {
      text-align: center;
      .item:last-of-type {
        border-right: none;
      }
      .item {
        color: #8b9199;
        font-size: 12px;
        margin-right: 14px;
        padding-right: 14px;
        border-right: 1px solid #e7e7e7;
      }
    }
  }
  .content-body {
    font-size: 14px;
    color: #4c5258;
    padding-top: 20px;
    label {
      width: 64px;
      margin-right: 16px;
    }
  }
  .task-head {
    .title {
      margin-bottom: 12px;
    }
  }
  .task-body {
    .el-row {
      margin-bottom: 12px;
    }
    .label-title {
      width: 70px;
      margin-right: 8px;
    }
    .task-content {
      line-height: 22px;
    }
  }
  .test-body {
    max-height: 490px;
    overflow-y: auto;
    padding-top: 26px;
    .item-box {
      border-bottom: 1px solid #e7e7e7;
      margin-bottom: 12px;
      .score {
        margin-bottom: 10px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(139, 145, 153, 1);
      }
      .title {
        font-size: 16px;
        color: #4c5258;
        margin-bottom: 22px;
        padding-left: 12px;
        line-height: 24px;
      }
      .options {
        padding-left: 12px;
        p {
          margin-top: 0;
          margin-bottom: 12px;
          color: #4c5258;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
