<template>
  <div class="recommend-box">
    <div class="content">
      <div class="left">
        <div>
          <img
            :src="cover"
            alt=""
            class="seat"
          >
        </div>
      </div>
      <div class="right">
        <router-link
          tag="div"
          class="subtitle"
          :to="{path:`/course/courseDetail/${id}`}"
        >{{title}}</router-link>
        <div class="num_rate">
          <span>
            <i class="icon iconfont icon-guankanshu"></i>
            <span class="p_num fs12">{{views}}</span>
          </span>

        </div>
      </div>
    </div>
  </div>
</template>


<script>

export default {
  components: {
  },
  data() {
    return {};
  },
  props: {
    img: {},
    title: {},
    cover: {},
    id: {
      type: [Number, String],
      default: () => null,
    },
    views: {},
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.recommend-box {
  // width: 280px;
  margin-bottom: 20px;
  .content {
    display: flex;
    width: 100%;
  }
  .right {
    width: 200px;
    padding-left: 10px;
    .subtitle {
      cursor: pointer;
      color: #07111b;
      font-size: 14px;
      margin-bottom: 5px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      &:hover {
        color: #ff783c;
      }
    }
  }
  .num_rate {
    display: flex;
    justify-content: space-between;
    color: #8a9199;
    i {
      font-size: 10px;
      margin-right: 4px;
    }
    .rate {
      position: relative;
      top: 2px;
    }
  }
}
.seat {
  background: #ccc;
  width: 80px;
  height: 60px;
  border-radius: 4px;
  display: block;
}
.active-link {
  border-bottom: 0px solid transparent !important;
}
</style>
