<template>
  <div class="complete-box">
    <div class="info-content">
      <div>
        <i class="icon iconfont icon-biaoqing"></i>
      </div>
      <p>未确定角色不能使用该功能！</p>
    </div>
    <div class="go-ibd">
      <el-button @click="goChoose">
        选择角色
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class DragVeriCheck extends Vue {
  @Emit('next')
  goChoose() {
    const obj = {
      stepStatus: 'next'
    }
    return obj
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
      color: #c0c6cc;
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
