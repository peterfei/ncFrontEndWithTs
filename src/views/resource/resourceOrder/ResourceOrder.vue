<template>
  <div class="order-box ">
    <div class="box layout-content">
      <div class="layou-content content-block">
        <div class="title-block">
          <span v-if="pageType === 'pay'">确认订单</span>
          <span v-if="pageType === 'confirm'">支付订单</span>
        </div>
        <div class="detail-block">
          <div class="confirm-block" v-if="pageType == 'confirm'">
            <div class="detail">
              <div class="left">
                <div class="img">
                  <img src="" alt="" />
                </div>
                <div class="info">
                  <div class="title">【iH5 3.0】零基础入门H5</div>
                  <span class="update">更新时间： 2018年09月28日</span>
                </div>
              </div>
              <div class="right">
                <div class="yuan">
                  <span class="describe">
                    原价:
                  </span>
                  <del>¥ 150.00</del>
                </div>
                <div class="zhifu">
                  <span class="describe">
                    支付金额:
                  </span>
                  <span>¥ 100.00</span>
                </div>
              </div>
            </div>
            <div class="price">
              <div class="left">
                <span class="goods-num">
                  共一件商品，总金额: ¥ 130.00
                </span>
                <span class="my-coupon">
                  我的优惠
                </span>
                <span class="discount">
                  优惠折扣: ¥ 100.00
                </span>
              </div>
              <div class="right">
                <span class="shifu">实付金额:</span>
                <span class="price-num">¥ 100.00</span>
              </div>
            </div>
          </div>
          <div class="pay-block" v-if="pageType == 'pay'">
            <div class="detail">
              <div class="order-num">
                订单号：BD808018102900001
              </div>
              <div class="user-time">
                <div class="user">
                  用户名: 萨菲罗斯
                </div>
                <div class="time">
                  您的订单已提交，请在30分钟内完成支付！支付剩余时间：
                  {{ minutes }} 分 {{ second }} 秒
                </div>
              </div>
              <div class="methods">
                <div class="title">支付方式</div>
                <div class="pay-type">
                  <span
                    class="zhifubao item"
                    :class="{ active: payment == 'zhifubao' }"
                    @click="setPayment('zhifubao')"
                  >
                    <span class="duihao">
                      <i class="iconfont icon-correct"></i>
                    </span>
                    <i class="iconfont icon-zhifubao"></i>
                    <span class="name">支付宝</span>
                  </span>
                  <span
                    class="weixin item"
                    :class="{ active: payment == 'weixin' }"
                    @click="setPayment('weixin')"
                  >
                    <span class="duihao">
                      <i class="iconfont icon-correct"></i>
                    </span>
                    <i class="iconfont icon-weixinzhifu"></i>
                    <span class="name">微信支付</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="btns">
            <span v-if="pageType === 'confirm'" @click="buy()">
              立即购买
            </span>
            <span v-if="pageType === 'pay'">
              立即支付
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// import { mockResPackFilter } from '@/mocks/index'
import { Component, Vue, Watch } from 'vue-property-decorator'
// import { ResourcePackageList, PackageOperate } from '@/api/resource'
// declare module 'vue/types/vue' {
//   interface Vue {
//     [key: string]: any
//   }
// return {
//   id: '',
//   resDetail: '',
//   resTypes: '',
// }
// }
@Component({
  components: {}
})
export default class ResourceOrder extends Vue {
  public payment: string = 'zhifubao' //支付方式
  public resDetail: any
  public resTypes: any
  public minutes: number = 29 //倒计时-分
  public second: number = 59 //倒计时-秒
  public pageType: string = 'confirm'
  mounted() {
    const urlQuery = this.$route.query.type
    if (urlQuery === undefined) {
      this.$router.push({
        query: {
          type: this.pageType
        }
      })
    }
  }

  // 点击购买按钮
  public buy() {
    this.pageType = 'pay'
    this.$router.push({
      query: {
        type: this.pageType
      }
    })
  }

  //选择支付方式
  setPayment(tab: string) {
    this.payment = tab
  }

  // 倒计时方法
}
</script>

