<template>
  <div class="character-box">
    <ul>
      <li
        v-for="role in roles"
        :key="role.id"
        @click="selectRole(role.id)"
        :class="{ active: selectedRole === role.id }"
      >
        <i></i>
        <span>{{ role.label }}</span>
      </li>
    </ul>
    <div class="next-block">
      <el-button :class="{ active: !!selectedRole }" @click="toNextPage">
        下一步
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model, Emit } from 'vue-property-decorator'
import { mockRoleRigister } from '@/mocks/index'

@Component({
  components: {}
})
export default class DragVeriCheck extends Vue {
  public selectid: number = 0
  public roles: Array<any> = mockRoleRigister
  public canNextBoolean: boolean = false
  @Model('change', { type: Number }) readonly selectedRole!: number

  // 点击选择角色
  @Emit('change')
  selectRole(val: number) {
    console.log('子组件change事件')
    // console.log(val)
    return val
  }
  // 点击前往下一页
  @Emit('next')
  toNextPage() {
    console.log('子组件点击下一步')
  }
}
</script>

<style lang="scss" scoped>
$orange-color: #ff783c;
$orangeHoverColor: #ff6520;
.character-box {
  ul {
    padding-left: 40px;
    padding-right: 40px;
    position: relative;
    top: -12px;
    li {
      cursor: pointer;
      width: 90px;
      display: inline-block;
      margin-bottom: 33px;
      i {
        width: 90px;
        height: 90px;
        background: #ccc;
        display: inline-block;
        border-radius: 50%;
        margin-bottom: 8px;
      }
      span {
        color: #909499;
        font-size: 14px;
        display: inline-block;
        width: 100%;
        text-align: center;
      }
    }
    li.active {
      i {
        background: $orange-color;
      }
      span {
        color: $orange-color;
      }
    }
    li:nth-child(2n + 1) {
      margin-right: 80px;
    }
    li:nth-child(3),
    li:nth-child(4) {
      margin-bottom: 0;
    }
  }
  .next-block {
    position: absolute;
    bottom: 30px;
    width: 344px;
    ::v-deep .el-button {
      border: none;
      background: #ccc;
      cursor: not-allowed;
      color: #fff;
      width: 100%;
      height: 44px;
    }
    .active {
      cursor: pointer;
      background: $orange-color;
      &:hover {
        transition: 0.4s;
        background: $orangeHoverColor;
      }
    }
  }
}
</style>
