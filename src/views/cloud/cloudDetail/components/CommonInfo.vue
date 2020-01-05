<template>
  <div class="detail-rightcon">
    <div class="star-rating">
      <div class="right-star">
        {{ avg_score }}
      </div>
      <div class="data">
        <ele-rate :value="starts" disabled text-color="#000"> </ele-rate>
        <span class="demonstration">{{ score_num }}人评价</span>
      </div>
    </div>
    <div class="course"></div>
  </div>
</template>

<script lang="ts">
import EleRate from '@/components/element/EleRate.vue'
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({
  components: { EleRate }
})
export default class CommonInfo extends Vue {
  @Prop({ default: () => {} }) starts!: Object
  @Prop({ default: '' }) score_num!: string
  @Prop({ default: '' }) avg_score!: string
  // @Prop({ default: () => {} }) relatedCourse!: object
}
// export default {
//   name: 'CommonInfo',
//   components: {
//     EleRate
//   },
//   props: {
//     starts: {},
//     score_num: {},
//     avg_score: {}
//   },
//   data() {
//     return {
//       value: '12365人评价'
//     }
//   },
//   methods: {}
// }
</script>

<style lang="scss" scoped>
.star-rating {
  width: 300px;
  height: 96px;
  background: rgba(235, 238, 240, 1);
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 30px;
  padding-right: 16px;
  margin-top: 14px;
}
.right-star {
  font-size: 48px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(255, 170, 0, 1);
}
.demonstration {
  font-size: 12px;
  color: rgba(139, 145, 153, 1);
  display: flex;
  justify-content: flex-end;
  flex-direction: row;
  padding-right: 7px;
}
.el-icon-star-off {
  background: red;
}
// .hhh-rate &::v-deep i.el-rate__icon {
//   font-size: 15px;
// }
</style>
