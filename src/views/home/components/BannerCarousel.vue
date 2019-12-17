<template>
  <div class="banner-carousel">
    <el-carousel height="100%">
      <el-carousel-item v-for="item in bannerUrl" :key="item.id">
        <!-- <h3>{{ item }}</h3> -->
        <img :src="item.url" alt="" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
export default {
  name: 'BannerCarousel',
  data() {
    return {
      bannerUrl: [
        {
          id: 1,
          // eslint-disable-next-line
          url: require('../../../../public/image/bg/1.jpg')
        },
        {
          id: 2,
          // eslint-disable-next-line
          url: require('../../../../public/image/bg/2.jpg')
        },
        {
          id: 3,
          // eslint-disable-next-line
          url: require('../../../../public/image/bg/3.jpg')
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.banner-carousel {
  width: 100%;
  height: 324px;
}
.el-carousel {
  width: 100%;
  background: red;
  border-radius: 0 10px 10px 0;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  text-align: center;
  line-height: 150px;
  margin: 0;
}
img {
  width: 100%;
  height: 100%;
}
</style>
