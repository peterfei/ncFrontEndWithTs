<template>
  <div>
    <div
      class="lecturer-info"
      v-for="item in dataList"
      :key="item.id"
    >
      <div class="lecturer-info-img">
        <img
          :src="item.cover?item.cover:'http://placehold.it/80x60'"
          alt=""
        >
      </div>
      <div>
        <router-link
          tag="a"
          class="lecturer-info-text word-spot-2"
          :to="{path:`/course/courseDetail/${item.id}`}"
        >
          {{item.name}}
        </router-link>
        <div class="lecturer-info-detail">
          <span><i class="icon iconfont icon-guankanshu"></i>{{item.learners_count}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CourseRightItem',
  props: {
    dataList: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped>
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
    &:hover {
      color: #f5c032;
    }
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
</style>
