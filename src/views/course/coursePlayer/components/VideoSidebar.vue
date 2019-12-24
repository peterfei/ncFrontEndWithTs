<template>
  <div class="video-sidebar">
    <div class="video-sidebar-nav">
      <span
        data-show="showBarBox"
        @click="sideBarLeftbtn('chapters')"
        :class="{ 'active-style': activeItem === 'chapters' }"
      >
        <i class="icon iconfont icon-mulu"></i>
        章节
      </span>
      <span @click="sideBarbtn('discussion')">
        <i class="icon iconfont icon-web_weixin"></i>
        讨论
      </span>
      <span @click="sideBarbtn('notes')">
        <i class="icon iconfont icon-biji"></i>
        笔记
      </span>
      <span
        data-show="showBarBox"
        @click="sideBarLeftbtn('resources')"
        :class="{ 'active-style': activeItem === 'resources' }"
      >
        <i class="icon iconfont icon-ziyuan"></i>
        资源
      </span>
    </div>
    <!-- class="slot-item-box"
      :class="{'active-style': activeItem === 'resources'}" -->

    <div
      :class="{ 'slot-item-box': true, 'left-active': leftShow }"
      data-show="showBarBox"
      ref="leftbar"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VideoSidebar',
  data() {
    return {
      activeItem: '',
      leftActive: '',
      leftShow: false // 关闭
    }
  },
  mounted() {
    document.addEventListener('click', d => {
      if (
        d.toElement.parentNode.dataset.show === 'showBarBox' ||
        d.toElement.dataset.show === 'showBarBox'
      ) {
        return ''
      }
      this.handleClose()
      return ''
    })
  },
  methods: {
    showSlotBox() {
      if (!this.leftShow) {
        this.leftShow = true
      } else {
        this.leftShow = false
      }
    },
    handleClose() {
      if (this.$refs.leftbar) {
        this.leftShow = false
      }
    },
    sideBarbtn(text) {
      this.activeItem = text
      this.$emit('sideBarbtn', text)
    },
    // 开合控制
    sideBarLeftbtn(text) {
      if (!this.leftActive) {
        this.leftActive = text
        this.$emit('sideBarbtn', this.leftActive)
        this.showSlotBox()
        // 点击相同的时候
      } else if (this.leftActive === text) {
        this.showSlotBox()
      } else {
        // 点击不相同的时候
        this.leftActive = text
        // 不相等  开合
        if (!this.leftShow) {
          this.showSlotBox()
        }
        this.$emit('sideBarbtn', this.leftActive)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.video-sidebar {
  position: relative;
  width: 100%;
  height: 100%;
  .video-sidebar-nav {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    background-color: #1c1f21;
    span {
      display: flex;
      width: 100%;
      padding: 20px 0;
      flex-direction: column;
      align-items: center;
      color: rgba(255, 255, 255, 0.3);
      // opacity: 0.3;
      cursor: pointer;
      i {
        margin-bottom: 5px;
      }
      &:hover {
        color: rgba(255, 255, 255, 0.6);
        background: rgba(37, 40, 43, 0.9);
      }
    }
  }
  .slot-item-box {
    position: absolute;
    z-index: 1000;
    top: 0;
    left: 60px;
    width: 404px;
    height: 100%;
    background: rgba(37, 40, 43, 0.9);
    transform: translateX(-404px);
    transition: transform 0.3s ease-in;
  }
}
.left-active {
  transform: translateX(0px) !important;
}
.active-style {
  color: rgba(255, 255, 255, 0.6);
  background: rgba(37, 40, 43, 0.9);
}
</style>
