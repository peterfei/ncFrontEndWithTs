<template>
  <div class="cate-filter">
    <div :class="{'cate-box': needClass}">
      <span class="title">{{title}}:</span>
      <span
        v-if="allOption"
        class="all-option"
        :class="{actived: (selfValue === '0') }"
      >
        <router-link
          tag="button"
          type="text"
          class="cate-button"
          :to="{path:`/course`, query:{ type: `${title}` }}"
        >{{allText}}</router-link>
        <!-- :to="{path:`/course/${title}`}" -->
      </span>
      <span
        class="bd"
        ref="spanEl"
      >
        <ul ref="cateUl">
          <li
            v-for="(item) in options"
            :key="item.id"
            :class="{actived: selfValue === item.id.toString()}"
          >
            <router-link
              tag="button"
              type="text"
              class="cate-button"
              :to="{path:`/course`, query:{ type: `${item.id}` }}"
            >{{item[optionLabel]}}</router-link>
                         <!-- :to="{path:`/course/${item.id}`}" -->
          </li>
        </ul>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CateFilter',
  model: {
    prop: 'selected',
    event: 'change',
  },
  props: {
    optionKey: {
      type: String,
      default: 'value',
    },
    optionLabel: {
      type: String,
      default: 'label',
    },
    selected: {
      type: [String, Number],
    },
    title: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    allOption: {
      type: Boolean,
      default: true,
    },
    allText: {
      type: String,
      default: '全部',
    },
    allValue: {
      type: [String, Number],
      default: 0,
    },
  },
  watch: {
    selected() {
      this.selfValue = typeof this.selected === 'undefined' ? this.selfValue : this.selected;
    },
  },
  methods: {
    // selectOption(val) {
    //   // this.selfValue = val;
    //   // this.$emit('change', val);
    // },
  },
  data() {
    return {
      maxHeight: 80,
      needClass: false,
      selfValue: 0, // 内置的状态保存, 用户在没有配合v-model的情况下依然可用
    };
  },
  created() {
    // 初始化this.selfValue的值
    if (typeof this.selected !== 'undefined') {
      this.selfValue = this.selected;
    } else if (this.allOption) {
      this.selfValue = this.allValue;
    } else if (this.options.length) {
      this.selfValue = this.options[0].value;
    } else {
      throw Error('options not given.');
    }
  },
  mounted() {
    this.needClass = this.$refs.cateUl.clientHeight > this.maxHeight;
    this.$refs.spanEl.style.maxHeight = `${this.maxHeight}px`;
  },
};
</script>

<style lang="scss" scoped>
.cate-filter {
  position: relative;
  max-height: 100px;
  font-size: 14px;
  padding: 10px 0;
  .cate-box {
    position: relative;
    top: 0;
    z-index: 0;

    &:hover {
      z-index: 1;
      .bd {
        transition: max-height 0.3s;
        max-height: none !important;
      }
      top: -17px;
      padding-top: 16px;
      background: #fff;
      // border: 1px solid #000;
      box-shadow: 0 8px 16px 0 rgba(28, 31, 33, 0.2);
      border-radius: 8px;
    }
  }
  .bd {
    // transition: max-height 0.83s;
    display: inline-block;
    overflow: hidden;
  }

  & /deep/ * {
    color: #4d555d;
    font-weight: 400;
  }
  span.title {
    display: inline-block;
    padding: 5px 10px;
    font-weight: bold;
    vertical-align: top;
  }
  span.all-option {
    display: inline-block;
    padding: 0 6px;
    margin-left: 16px;
    vertical-align: top;
  }
  ul {
    vertical-align: top;
    display: inline-block;
    max-width: 1030px;
    padding: 0;
    margin: 0;
    margin-left: 13px;
    list-style: none;
    li {
      display: inline-block;
      padding: 0 15px;
    }
  }
  .actived {
    background: #fbe5da;
    border-radius: 4px;
    & /deep/ * {
      color: rgba(255, 120, 60, 1);
    }
  }
}
.cate-button {
  outline: none;
  border: none;
  background-color: transparent;
  cursor: pointer;
  display: inline-block;
  height: 34px;
}
</style>
