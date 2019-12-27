<template>
  <div class="cate-filter-group">
    <slot name="cate"></slot>
    <slot name="cateFixed"></slot>
  </div>
</template>

<script>
export default {
  props: ['lineColor'],
  mounted() {}
}
</script>

<style lang="scss" scoped>
// .cate-filter-group > .cate-filter:not(:last-child) {
//   border-bottom: 1px solid #ebeff3;
// }
</style>
