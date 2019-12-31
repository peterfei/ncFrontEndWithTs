<template>
  <div class="detailHead">
    <div class="gradualChange"></div>
    <div class="detailBanner"></div>
    <div class="bannerContent">
      <div class="up">
        <div class="social-share">
          <a href="">
            <i class="iconfont icon icon-web_weixin"></i>
          </a>
          <a href="">
            <i class="iconfont icon icon-qq1"></i>
          </a>
          <a href="">
            <i class="iconfont icon icon-weibo"></i>
          </a>
        </div>
        <div class="info">
          <div class="info-title">{{ package_title }}</div>
          <div class="openingTime">
            开课时间： {{ begin_date }} ~ {{ end_date }}
            <span v-if="description">{{ description }}</span>
            <span v-else-if="duration">，共{{ duration }}</span>
            {{ date_week }}
          </div>
          <div class="buyBox">
            <!-- 立即购买 -->
            <button class="buyBtn" v-if="is_free == 0 && is_buy == 0">
              <span class="pay">立即购买</span>
              <span class="line"></span>
              <span class="money">¥{{ base_price }}</span>
            </button>
            <!-- 进入学习 -->
            <button class="buyBtn" v-if="is_free == 1 || is_buy == 1">
              <span class="pay" style="margin-right:0px">进入学习</span>
            </button>
          </div>
        </div>
      </div>
      <div class="bannerBottom"></div>
      <!-- {{ all_issue }} -->
      <div class="down">
        <div class="drop-content">
          <el-select
            popper-class="select-box"
            :value="activedIssueId"
            @change="selectTrigger"
          >
            <el-option
              v-for="item in issueOptions"
              :key="item.value"
              :label="item.issue_number | numberIssue"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </div>
        <div class="learn">
          <span>{{ now_week }}</span>
          <span class="spot"></span>
          <span>学习人数：{{ study_count }}</span>
        </div>
      </div>
      <div class="collection">
        <i class="iconfont icon icon-xingxing"></i>
        <div class="collect_tit">收藏</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
@Component({
  filters: {
    numberIssue(val: number | string) {
      return `第${val}期`
    }
  }
})
export default class DetailBanner extends Vue {
  @Prop({ default: '' }) package_title!: string
  @Prop({ default: '' }) study_count!: string
  @Prop({ default: '' }) now_week!: string
  @Prop({ default: '' }) base_price!: string
  @Prop({ default: '' }) date_week!: string
  @Prop({ default: '' }) end_date!: string
  @Prop({ default: '' }) begin_date!: string
  @Prop({ default: '' }) is_free!: string
  @Prop({ default: '' }) is_buy!: string
  @Prop({ default: '' }) description!: string
  @Prop({ default: '' }) duration!: string
  @Prop({ default: () => {} }) issueOptions!: Array<any>
  @Prop({ type: Number, default: 0 }) activedIssueId!: number

  value: number = 0
  // updated() {
  //   console.log('aaaxxxsss', this.issueOptions)
  // }
  // 当期刊改变时
  selectTrigger(e: number | string) {
    // console.log('________chang', e);
    // this.value = +`第${e}期`
    // console.log('dijiqi', this.value);
    // 告诉别人我更新了
    // Cloud.MoocList.getPeriodical(this.id).then((rec) => {
    //   this.qiContent = rec.data;
    //   console.log('期数改变了哦', this.qiContent);
    // });
    this.$emit('issueChange', e) // 向父组件发送参数（当前期选中期数id）
  }
}
// export default {
//   name: 'DetailBanner',
//   props: {
//     // 包名称
//     // 开始时间
//     // jieshu
//     activedIssueId: {
//       type: Number
//     },
//     coursePkgTitle: {
//       type: String
//     },
//     issueBeginTime: {
//       type: String
//     },
//     issueEndTime: {
//       type: String
//     },
//     description: {
//       type: String
//     },
//     status: {
//       type: Number // 0:未开始，-1：一结束，1进行中
//     },
//     isPaid: {},
//     price: {},
//     issuesList: {
//       type: Array
//     },
//     joinedCount: {
//       type: Number
//     },
//     all_issue: {},
//     package_title: {},
//     study_count: {},
//     now_week: {},
//     // durationDesc: {},
//     base_price: {},
//     date_week: {},
//     begin_date: {},
//     end_date: {},
//     periodical: {},
//     is_free: {},
//     is_buy: {},
//     activedIssue: {
//       type: Number
//     }
//   },
//   computed: {
//     // 学习周期
//     duration() {
//       let unit
//       let ret
//       if (!this.issueEndTime || !this.issueBeginTime) {
//         return null
//       }
//       const b = new Date(this.issueBeginTime)
//       const e = new Date(this.issueEndTime)
//       const d = e.valueOf() - b.valueOf() / 1000
//       if (d < 7 * 24 * 3600) {
//         unit = '天'
//         ret = d / 24 / 3600
//       } else if (d < 30 * 24 * 3600) {
//         unit = '周'
//         ret = d / 24 / 3600 / 7
//       } else {
//         unit = '月'
//         ret = d / 24 / 3600 / 30
//       }
//       return ret + unit
//     }
//   },
//   // props: {
//   //   packageId: {
//   //     type: Number,
//   //   },
//   //   bgImg: {
//   //     type: String,
//   //     default: 'http://placehold.it/1200x250',
//   //   },
//   //   title: {
//   //     type: String,
//   //     default: '',
//   //   },
//   // },
//   data() {
//     return {
//       options: [
//         {
//           value: '选项1',
//           label: '第一期'
//         },
//         {
//           value: '选项2',
//           label: '第二期'
//         },
//         {
//           value: '选项3',
//           label: '第三期'
//         }
//       ],
//       value: '',
//       moocList: [],
//       qiContent: []
//     }
//   },
//   // 过滤器 转换期中的value
//   filters: {
//     numberIssue(val) {
//       return `第${val}期`
//     }
//   },
//   methods: {
//     // 收藏/取消收藏\
//     toggleFavorate() {},
//     // 分享微信
//     shareChat() {},
//     // 分享微博
//     shareWb() {},
//     // 分享QQ
//     shareQ() {},
//     // 当期刊改变时
//     selectTrigger(e) {
//       // console.log('________chang', e);
//       this.value = `第${e}期`
//       // console.log('dijiqi', this.value);
//       // 告诉别人我更新了
//       // Cloud.MoocList.getPeriodical(this.id).then((rec) => {
//       //   this.qiContent = rec.data;
//       //   console.log('期数改变了哦', this.qiContent);
//       // });
//       this.$emit('issueChange', e) // 向父组件发送参数（当前期选中期数id）
//     }
//   },
//   mounted() {
//     // console.log('1qi');
//     // Cloud.MoocList.getIssues().then((res) => {
//     //   this.moocList = res.list;
//     // });
//   }
// }
</script>

