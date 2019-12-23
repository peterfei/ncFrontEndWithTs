<template>
  <div class="course-lecturer">
    <div class="course-lecturer-scroll">
      <div class="lecturer-info">
        <div class="lecturer-info-img">
          <img
            :src="courseInfoDetail.cover?courseInfoDetail.cover:'http://placehold.it/80x60'"
            alt=""
          >
        </div>
        <div>
          <a class="lecturer-info-text word-spot-2">
            {{courseInfoDetail.name?courseInfoDetail.name:''}}
          </a>
          <div class="lecturer-info-detail">
            <span><i class="icon iconfont icon-guankanshu"></i>
              {{courseInfoDetail.comments_count?courseInfoDetail.comments_count:''}}
            </span>
            <span>
              <ele-rate :starts='courseInfoDetail.stars'></ele-rate>
            </span>
          </div>
        </div>
      </div>
      <div class="lecturer-title"><span>|</span>讲师介绍</div>
      <div class="lecturer-teacher">
        <img
          :src="courseInfoDetail.author?courseInfoDetail.author.avatar:''"
          alt=""
        >
        <div>
          <div class="lecturer-teacher-name">
            {{courseInfoDetail.author?courseInfoDetail.author.name:''}}
          </div>
          <div class="lecturer-teacher-info">
            {{courseInfoDetail.author?courseInfoDetail.author.intro:'暂无信息'}}
          </div>
        </div>
      </div>
      <div class="lecturer-title">讲师课程</div>
      <div>
        <course-right-item :dataList='lectureCourseList'></course-right-item>
      </div>
      <div class="lecturer-title">相关课程</div>
      <div>
        <course-right-item :dataList='courseRecommedList'></course-right-item>
      </div>
    </div>
  </div>
</template>

<script>
import EleRate from '../../../../components/element/EleRate.vue';
import CourseRightItem from './CourseRightItem.vue';

export default {
  name: 'CourseLecturer',
  props: {
    courseInfoDetail: {
      type: Object,
      default: () => {},
    },
    lectureCourseList: {
      type: Array,
      default: () => [],
    },
    courseRecommedList: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    EleRate,
    CourseRightItem,
  },
  data() {
    return {
      starts: 4,
    };
  },
};
</script>

<style lang="scss" scoped>
.course-lecturer {
  width: 424px;
  height: 100%;
  padding: 20px;
  background-color: #1c1f21;
  .course-lecturer-scroll {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;

    .lecturer-title {
      color: #ffffff;
      margin: 20px 0;
      span {
        color: #ff9900;
        font-weight: bold;
        margin-right: 10px;
      }
    }
    .lecturer-teacher {
      width: 364px;
      padding: 20px;
      background: #25282b;
      border-radius: 10px;
      min-height: 100px;
      display: flex;
      & > img {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        margin-right: 18px;
      }
      .lecturer-teacher-name {
        color: #ffffff;
        margin-bottom: 10px;
      }
      .lecturer-teacher-info {
        color: #999999;
        font-size: 12px;
      }
    }
  }
}

.lecturer-info {
  display: flex;
  margin-bottom: 20px;
  .lecturer-info-img {
    width: 80px;
    height: 60px;
    margin-right: 20px;
    border-radius: 4px;
    & > img {
      width: 80px;
      height: 60px;
      margin-right: 20px;
      border-radius: 4px;
    }
  }
  .lecturer-info-text {
    max-width: 230px;
    font-size: 14px;
    font-weight: 400;
    color: #999999;
    margin-bottom: 6px;
  }
  .lecturer-info-detail {
    display: flex;
    justify-content: space-between;
    color: #8a9199;
    span {
      font-size: 12px;
      color: #8a9199;
    }
    .icon-guankanshu {
      font-size: 12px;
      margin-right: 6px;
    }
  }
}
//修改滚动条样式
*::-webkit-scrollbar {
  width: 6px;
  height: 16px; // background-color: $primary;
}

*::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background-color: rgba(87,93,102,1);; // $gray-light;
}

*::-webkit-scrollbar-track {
  border-radius: 3px; // background-color: $primary;
}
</style>
