<template>
  <div>
    哈哈哈哈
  </div>
</template>

<script lang="ts">
// import CateFilterCourse from '@/components/CateFilterCommon/CateFilterCourse.vue'
// import SearchBlock from './components/SearchBlock.vue'
// import QueryItem from './components/QueryItem.vue'
// import { mockQueryParams } from '@/mocks/index'
// import { mockResPackFilter } from '@/mocks/index'
// import PackageItem from './components/PackageItem.vue'
// import { Component, Vue, Watch } from 'vue-property-decorator'
// import { ResourcePackageList, PackageOperate } from '@/api/resource'
// declare module 'vue/types/vue' {
//   interface Vue {
//     [key: string]: any
//   }
// }
// @Component({
//   components: {
//     SearchBlock,
//     PackageItem,
//     QueryItem,
//     CateFilterCourse
//   }
// })
// export default class ResourceList extends Vue {
//   mounted() {}
// }
</script>

<style lang="scss" scoped>
.head {
  width: 100%;
  padding-top: 56px;
  height: 170px;
  background: url('../../../../src/assets/image/bg/resource_banner.jpg');
  .top {
    display: flex;
    justify-content: space-between;
    .left {
      .oneword {
        color: #fff;
        font-size: 16px;
        vertical-align: middle;
        display: inline-block;
        margin-right: 38px;
      }
      .title {
        vertical-align: middle;
        display: inline-block;
        font-size: 32px;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        margin-right: 38px;
      }
    }
    .right {
      .release-btn {
        width: 120px;
        height: 40px;
        background: rgba(255, 120, 60, 1);
        border-radius: 5px;
        text-align: center;
        color: #fff;
        line-height: 37px;
        margin-top: 15px;
        cursor: pointer;
        &:hover {
          background: #f6601d;
          transition: 0.3s;
        }
      }
    }
  }
}
</style>
