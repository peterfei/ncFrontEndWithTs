<template>
  <div class="info-introd-box">
    <div class="info-title fs16">
      {{infoTitle}}
    </div>
    <div class="info-content fs12">
      {{infoContent}}
    </div>
  </div>
</template>


<script>
export default {
  props: {
    infoTitle: {
      type: String,
      required: true,
      defaultL: () => '',
    },
    infoContent: {
      type: String,
      required: true,
      defaultL: () => '',
    },

  },
};
</script>

<style lang="scss">
.info-introd-box {
  width: 226px;
  .info-title {
    color: #08111a;
    padding: 15px 15px 0 15px;
  }
  .info-content {
    padding: 12px;
    font-weight: 400;
    color: rgba(138, 145, 153, 1);
    line-height: 23px;
  }
}
</style>
