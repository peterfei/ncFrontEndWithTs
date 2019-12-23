<template>
  <div class="other-comment-content">
    <div
      v-for="(comments, index) in usercomments"
      :key="index"
      class="comment-item-box"
    >
      <el-card class="box-card">
        <div class="left">
          <slot name="touxiang"><img src="" alt=""/></slot>
        </div>
        <div class="right">
          <div class="up df flex-b">
            <div class="left">
              <div class="text-content">
                <span class="visitor-name fs14 fcolor-4c">{{
                  comments.userName
                }}</span>
                <p class="fs14 fcolor-4c" v-html="comments.replyContent"></p>
              </div>
            </div>
            <div class="right">
              <el-rate
                v-model="comments.rateValue"
                disabled
                text-color="#ff9900"
                score-template="{value}"
              >
              </el-rate>
            </div>
          </div>
          <div class="down df flex-b">
            <div class="left">
              <span class="bgcolor-e7 dianzan" @click="dianzan">
                <i class="icon el-icon-phone-outline fs14"></i>
                <span class="fs14">{{ comments.likeNum }}</span>
              </span>
              <el-button type="text" @click="reply(index, comments)"
                >回复</el-button
              >
            </div>
            <div class="right fs12 fcolor-8b reply-time">
              {{ comments.replyTime }}
            </div>
          </div>
          <div class="replyBox">
            <div class="reply-in">
              <div class="left">
                <img src="" alt="" />
              </div>
              <div class="right">
                <div class="top">
                  <div>
                    <span>萨尔</span>
                    <span>回复</span>
                  </div>
                  <div>
                    2018-09-12
                  </div>
                </div>
                <div>
                  66666666 牛逼！
                </div>
                <el-button type="text">回复</el-button>
              </div>
            </div>
            <el-input
              :placeholder="defaultText"
              v-if="index === replyTo"
              type="textarea"
            ></el-input>
          </div>
        </div>
        <!-- <el-input :placeholder="defaultText" v-if="index
        === replyTo" type="textarea"></el-input> -->
      </el-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({
  filters: {
    filesize(filesize: number) {
      let size = filesize
      let unit = 'KB'
      if (size > 1024) {
        size = (size / 1024).toFixed(1)
        unit = 'MB'
      }
      if (size > 1024) {
        size = (size / 1024).toFixed(1)
        unit = 'GB'
      }
      if (size > 1024) {
        size = (size / 1024).toFixed(1)
        unit = 'TB'
      }
      return size + unit
    }
  }
})
export default class OtherCommentItem extends Vue {
  public replyTo: Number = -1
  public defaultText: String = ''
  @Prop({ type: Array, required: true }) usercomments!: []

  reply(index: any, item: any) {
    this.defaultText = `回复@${item.user_name}`
    if (this.replyTo === index) {
      this.replyTo = -1
    } else {
      this.replyTo = index
    }
  }
}
</script>

<style lang="scss">
.other-comment-content {
  .comment-item-box {
    margin-bottom: 10px;
  }
  .el-card__body {
    width: unset;
    display: flex;
    justify-content: space-between;
  }
  .box-card {
    padding: 30px;
    // width: 100%;
    .left {
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #ccc;
        display: inline-block;
        margin-right: 19px;
      }
    }
    .right {
      width: 100%;
    }
  }
  .up {
    .left {
      width: 80%;
      .text-content {
        .visitor-name {
          display: inline-block;
          margin-bottom: 15px;
        }
        p {
          line-height: 23px;
        }
      }
    }
    .right {
      width: 20%;
      text-align: right;
      .el-rate__item i {
        font-size: 12px;
      }
    }
  }
  .down {
    margin-top: 34px;
    .left {
      width: 100%;
      .dianzan {
        padding: 6px 15px 9px 15px;
        border-radius: 15px;
        margin-right: 11px;
        cursor: pointer;
        i {
          color: #8b9199;
          margin-right: 8px;
        }
        span {
          color: #8b9199;
        }
      }
      .el-button--text {
        font-size: 12px;
        color: #8b9199;
      }
    }
    .right {
      text-align: right;
    }
    .reply-time {
      line-height: 38px;
    }
  }
}
</style>
