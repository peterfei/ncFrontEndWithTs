<template>
  <div class="complete-box">
    <div class="info-content">
      <div>
        <i class="icon iconfont icon-wancheng"></i>
      </div>
      <p>成功完善个人资料</p>
    </div>
    <div class="go-ibd">
      <el-button @click="goibd">
        进入i博导
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class DragVeriCheck extends Vue {
  goibd() {
    this.$router.push({
      path: `/home`
    })
  }
}
</script>

<style lang="scss" scoped>
$orange-color: #ff783c;
$orangeHoverColor: #ff6520;
$gray: #edeeef;
.complete-box {
  .info-content {
    margin-top: 85px;
    text-align: center;
    i {
      font-size: 58px;
      color: #67c23a;
    }
    p {
      font-size: 20px;
      color: #909499;
    }
  }
  .go-ibd {
    width: 344px;
    position: absolute;
    bottom: 30px;
    ::v-deep .el-button {
      background: $orange-color;
      border: none;
      width: 100%;
      color: #fff;
      height: 44px;
      &:hover {
        background: $orangeHoverColor;
        transition: 0.4s;
      }
    }
  }
}
</style>
