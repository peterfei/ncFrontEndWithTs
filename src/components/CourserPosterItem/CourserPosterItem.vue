<template>
  <div class="courser-poster-item">
    <div class="good-lesson-item">
      <poster-img
        ref="pImg"
        :img-url="imgUrl"
        :poster-title="category"
        :mark="labelTitle"
        :id="id"
      >
      </poster-img>
      <div class="poster-introduce">
        <div class="introduce-title">
          <router-link
            class="word-spot-2"
            tag="a"
            :to="{ path: `/course/courseDetail/${id}` }"
            :title="courseTitle"
            >{{ courseTitle }} {{ id }}</router-link
          >
        </div>
        <div class="">
          <span class="introduce-title-text">
            <i class="icon iconfont icon-guankanshu"></i>
            <span class="word-spot">{{ studyMember }}</span>
          </span>
          <span style="float:right" class="introduce-title-start">
            <ele-rate :starts="rateValue"></ele-rate>
          </span>
        </div>
        <div class="introduce-cost">
          <span class="i-RMB">¥</span>
          <span v-if="basePrice" class="introduce-title-text introduce-money">
            <i class="icon iconfont icon-mima1"></i>
            <span class="word-spot">{{ basePrice }}</span>
          </span>
          <span v-if="!basePrice" class="introduce-money no-money">免费</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PosterImg from '../PosterImg/PosterImg.vue'
import EleRate from '../element/EleRate.vue'

export default {
  name: 'CourserPosterItem',
  props: {
    item: {
      type: Object,
      required: false,
      default: () => {}
    },
    id: {
      type: Number
    },
    courseTitle: {},
    studyMember: {},
    basePrice: {},
    imgUrl: {},
    rateValue: {},
    labelTitle: {},
    category: {}
  },
  components: {
    PosterImg,
    EleRate
  },
  methods: {},
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.courser-poster-item {
  width: 226px;
}
.poster-introduce {
  width: 100%;
  margin-top: 11px;
  & > div {
    width: 96%;
    padding: 0 2%;
    & > .introduce-title-text {
      height: 9px;
      font-size: 12px;
      font-weight: 400;
      // color: $light-black;
      & > .iconfont {
        font-size: 12px;
        margin-right: 6px;
      }
      & > span {
        position: relative;
        top: 3px;
        max-width: 80px;
        display: inline-block;
      }
    }
    & > .introduce-title-start {
      margin-top: 3px;
      padding-right: 2px;
    }
  }
  .introduce-title > a {
    // color: $dark-black;
    margin-bottom: 5px;
    line-height: 24px;
    transition: 0.3s;
  }
  .introduce-title > a:hover {
    color: rgba(255, 80, 0, 1);
  }
  & > .introduce-cost {
    margin-top: 1px;
    .i-RMB {
      font-size: 12px;
      color: #4c5359ff;
    }
  }
  & > div > .introduce-money {
    color: rgba(76, 83, 89, 1);
    font-size: 12px;
    > span {
      // color: $dusky-black;
    }
    & > .iconfont {
      color: rgba(76, 83, 89, 1);
    }
  }
}
.active-link {
  border-bottom: 2px solid transparent !important;
}
</style>
