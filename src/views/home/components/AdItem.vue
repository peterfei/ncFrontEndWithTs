<template>
  <div class="home-ad-item" style="styleObj">
    <img :src="item.url" alt="" />
  </div>
</template>

<script>
export default {
  name: "AdItem",
  props: {
    item: {
      type: Object,
      required: false,
      default: () => {}
    },
    width: {
      type: String,
      required: false,
      default: () => "590px"
    },
    height: {
      type: String,
      required: false,
      default: () => "100px"
    }
  },
  computed: {
    styleObj() {
      return {
        width: this.width,
        height: this.height
      };
    }
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.home-ad-item {
  width: 590px;
  border-radius: 10px;
  overflow: hidden;
  & > img {
    display: inline-block;
    width: 100%;
    height: 100%;
    cursor: pointer;
    transition: all 0.6s;
    &:hover {
      transform: scale(1.1);
    }
  }
}
</style>
