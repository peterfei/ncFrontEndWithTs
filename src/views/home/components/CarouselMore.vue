<template>
  <div class="carousel-more">
    <el-carousel :interval="6000" :autoplay="false" indicator-position='none'
    arrow="never" ref="carousel">
      <el-carousel-item v-for="(itemlist, index) in carouselList" :key="index">
        <div class="carousel-more-item-box">
          <div v-for="(item) in itemlist" :key="item.id">
            <slot :row="item"></slot>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
    <div class="ibd-arrow-btn">
      <span class="ibd-arrow-btn-left" :style="{height:height}" @click="ibdPrev">
        <i class="el-icon-arrow-left"></i>
      </span>
      <span class="ibd-arrow-btn-right" :style="{height:height}"  @click="ibdNext">
        <i class="el-icon-arrow-right"></i>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CarouselMore',
  props: {
    showNum: {
      type: Number,
      required: false,
      default: () => 5,
    },
    carouselLists: {
      type: Array,
      required: false,
      default: () => [],
    },
    height: {
      type: String,
      required: false,
      default: () => '174px',
    },
  },
  components: {},
  mounted() {},
  computed: {
    // 计算属性的 getter
    carouselList() {
      const carouselItem = [];
      let i = 0;
      if (this.carouselLists.length) {
        const num = Math.ceil(this.carouselLists.length / this.showNum);
        for (let j = 0; j < num; j += 1) {
          carouselItem.push(this.carouselLists.slice(i, i + this.showNum));
          i += this.showNum;
        }
      }
      return carouselItem;
    },
  },
  data() {
    return {};
  },
  methods: {
    ibdPrev() {
      this.$refs.carousel.prev();
    },
    ibdNext() {
      this.$refs.carousel.next();
    },
  },
};
</script>

<style lang="scss" scoped>
.carousel-more {
  width: 100%;
  position: relative;
  .carousel-more-item-box {
    display: flex;
    flex-direction: row;
    margin: 6px 0;
    justify-content: space-between;
  }
}
.el-carousel {
  width: 1240px;
  padding: 0 20px;
  margin-left: -20px;
  height: 100%;
  // background: red;
  border-radius: 0 10px 10px 0;
}
.ibd-arrow-btn {
  position: absolute;
  z-index: 9;
  top: 0;
  left: 0;
  width: 100%;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
}
.ibd-arrow-btn > span {
  position: absolute;
  top: 2px;
  z-index: 2;
  display: flex;
  width: 36px;
  height: 100px;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  transition: all 0.6s;
  opacity: 0;
  color: #e6e6e6;
  i {
    font-size: 24px;
  }
}
.ibd-arrow-btn-left {
  left: -100px;
}
.ibd-arrow-btn-right {
  left: 100%;
  transform: translateX(60px);
}
.carousel-more:hover,
.ibd-arrow-btn:hover {
  .ibd-arrow-btn-left {
    opacity: 1;
    transform: translateX(50px);
  }
  .ibd-arrow-btn-right {
    opacity: 1;
    transform: translateX(10px);
  }
}
.ibd-arrow-btn-left:hover,
.ibd-arrow-btn-right:hover {
  color: #8a9199;
  background-color: rgba(244, 244, 244, 1);
}
</style>
