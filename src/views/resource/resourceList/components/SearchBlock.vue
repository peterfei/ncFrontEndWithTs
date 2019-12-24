<template>
  <div>
    <div class="search_blcok">
      <el-input
        placeholder="搜索感兴趣的关键词"
        v-model="searchInput"
        style="height:50px;"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          class="search-btn"
          @click="searchChild"
        ></el-button>
        <!-- -->
      </el-input>
    </div>
    <div class="hot_tag">
      <span class="title">热门:</span>
      <span
        v-for="item in hotTags"
        :key="item.id"
        class="item"
        @click="choosetag(item.name)"
      >
        {{ item.name }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { mokHotSearchTag } from '@/mocks/index'
import { ISearchHotTags } from '@/types/index'
@Component
export default class SearchBlock extends Vue {
  searchInput: string = '' // 输入框内容
  public hotTags: Array<ISearchHotTags> = mokHotSearchTag

  // 点击选择热门tag
  public choosetag(item: string) {
    this.searchInput = item
    this.$emit('change', item)
  }
  public searchChild() {
    this.$emit('search', this.searchInput)
  }
}
</script>

<style lang="scss" scoped>
.search_blcok {
  ::v-deep .el-input-group__append {
    border: none;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
  }
  width: 560px;
  .search-btn {
    background: #ffd200;
    width: 50px;
    height: 50px;
    border: none;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    &:hover {
      background: #ffbc00;
      transition: 0.3s;
    }
    ::v-deep .el-icon-search {
      color: #fff;
      font-size: 17px;
      position: relative;
      right: 2px;
    }
  }
}
::v-deep .el-input__inner {
  height: 50px;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
  & :focus {
  }
}
::v-deep .el-input__inner:focus {
  border-color: #d0d0d0 !important;
}
::v-deep .input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.hot_tag {
  margin-top: 10px;
  .title {
    color: #fff;
    font-size: 12px;
    margin-right: 27px;
  }
  .item {
    cursor: pointer;
    color: #fff;
    font-size: 12px;
    margin-right: 27px;
  }
}
</style>
