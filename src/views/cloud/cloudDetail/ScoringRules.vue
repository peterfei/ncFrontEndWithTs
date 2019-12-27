<template>
  <div class="scoringRules">
    <div class="ruleContent">
      <div class="info" v-if="scoring_rules ? scoring_rules : ''">
        <!-- {{getIntroduct.last_issue?getIntroduct.last_issue.scoring_rules:''}} -->
        {{ scoring_rules }}
      </div>
      <!--  暂无内容 -->
      <div v-else>
        暂无内容
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({})
export default class ScoringRules extends Vue {
  @Prop({ default: () => {} }) scoring_rules!: object
}
// export default {
//   name: 'ScoringRules',
//   props: {
//     scoring_rules: {}
//   },
//   data() {
//     return {}
//   },
//   methods: {}
// }
</script>

<style lang="scss" scoped>
.scoringRules {
  width: 860px;
}
.scoringRules .ruleContent {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 5px 10px 0px rgba(230, 230, 230, 1);
  border-radius: 5px;
  padding: 28px;
  // display: flex;
  // flex-direction: column;
  margin-bottom: 10px;
}
.scoringRules .ruleContent .info {
  font-size: 12px;
  color: rgba(76, 82, 88, 1);
  line-height: 22px;
}
</style>
