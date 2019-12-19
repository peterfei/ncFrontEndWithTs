<template>
  <div>
    <ul>
      <li>1</li>
      <li v-for="item in list" :key="item.id">{{ item.title }}</li>
      <li>1</li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component
export default class ShowList extends Vue {
  @Prop({ default: true }) list!: boolean
}
</script>
<style lang="scss" scoped></style>
