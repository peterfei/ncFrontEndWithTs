<template>
  <div>
    <div class="search_blcok">
      <el-input
        placeholder="搜索感兴趣的关键词"
        v-model="input"
        style="height:50px;"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          class="search-btn"
          @click="searchChild"
        ></el-button>
      </el-input>
    </div>
    <div class="hot_tag">
      <span class="title">热门:</span>
      <span
        v-for="item in hottags"
        :key="item.id"
        class="item"
        @click="choosetag(item)"
      >
        {{ item }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: '',
      hottags: [
        '电商概论',
        '网络营销',
        '网店营销',
        '移动电商',
        '新媒体',
        '跨境电商'
      ]
    }
  },
  methods: {
    choosetag(item) {
      console.log(item)
      this.input = item
      this.searchChild()
    },
    searchChild() {
      this.$emit('search', this.input)
    }
  }
}
</script>

<style lang="scss" scoped>
.search_blcok {
  // /deep/ .el-input-group__append {
  //   border: none;
  //   border-top-right-radius: 6px;
  //   border-bottom-right-radius: 6px;
  // }
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
    // /deep/ .el-icon-search {
    //   color: #fff;
    //   font-size: 17px;
    //   position: relative;
    //   right: 2px;
    // }
  }
}
// /deep/ .el-input__inner {
//   height: 50px;
//   border-top-left-radius: 6px;
//   border-bottom-left-radius: 6px;
//   & :focus {
//   }
// }
// /deep/ .el-input__inner:focus {
//   border-color: #d0d0d0 !important;
// }
// /deep/ .input-with-select .el-input-group__prepend {
//   background-color: #fff;
// }
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
