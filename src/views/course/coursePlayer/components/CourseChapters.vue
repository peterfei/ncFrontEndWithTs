<template>
  <div class="course-chapters">
    <div class="scroll-box">
      <div
        class="course-chapters-item"
        v-for="item in chaptersLists"
        :key="item.id"
      >
        <h5>{{ item.title }}</h5>
        <router-link
          tag="div"
          class="chapters-item"
          v-for="itemCh in item.children"
          :key="itemCh.id"
          @click="chaptersItem(itemCh.id)"
          :style="{
            color:
              itemCh.id === parseInt(resourceId, 10) ? '#F5C032' : '#999999'
          }"
          :to="{ path: `/video/${packageId}/${itemCh.id}` }"
        >
          <div class="chapters-item-flag">
            <!-- 播放图标  视频-->
            <span v-if="itemCh.type === 1">
              <i class="icon iconfont icon-shipin"></i>
            </span>
            <!-- 播放图标  文档-->
            <span v-else-if="itemCh.type === 2">
              <i class="icon iconfont icon-erji"></i>
            </span>
            <!-- 播放图标  文档-->
            <span v-else-if="item.type === 3">
              <i class="icon iconfont icon-bofang"></i>
            </span>
          </div>
          <div class="chapters-item-conent">
            <span class="chapters-item-conent-span word-spot ">{{
              itemCh.title
            }}</span>
            <span>({{ itemCh.length_of_time | getTimer('xx:xx') }})</span>
          </div>
          <div class="chapters-flag-active">
            <span v-if="itemCh.id === parseInt(resourceId, 10)">学习中</span>
            <i
              v-if="itemCh.study_state === 3"
              class="icon iconfont icon-yixuexi"
            >
            </i>
            <i
              v-else-if="itemCh.study_state === 2"
              class="icon iconfont icon-xuexizhong"
            ></i>
            <i
              v-else-if="itemCh.study_state === 1"
              class="icon iconfont icon-weixuexi"
            ></i>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CourseChapters',
  props: {
    chaptersLists: {
      type: Array,
      required: false,
      default: () => []
    },
    resourceId: {
      type: String,
      required: false
    },
    packageId: {
      type: String,
      required: false
    }
  },
  mounted() {},
  methods: {
    chaptersItem(itemId) {
      this.$emit('chaptersItem', itemId)
    }
  }
}
</script>

<style lang="scss" scoped>
//修改滚动条样式
*::-webkit-scrollbar {
  width: 6px;
  height: 16px; // background-color: $primary;
}

*::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background-color: $primary; // $gray-light;
}

*::-webkit-scrollbar-track {
  border-radius: 3px; // background-color: $primary;
}
.course-chapters {
  width: 404px;
  height: 100%;
  overflow: hidden;
  padding: 10px 0;
  .scroll-box {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    padding: 10px 10px 0 30px;
  }
}
.course-chapters-item {
  h5 {
    color: #ffffff;
    padding: 10px 0 20px;
  }
  .chapters-item {
    position: relative;
    cursor: pointer;
    color: #999999;
    display: flex;
    align-items: center;
    width: 100%;
    height: auto;
    margin-bottom: 16px;
    font-size: 12px;

    .chapters-item-flag {
      margin: 0 6px;
    }
    .chapters-item-conent {
      display: flex;
      align-items: center;
      .chapters-item-conent-span {
        display: inline-block;
        max-width: 220px;
        margin-top: -2px;
      }
    }
    & > .chapters-flag-active {
      position: absolute;
      right: 0;
      float: right;
      span {
        margin-top: -2px;
      }
      & > i {
        margin-left: 6px;
        position: relative;
        top: 1px;
      }
    }
    &:hover {
      color: #f5c032 !important;
    }
  }
}

.active-link {
  border-bottom: 0px solid transparent !important;
}
</style>
