<template>
  <div>
    <div class="videoNav">
      <span @click="handleNavClick">
        <i class="icon iconfont icon-ceyan"></i>
        大纲
      </span>
      <span @click="handleNavClick">
        <i class="icon iconfont icon-taolunqu"></i>
        大纲
      </span>
    </div>
    <div class="videoNavContent" :class="{ active: isActive }"></div>
  </div>
</template>

<script>
export default {
  name: 'VideoNav',
  data() {
    return {
      videoNavContent: false,
      isActive: false
    }
  },
  methods: {
    handleNavClick() {
      console.log('11')
      this.isActive = true
      this.$emit('handleNavClick', '2')
    }
  }
}
</script>

<style lang="scss" scoped>
.videoNav {
  width: 60px;
  height: calc(100vh - 70px);
  background: rgba(28, 31, 33, 1);
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.videoNav span {
  font-size: 12px;
  color: rgba(255, 255, 255, 1);
  opacity: 0.3;
  height: 74px;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  justify-content: center;
}
.videoNav span:hover {
  background-color: #25282b;
}
.videoNavContent {
  width: 404px;
  height: 100%;
  // background: rgba(37, 40, 43, 0.9);
  // transform: translateX(-404px);
  // transition: transform 0.3s ease-in;
  // display: none;
}
.active {
  background: #fff;
  width: 100px;
  height: calc(100vh - 70px);
  position: absolute;
  top: 60px;
  left: 60px;
  transition: transform 0.3s ease-in;
  transform: translateX(200px);
}
</style>
