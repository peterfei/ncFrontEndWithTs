<template>
  <div class="recomment-course-box">
    <div
      class="recomment-course-item"
      v-for="item in categoryCourses"
      :key="item.id"
    >
      <div class="recomment-course-item-img">
        <img :src="item.cover" alt="" />
      </div>
      <div class="recomment-course-item-text">
        <div class=" course-title word-spot">{{ item.name }}</div>
        <div>
          <span class="recomment-course-item-text-title">
            <i class="icon iconfont icon-BAI-qian"></i
            >{{ item.is_free ? '免费' : item.base_price }}
          </span>
          <span class="recomment-course-item-text-people">
            <i class="icon iconfont icon-touxiang"></i>{{ item.learners_count }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component
export default class RecommentCourse extends Vue {
  @Prop({ default: () => [] }) categoryCourses!: Array<object>
}
</script>
<style lang="scss" scoped>
.recomment-course-box {
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 40px;
  flex-wrap: wrap;
}
.recomment-course-item {
  width: 284px;
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  .recomment-course-item-img > img {
    width: 55px;
    height: 40px;
    margin-right: 16px;
  }
  .recomment-course-item-text {
    .recomment-course-item-text-title {
      display: inline-block;
      vertical-align: baseline;
      font-size: 12px;
      font-weight: 400;
      color: #4c5359;
      margin-right: 20px;
    }
    .recomment-course-item-text-people {
      display: inline-block;
      vertical-align: baseline;
      font-size: 12px;
      font-weight: 400;
      color: #8a9199;
    }
    i {
      margin-right: 6px;
    }
  }
}
.course-title {
  font-size: 12px;
  font-weight: 400;
  color: #08111a;
  line-height: 22px;
  max-width: 207px;
  color: rgba(8, 17, 26, 1);
}
.course-title:hover {
  cursor: pointer;
  color: #ff783c !important;
}
</style>
