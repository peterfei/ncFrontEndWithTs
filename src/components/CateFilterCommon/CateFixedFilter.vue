<template>
  <div class="cate-filter-item" @mouseover="handleEnter" @mouseout="handleOut">
    <div
      :class="[isEnter ? 'cate-list cate-list-hover' : 'cate-list']"
      ref="ele"
      :style="{ height: cateListHeight }"
    >
      <div class="cate-name">{{ cataData.title }} :</div>
      <div class="cate-sub">
        <div class="cate-sub-all">
          <span
            :class="
              cataData.activeId === 0 || cataData.activeId === '0'
                ? 'cate-sub-title-active'
                : ''
            "
            @click="routerLinkTo(cataData)"
          >
            全部
          </span>
        </div>
        <div class="cate-sub-title" v-if="cataData.children.length">
          <span
            :class="
              item.id === cataData.activeId ? 'cate-sub-title-active' : ''
            "
            v-for="item in cataData.children"
            :key="item.id"
            @click="routerLinkTo(item)"
          >
            {{ item.name }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CateFixedFilter',
  props: {
    cataData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      cateListHeight: '63px',
      isEnter: false
    }
  },
  methods: {
    routerLinkTo(item) {
      const obj = this.$route.query
      const query = {
        ...obj
      }

      if (!item.activeId) {
        query[item.type] = item.id
      } else {
        query[item.type] = 0
      }
      this.$router.push({
        query
      })
    },
    handleEnter() {
      const height = this.$refs.ele.offsetHeight
      this.cateListHeight = height
      this.isEnter = true
    },
    handleOut() {
      this.isEnter = false
      this.cateListHeight = '63px'
    }
  }
}
</script>

<style lang="scss" scoped>
.cate-filter-item {
  position: relative;
  width: 100%;
  height: 64px;
  box-sizing: border-box;
  .cate-list {
    position: absolute;
    width: 100%;
    height: 63px;
    background-color: #ffffff;
    box-sizing: border-box;
    padding: 0 20px 16px;
    overflow: hidden;

    .cate-name {
      display: inline-block;
      width: 70px;
      height: 63px;
      line-height: 63px;
      font-size: 14px;
      font-weight: bold;
      color: rgba(77, 85, 93, 1);
    }
    .cate-sub {
      display: inline-block;
      height: auto;
      font-size: 14px;
      color: #4d555d;
      vertical-align: top;
      .cate-sub-all {
        width: 100px;
        text-align: center;
        display: inline-block;
        vertical-align: top;
        margin-top: 18px;
        span {
          display: inline-block;
          padding: 5px 12px;
          cursor: pointer;
        }
      }
      .cate-sub-title {
        display: inline-block;
        width: 990px;
        text-overflow: ellipsis;
        white-space: normal;
        span {
          display: inline-block;
          padding: 0px 10px;
          margin-right: 30px;
          position: relative;
          margin-right: 30px;
          top: 16px;
          line-height: 33px;
          margin-bottom: 14px;
          cursor: pointer;
        }
      }
    }
  }
  .cate-list-hover {
    transition: all 0.3s;
    -webkit-transition: all 0.3s; /* Safari */
    z-index: 100;
    // margin-top: -1px;
    border-radius: 6px;
    background-color: #ffffff;
    box-shadow: 2px -2px 10px 2px rgba(230, 230, 230, 1);
  }
}
.cate-sub-title-active {
  color: #ff783c;
  font-weight: bold;
  border-radius: 4px;
  background-color: #fbe5da;
}
</style>
