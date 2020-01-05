<template>
  <div class="character-box">
    <ul>
      <!-- <li>
        <i></i>
        <span>学生</span>
      </li>
      <li>
        <i></i>
        <span>学生</span>
      </li>
      <li>
        <i></i>
        <span>学生</span>
      </li>
      <li>
        <i></i>
        <span>学生</span>
      </li> -->
      <li
        v-for="role in roles"
        :key="role.id"
        @click="selectRole(role.id)"
        :class="{ active: selectRoleId == role.id }"
      >
        <i></i>
        <span>{{ role.label }}</span>
      </li>
    </ul>
    <div class="next-block">
      <el-button
        :class="{ active: canNextBoolean == true }"
        @click="toNextPage"
      >
        下一步
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { mockRoleRigister } from '@/mocks/index'

@Component({
  components: {}
})
export default class DragVeriCheck extends Vue {
  public roles: Array<any> = mockRoleRigister
  public selectRoleId: any = null
  public canNextBoolean: boolean = false

  // 点击选择角色
  selectRole(val: number) {
    this.selectRoleId = val
    this.canNext()
  }

  // 判断是否可以下一步
  canNext() {
    this.canNextBoolean = true
  }

  // 点击前往下一页
  toNextPage() {
    if (this.canNextBoolean == true) {
      this.$router.push({
        path: `/reg/`,
        query: {
          type: 'upload'
        }
      })
    }
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
