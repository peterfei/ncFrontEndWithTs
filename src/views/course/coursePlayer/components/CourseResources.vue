<template>
  <div class="course-resources" data-show="showBarBox">
    <div class="resources-box" data-show="showBarBox">
      <h5>配套资源</h5>
      <div data-show="showBarBox" v-for="item in resourcesList" :key="item.id">
        <span v-if="item.ext === 'ppt'">
          <i class="icon iconfont icon-gongju"></i
          >{{ item.attachment ? item.attachment.title : '无名' }}
        </span>
        <span v-else-if="item.ext === 'doc'">
          <i class="icon iconfont icon-gongju"></i
          >{{ item.attachment ? item.attachment.title : '无名' }}
        </span>
        <span v-else-if="item.ext === 'arr'">
          <i class="icon iconfont icon-gongju"></i
          >{{ item.attachment ? item.attachment.title : '无名' }}
        </span>
        <el-button
          type="primary"
          round
          size="mini"
          data-show="showBarBox"
          @click="downloadResource(item)"
          >下载</el-button
        >
      </div>
      <h6 v-if="resourcesList.length === 0">暂无资源</h6>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CourseResources',
  props: {
    resourcesList: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  methods: {
    async downloadResource(item) {
      // 获取下载地址
      const postObj = {
        packageId: 1,
        id: item.attachment.id
      }
      this.$emit('downloadResource', postObj)
    }
  }
}
</script>
<style lang="scss" scoped>
.course-resources {
  width: 404px;
  height: 100%;
  overflow: hidden;
  padding: 20px 30px;
  .resources-box {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    h5 {
      font-size: 14px;
      font-weight: bold;
      color: #ffffff;
    }
    div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 20px 0;
      span {
        font-size: 12px;
        font-weight: 400;
        color: #999999;
        i {
          margin-right: 10px;
        }
      }
    }
    h6 {
      width: 100%;
      text-align: center;
      color: #ffffff;
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
  background-color: $primary; // $gray-light;
}

*::-webkit-scrollbar-track {
  border-radius: 3px; // background-color: $primary;
}
</style>
