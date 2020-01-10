<template>
  <div class="scoring-rules">
    <div class="rule-content">
      <div class="info" v-if="scoring_rules ? scoring_rules : ''">
        {{ scoring_rules }}
      </div>
      <!--  暂无内容 -->
      <div class="no-data" v-else>
        暂无内容
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({})
export default class ScoringRules extends Vue {
  @Prop({ default: () => ({}) }) scoring_rules!: object
}
</script>

<style lang="scss" scoped>
.scoring-rules {
  width: 860px;
}
.no-data {
  width: 100%;
  background: #fff;
  color: #4c5258;
}
.scoring-rules .rule-content {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 5px 10px 0px rgba(230, 230, 230, 1);
  border-radius: 5px;
  padding: 28px;
  margin-bottom: 10px;
}
.scoring-rules .rule-content .info {
  font-size: 12px;
  color: rgba(76, 82, 88, 1);
  line-height: 22px;
}
</style>