<style lang="scss" scoped>
.detailHead {
  background: transparent;
  position: relative;
  overflow: hidden;
  height: 265px;
  border-radius: 10px;
  margin-top: 30px;
}
.detailBanner {
  height: 265px;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  background-image: url('http://static.ibodao.com/Public/uploads/images/2016/0924/57e646493c8fb.png');
  height: 265px;
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  filter: blur(20px);
  overflow: hidden;
  z-index: 0;
}
.gradualChange {
  position: absolute;
  top: 0px;
  height: 265px;
  width: 100%;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.1));
  z-index: 1;
}
.bannerContent {
  position: relative;
  height: 265px;
  z-index: 100;
}
.bannerContent .up {
  padding-top: 28px;
}
.bannerContent .up .social-share {
  text-align: right;
}
.bannerContent .up .social-share a {
  display: inline-block;
  margin-right: 24px;
}
.bannerContent .up .social-share i {
  font-size: 20px;
  color: #ffffff;
  -webkit-transition: 0.6s;
  transition: 0.6s;
  opacity: 0.6;
}
.bannerContent .up .info {
  position: relative;
  top: -16px;
}
.bannerContent .up .info .info-title {
  text-align: center;
  font-size: 32px;
  color: #fff;
  font-weight: bold;
  margin-bottom: 12px;
}
.bannerContent .up .info .openingTime {
  text-align: center;
  color: #fff;
  font-size: 16px;
}
.bannerContent .up .info .buyBox {
  text-align: center;
  margin-top: 30px;
  position: relative;
}
.bannerContent .up .info .buyBtn {
  width: 200px;
  height: 46px;
  background: #f21113;
  border-radius: 5px;
  border: none;
  color: #fff;
}
.bannerContent .up .info .buyBtn .pay {
  font-size: 16px;
  margin-right: 25px;
}
.bannerContent .up .info .buyBtn .line {
  width: 1px;
  height: 19px;
  background-color: #ffffff;
  display: inline-block;
  position: absolute;
  top: 15px;
}
.bannerContent .up .info .buyBtn .money {
  font-size: 14px;
  margin-left: 11px;
}
.bannerContent .bannerBottom {
  height: 54px;
  background: rgba(0, 0, 0, 1);
  opacity: 0.2;
  border-radius: 10px;
  position: absolute;
  bottom: 0px;
  width: 100%;
  padding: 15px 20px;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
}
.bannerContent .down {
  position: absolute;
  bottom: 14px;
  left: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.bannerContent .down .drop-content {
  .select-box {
    color: #fff;
  }
  &::v-deep .el-input__inner {
    background-color: #35cc67;
    border: 1px solid #35cc67;
    width: 72px;
    height: 24px;
    color: #fff;
    font-size: 12px;
    line-height: 1px;
  }
  &::v-deep .el-icon-arrow-up:before {
    top: 0px;
    position: relative;
  }
  &::v-deep .el-input__icon {
    line-height: 11px;
    position: relative;
    top: -8px;
  }
  &::v-deep .el-select .el-input .el-select__caret {
    color: #fff;
  }
  &::v-deep .el-input__suffix {
    top: 8px;
    right: 2px;
    color: #fff;
  }
  &::v-deep .el-select-dropdown__item > span {
    font-size: 12px;
  }
  &::v-deep .el-input--suffix .el-input__inner {
    padding: 0px 0px 0px 10px;
  }
  &::v-deep .el-input__inner::-webkit-input-placeholder {
    color: #fff;
  }
}
.bannerContent .down .learn {
  color: #fff;
  font-size: 12px;
  opacity: 0.6;
  margin-left: 13px;
}
.bannerContent .down .learn .spot {
  width: 4px;
  height: 4px;
  background: rgba(255, 255, 255, 1);
  opacity: 0.6;
  border-radius: 2px;
  display: inline-block;
  margin: 0px 10px;
  position: relative;
  top: -2px;
}
.bannerContent .collection {
  display: flex;
  flex-direction: row;
  align-items: center;
  position: absolute;
  right: 20px;
  margin-top: 27px;
}
.bannerContent .collection i {
  color: #ffffff;
  -webkit-transition: 0.6s;
  transition: 0.6s;
  opacity: 0.6;
  font-size: 16px;
}
.bannerContent .collect_tit {
  font-size: 12px;
  color: rgba(255, 255, 255, 1);
  opacity: 0.6;
  margin-left: 6px;
}
</style>
