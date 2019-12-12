<template>
  <div class="sch-inner-item">
    <div class="sch-inner-img">
      <div class="sch-inner-img-item" v-for="(item) in imgList" :key="item.id">
        <img :src="item.schLogo" alt="" @mouseenter="enterImg(item.id)">
      </div>
    </div>
    <div class="sch-inner-intro">
      <div class="sch-intro-box">
        <div class="sch-intro-img">
          <img :src="intro.userImg?intro.userImg:''" alt="">
        </div>
        <span></span>
        <div class="sch-intro-info">
          <div>{{intro.realName?intro.realName:''}}
            <span>{{intro.schoolName?intro.schoolName:''}}</span>
          </div>
          <div class="sch-intro-text word-spot-2">
            {{intro.introduction ? intro.introduction : ''}}
          </div>
        </div>
      </div>
      <span class="triangle" ref='triangle' style="left:83px"></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SchInner',
  props: {
    schInner: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  computed: {
    imgList() {
      const list = [];
      if (this.schInner.length) {
        this.schInner.map((res) => {
          const item = {};
          item.id = res.id;
          item.schLogo = res.schLogo;
          list.push(item);
          return '';
        });
      }
      return list;
    },
  },
  data() {
    return {
      intro: {},
    };
  },
  methods: {
    enterImg(id) {
      this.schInner.map((res, index) => {
        const obj = {};
        if (res.id === id) {
          this.intro = res;
          this.$refs.triangle.style.left = `${83 + (205 * index)}px`;
        }
        return obj;
      });
    },
  },
  mounted() {
    if (this.schInner.length) {
      this.enterImg(this.schInner[0].id);
    }
  },
};
</script>

<style lang="scss" scoped>
.sch-inner-item {
  width: 1200px;
  background-color: #f4f4f4;
  margin-top: -2px;
}
.sch-inner-img {
  width: 100%;
  height: 74px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
  .sch-inner-img-item {
    width: 182px;
    height: 100%;
    overflow: hidden;
    cursor: pointer;
    border-radius: 10px;
    img {
      display: inline-block;
      width: 100%;
      height: 100%;
      transition: all 0.6s;
      &:hover {
        transform: scale(1.1);
      }
    }
  }
}
.sch-inner-intro {
  position: relative;
  width: 100%;
  height: 120px;
  background-color: #ffffff;
  padding: 20px 40px;
  border-radius: 10px;
  .sch-intro-box {
    display: flex;
    width: 100%;
    height: 80px;
    align-items: center;
    .sch-intro-img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    & > span {
      display: inline-block;
      width: 1px;
      height: 50%;
      margin: 0 40px;
      background-color: rgba(244, 244, 244, 1);
    }
    .sch-intro-info {
      display: flex;
      flex-direction: column;
      height: 100%;
      flex: 1;
      & > div {
        width: 100%;
        height: 16px;
        font-size: 16px;
        font-weight: bold;
        color: rgba(8, 17, 26, 1);
        span {
          margin-left: 10px;
          display: inline-block;
          font-size: 12px;
          font-weight: 400;
          color: rgba(8, 17, 26, 1);
        }
      }
      .sch-intro-text {
        width: 100%;
        height: 64px;
        padding: 16px 0;
        font-size: 12px;
        font-weight: 400;
        color: rgba(138, 145, 153, 1);
        line-height: 24px;
      }
    }
  }
  .triangle {
    position: absolute;
    top: -9px;
    left: 83px;
    width: 16px;
    height: 16px;
    transform: rotate(45deg);
    display: inline-block;
    background-color: #fff;
    transition: left 0.5s;
  }
}
</style>
