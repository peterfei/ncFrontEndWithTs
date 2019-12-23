<template>
  <div>
    <router-link
      class="poster-item"
      :style="{ height: setHeight }"
      tag="div"
      :to="{ path: `/course/courseDetail/${id}` }"
    >
      <span class="poster-img-box">
        <img class="poster-img" :src="imgUrl" alt="" />
      </span>
      <span class="is-new-course" v-if="mark">{{ mark }}</span>
      <span class="poster-title word-spot">{{ posterTitle }}</span>
    </router-link>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component
export default class PosterImg extends Vue {
  @Prop({ default: '' }) imgUrl!: string
  @Prop({ default: '' }) posterTitle!: string
  @Prop({ default: '' }) mark!: string | number
  @Prop({ default: '168' }) height!: string | any
  @Prop({}) id!: number
  get setHeight() {
    // eslint-disable-next-line
      if (parseFloat(this.height) == this.height) {
      return `${this.height}px`
    }
    return this.height
  }
}
</script>
<style lang="scss" scoped>
.poster-item {
  position: relative;
  width: 224px;
  display: block;
  .poster-img-box {
    width: 224px;
    height: 100%;
    border-radius: 10px;
    display: inline-block;
    overflow: hidden;
    & > img {
      display: inline-block;
      width: 100%;
      height: 100%;
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.6s;
      &:hover {
        transform: scale(1.05);
      }
    }
  }

  & > .is-new-course {
    position: absolute;
    top: -7px;
    right: -4px;
    display: inline-block;
    width: 40px;
    height: 20px;
    text-align: center;
    line-height: 20x;
    color: #ffffff;
    font-size: 12px;
    font-weight: bolder;
    background: linear-gradient(
      90deg,
      rgba(255, 150, 100, 1) 0%,
      rgba(255, 100, 60, 1) 100%
    );
    border: 2px solid rgba(255, 255, 255, 1);
    border-radius: 12px;
  }
  & > .poster-title {
    position: absolute;
    left: 10px;
    bottom: 10px;
    display: inline-block;
    height: 24px;
    padding: 0 10px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 12px;
    font-size: 12px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 24px;
    max-width: 96px;
  }
}
</style>
