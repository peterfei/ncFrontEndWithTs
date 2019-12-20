<template>
  <div class="course-head">
    <div class="bg-grandient"></div>
    <div class="bg_filter">
      <img src="./../../../../assets/image/bg/b.jpg" alt="" />
    </div>
    <div class="course-head-content content">
      <div class="up">
        <!-- 面包屑 -->
        <div class="crumbs">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/' }"
              >职场工具</el-breadcrumb-item
            >
            <el-breadcrumb-item :to="{ path: '/' }"
              >PowerPoint</el-breadcrumb-item
            >
            <el-breadcrumb-item>
              {{ couseTitle }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <!-- 社交分享 -->
        <div class="social-share">
          <a href=""><i class="iconfont icon icon-xingxing"></i></a>
          <a href=""><i class="iconfont icon icon-web_weixin"></i></a>
          <a href=""><i class="iconfont icon icon-qq1"></i></a>
          <a href=""><i class="iconfont icon icon-weibo"></i></a>
        </div>
      </div>
      <div class="down">
        <div class="course-name word-spot">
          {{ courseName }}
        </div>
        <div class="course-introduce word-spot-2">
          {{ introduce }}
        </div>
        <div class="date-detail">
          <ul>
            <li class="first-item">
              <div class="data">{{ chapterNum }}节</div>
              <div class="name">
                课程章节
              </div>
            </li>
            <li>
              <div class="data">
                {{ courseTime | getTimer('characters') }}
              </div>
              <div class="name">总时长</div>
            </li>
            <li>
              <div class="data">
                {{ studyStuNum }}
              </div>
              <div class="name">学习人数</div>
            </li>
            <li>
              <div class="data">
                <ele-rate :value="start" disabled text-color="#ff9900">
                </ele-rate>
              </div>
              <div class="name">综合评分</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EleRate from '@/components/element/EleRate.vue'

export default {
  name: 'courseHead',
  components: {
    EleRate
  },
  props: {
    courseName: {},
    courseTime: {},
    start: {},
    introduce: {},
    studyStuNum: {},
    chapterNum: {},
    couseTitle: {}
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.course-head {
  // width: 100%;
  height: 238px;
  position: relative;
  overflow: hidden;
  .bg_filter {
    // background-image: url("./../../../../assets/image/bg/b.jpg");
    height: 238px;
    width: 100%;
    position: absolute;
    // z-index: 11;
    filter: blur(20px);
  }
  .bg-grandient {
    background: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.1)
    );
    height: 238px;
    width: 100%;
    position: absolute;
    z-index: 1;
  }
  .course-head-content {
    position: relative;
    z-index: 100;
    .up {
      padding-top: 18px;
      .crumbs ::v-deep span.el-breadcrumb__inner {
        color: #999999ff;
        &:hover {
          color: #f5f3f3;
        }
      }

      .social-share {
        text-align: right;
        position: relative;
        top: -3px;
        a {
          display: inline-block;
          margin-right: 24px;
        }
        a:last-child {
          margin-right: 0;
        }
        i:hover {
          color: #ffffff;
        }
        i {
          font-size: 20px;
          color: #abb0b3;
          transition: 0.6s;
        }
      }
    }
    .down {
      .course-name {
        color: #ffffff;
        font-size: 32px;
        font-weight: bold;
        margin-top: 6px;
        margin-bottom: 15px;
      }
      .course-introduce {
        font-size: 12px;
        color: #ffffffcf;
        line-height: 21px;
        width: 740px;
      }
      .date-detail {
        ul {
          display: flex;
          // margin-top: 30px;
          position: absolute;
          top: 170px;
          .first-item {
            width: 92px;
            text-align: left;
          }
          li {
            text-align: center;
            width: 140px;
            color: #ffffff;
            border-right: 1px solid #ffffff;
            .data {
              font-size: 18px;
              margin-bottom: 8px;
              height: 24px;
            }
            .name {
              font-size: 12px;
            }
          }
          li:last-child {
            border-right: none;
          }
        }
      }
    }
  }
}
</style>
