<template>
  <router-link
    :class="['couseitem', item.is_active ? 'couseitem-active' : '']"
    tag="div"
    :to="{
      path: `/video/${item.course_package_id}/${item.course_resources_id}`
    }"
  >
    <div>
      <!-- 播放图标  视频-->
      <i
        v-if="item.type === 1"
        class="icon iconfont icon-shipin course-type"
      ></i>
      <!-- 播放图标  文档-->
      <i
        v-else-if="item.type === 2"
        class="icon iconfont icon-erji course-type"
      ></i>
      <!-- 播放图标  文档-->
      <i
        v-else-if="item.type === 3"
        class="icon iconfont icon-dazuoye course-type"
      ></i>
      <span class="index-span">{{ listindex + 1 }}-{{ keyindex + 1 }}</span>
      <span>{{ title }}（{{ courseTime | getTimer('xx:xx') }}）</span>
    </div>

    <div class="studystatus">
      <span>
        <span class="status_text">
          {{ item.statusText }}
        </span>
        <span v-if="item.is_active">最近学习</span>
      </span>
      <!-- 已学习 -->
      <!-- // 1 > 没看   2 > 看了，但没看完，   3> 看完了， -->
      <i
        v-if="item.study_state === 2"
        class="status_icon icon iconfont icon-xuexizhong"
      ></i>
      <i
        v-if="item.study_state === 1"
        class="status_icon icon iconfont icon-weixuexi"
      ></i>
      <i
        v-if="item.study_state === 3"
        class="status_icon icon iconfont icon-yixuexi"
      ></i>
    </div>
  </router-link>
</template>
<script>
export default {
  name: 'CourseItem',
  props: {
    packageId: {
      type: Number,
      required: true,
      default: () => 0
    },
    item: {
      type: Object,
      default: () => {}
    },
    title: {},
    courseTime: {},
    courseType: {},
    keyindex: {},
    listindex: {}
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
.couseitem {
  justify-content: space-between;
  display: flex;
  width: 780px;
  height: 48px;
  font-size: 14px;
  padding: 0 11px;
  line-height: 48px;
  transition: all 0.3s;
  .index-span {
    margin-right: 5px;
  }
  .course-type {
    margin-right: 10px;
    color: $dusky-black;
    font-size: 20px;
    vertical-align: middle;
  }
  .studystatus {
    // color: #451544;
    text-align: right;
    i {
      color: $light-green;
      font-size: 21px;
      margin-left: 10px;
      vertical-align: middle;
    }
    .icon-weixuexi {
      color: #e7e7e7;
    }

    .status_text {
      margin-right: 13px;
    }
  }
}

.couseitem:hover {
  background: #fdf7e1;
  cursor: pointer;
  color: #ff783c;
  // position: relative;
  i {
    color: #ff783c;
  }
}
.couseitem-active {
  background: #fdf7e1;
  cursor: pointer;
  color: #ff783c;
}
</style>