<style lang="scss" scoped>
.layout-content {
  margin: 0 auto;
  width: 1200px;
}
.order-box {
  background: #fff;
  width: 100%;
  background: url('../../../assets/image/bg/order_bg.png');
  background-repeat: no-repeat;
  background-size: cover;
}
.box {
  .title-block {
    padding: 50px 0 45px 0;
    font-size: 32px;
    font-weight: 300;
    color: rgba(10, 18, 26, 1);
  }
  .detail-block {
    margin-bottom: 115px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 4px 11px 0px rgba(230, 230, 230, 1);
    border-radius: 10px;
    padding: 30px;
    .confirm-block {
      .detail {
        display: flex;
        justify-content: space-between;
        margin-bottom: 32px;
        background: #f4f4f4;
        padding: 20px;
        .left {
          .img {
            overflow: hidden;
            margin-right: 20px;
            width: 160px;
            height: 120px;
            background: #ccc;
            display: inline-block;
            border-radius: 5px;
          }
          .info {
            display: inline-block;
            vertical-align: top;
          }
          .title {
            font-size: 18px;
            font-weight: bold;
            color: rgba(10, 18, 26, 1);
            margin-bottom: 5px;
          }
          .update {
            font-size: 12px;
            font-weight: 400;
            color: rgba(139, 145, 153, 1);
          }
        }
        .right {
          padding-top: 42px;
          .describe {
            color: #4c5258;
            font-size: 14px;
            width: 82px;
            text-align: left;
            display: inline-block;
          }
          .yuan {
            margin-bottom: 4px;
            del {
              color: #8b9199;
              font-size: 16px;
            }
          }
          .zhifu {
            color: #4c5258;
          }
        }
      }
    }
    .pay-block {
      .order-num {
        font-size: 16px;
        font-weight: 400;
        color: rgba(76, 82, 88, 1);
        margin-bottom: 20px;
      }
      .user-time {
        background: #f4f4f4;
        padding: 20px 20px 35px 20px;
        .user {
          color: #4c5258ff;
          font-size: 14px;
          margin-bottom: 18px;
        }
        .time {
          font-size: 16px;
          color: #ff783cff;
          font-weight: 400;
        }
      }
      .methods {
        .title {
          margin: 26px 0 22px 0;
        }
        .pay-type {
          .active {
            border: 2px solid #f21113;
            .duihao {
              display: inline-block !important;
            }
          }
          .zhifubao {
            i {
              color: #00abef;
              font-size: 35px;
              margin-right: 20px;
            }
          }
          .name {
            vertical-align: super;
            height: 18px;
            font-size: 20px;
            font-weight: 400;
            color: rgba(76, 82, 88, 1);
          }
          .weixin {
            i {
              color: #00c900;
              font-size: 35px;
              margin-right: 20px;
            }
          }
          .item {
            width: 200px;
            background: #f4f4f4;
            display: inline-block;
            border-radius: 5px;
            margin-right: 20px;
            padding: 26px 0;
            text-align: center;
            cursor: pointer;
            position: relative;
            .duihao {
              display: none;
              position: absolute;
              right: 0;
              bottom: 0;
              height: 0;
              width: 0;
              width: 0;
              height: 0;
              border-style: solid;
              z-index: 500;
              border-width: 0 0 20px 20px;
              border-color: transparent transparent #ff0000 transparent;
              i {
                position: absolute;
                right: 1px;
                font-size: 10px;
                margin: 0;
                bottom: -20px;
                color: #fff;
              }
            }
          }
        }
      }
    }
    .price {
      display: flex;
      justify-content: space-between;
      color: #4c5258;
      font-size: 14px;
      .left {
        .goods-num {
          margin-right: 80px;
        }
        .my-coupon {
          margin-right: 90px;
        }
        span {
          display: inline-block;
          vertical-align: sub;
        }
      }
      .right {
        .price-num {
          color: #f21113;
          font-size: 22px;
          margin-left: 50px;
          display: inline-block;
          vertical-align: sub;
        }
      }
    }
    .btns {
      border-top: 1px solid #ebeff3;
      padding-top: 30px;
      text-align: right;
      margin-top: 22px;
      span {
        width: 128px;
        height: 46px;
        background: #f21113;
        border-radius: 5px;
        display: inline-block;
        text-align: center;
        color: #fff;
        line-height: 44px;
        cursor: pointer;
        transition: 0.4s;
        &:hover {
          background: #c50002;
        }
      }
    }
  }
}
</style>
