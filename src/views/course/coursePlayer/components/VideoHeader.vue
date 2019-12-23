<template>
  <div class="video-header">
    <div>
      <router-link
        class="video-back"
        tag="span"
        :to="{ path: `/course/courseDetail/${videoId}` }"
        ><i class="icon iconfont icon-zuojiantouD"></i
      ></router-link>
      <span class="video-name">第1讲 hello，色彩</span>
      <span class="video-link">
        <i class="icon iconfont icon-weixin1"></i>
        <i class="icon iconfont icon-qq"></i>
        <i class="icon iconfont icon-weibo1"></i>
      </span>
    </div>
    <div></div>
  </div>
</template>

<script>
export default {
  name: 'VideoHeader',
  props: ['videoId', 'videoName']
}
</script>

<style lang="scss" scoped>
.video-header {
  height: 70px;
  width: 100%;
  min-width: 1200px;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  position: relative;
  z-index: 98;
  box-shadow: 0px 0px 8px 0px rgba(230, 230, 230, 1);
  .video-back {
    font-size: 20px !important;
    color: #0a121a;
    cursor: pointer;
    font-weight: bold;
    &:hover {
      color: #ff9900;
    }
  }
  .video-name {
    margin-left: 16px;
    color: #0a121a;
    font-weight: bold;
  }
  .video-link {
    margin-left: 20px;
    color: #e6e6e6;
    & > i {
      font-size: 20px !important;
      margin: 0 10px;
      cursor: pointer;
    }
    & > i:hover {
      color: #ff9900;
    }
  }
}
</style>
