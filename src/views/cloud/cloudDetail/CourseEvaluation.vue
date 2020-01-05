<template>
  <div class="courseEvaluation">
    <div class="commentArea">
      <div class="block">
        <span class="demonstration">综合评分：</span>
        <!-- <el-rate v-model="value1"></el-rate> -->
        <el-rate
          v-model="valueRate"
          :colors="['#F38622', '#F38622', '#F38622']"
          @change="rate()"
        >
        </el-rate>
      </div>
      <div class="textareaBox">
        <!-- <el-form ref="form" :model="form">
          <el-form-item label="">
            <el-input type="textarea"
            v-bind:content.sync="textarea"
            v-model="form.desc"  placeholder="写下你的对该课程的评价..."></el-input>
          </el-form-item>
        </el-form> -->
        <template>
          <quill-editor
            type="none"
            v-bind:content.sync="textarea"
            height="100px"
            placeholder="期待您的评论..."
          ></quill-editor>
        </template>
      </div>
      <div class="submit">
        <!-- <el-button type="warning">提交</el-button> -->
        <el-button type="warning" size="medium" @click="commitComment"
          >提交</el-button
        >
      </div>
    </div>
    <div class="commmentList" v-for="(item, index) in evaluations" :key="index">
      <img :src="item['comment_user']['avatar']" alt="" />
      <div class="describe">
        <div class="itemBox">
          <div class="name">{{ item['comment_user']['realname'] }}</div>
          <div class="data">
            <ele-rate disabled text-color="#000"> </ele-rate>
            <span class="des">{{ item.score }}分</span>
          </div>
        </div>
        <div class="info">{{ item.content }}</div>
        <div class="support" @click="support(item)">
          <div v-if="item.is_favorite == 1">
            <i class="icon iconfont icon-zan" style="color:#F38622"></i>
            <span style="color:#F38622">{{ item.like_count }}</span>
          </div>
          <div v-else>
            <i class="icon iconfont icon-zan"></i>
            <span>{{ item.like_count }}</span>
          </div>
        </div>
        <!-- <el-button class="support"
          size="mini"
          :style="{color:item.is_favorite === 0 ?'#8B9199FF':'#4C5258FF',
          color:item.is_favorite === 0 ? '#000000': '#FFD300'}"
          @click="support(item)">
          <i class="icon iconfont icon-zan"></i>
          <span>{{item.like_count}}</span>
        </div> -->
        <div class="commentTime">时间：{{ item.created_at }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import QuillEditor from '@/components/QuillEditor/QuillEditor.vue'
import EleRate from '@/components/element/EleRate.vue'
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({
  components: {
    EleRate,
    QuillEditor
  }
})
export default class CourseEvaluation extends Vue {
  @Prop({ default: () => [] }) evaluations!: Array<object>
  value1: null = null
  value2: null = null
  valueRate: null = null
  textarea: string = ''
  disabled: boolean = true
  activeClass: number = -1
  colors: ['#99A9BF', '#F7BA2A', '#FF9900'] // 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
  rate() {}
  clear() {
    this.textarea = ''
    this.valueRate = null
    this.disabled = true
  }
  commitComment() {
    console.log('星星不能为空')
    if (!this.textarea) {
      // 提示评论不能为空
      console.log('评论不能为空', this.textarea)
      this.$message({
        message: '评论不能为空',
        type: 'error'
      })
    }
    if (!this.valueRate) {
      // 提示星级评价不能为空
      console.log('星级评价为空')
      this.$message({
        message: '评论星级不能为空',
        type: 'error'
      })
    }
    if (this.valueRate !== '') {
      console.log('等级', this.valueRate)
    }
    if (this.textarea !== '') {
      console.log('评论内容', this.textarea)
      const params = {
        content: this.textarea, // 评论区输入内容
        score: this.valueRate // 分数
      }
      this.$emit('submitComment', params) // 向父组件发送参数（评论区输入内容content;评数score）
    }
    this.clear()
  }
  // 点赞
  support(item: any) {
    const supportObj = {
      id: item.id
    }
    console.log('item', item.id)
    this.$emit('support', supportObj) // 向父组件发送参数（评论id）
  }
}
</script>

<style lang="scss" scoped>
.courseEvaluation {
  width: 860px;
}
.commentArea,
.commmentList {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 5px 10px 0px rgba(230, 230, 230, 1);
  border-radius: 5px;
  padding: 28px;
  margin-bottom: 10px;
}
.commentArea,
.commmentList {
  display: flex;
  flex-direction: column;
}
.commentArea .block {
  display: flex;
  flex-direction: row;
  margin-bottom: 18px;
}
.commentArea .block .demonstration {
  font-size: 14px;
  color: rgba(76, 82, 88, 1);
}
.el-rate {
  margin-left: 3px;
}
.textareaBox {
  &::v-deep .el-textarea__inner {
    background: rgba(250, 250, 250, 1);
    border: 1px solid rgba(242, 242, 242, 1);
    border-radius: 5px;
    height: 136px;
    font-size: 14px;
    color: rgba(139, 145, 153, 1);
    padding-top: 10px;
    padding-bottom: 10px;
  }
}
.submit {
  text-align: right;
  margin-top: 20px;
  &::v-deep .el-button--warning {
    background: #ffd300;
    color: #993c1e;
    border-radius: 0px;
    border: none;
    width: 100px;
    height: 36px;
  }
}
.commmentList {
  display: flex;
  flex-direction: row;
}
.commmentList img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #eee;
  margin-right: 18px;
}
.commmentList .describe {
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1;
}
.commmentList .describe .itemBox {
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
}
.commmentList .describe .itemBox .name {
  font-size: 14px;
  color: rgba(139, 145, 153, 1);
}
.commmentList .describe .itemBox .data {
  text-align: right;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.commmentList .describe .itemBox .des {
  margin-left: 4px;
  font-size: 12px;
  color: rgba(138, 145, 153, 1);
  line-height: 30px;
}
.commmentList .describe .info {
  font-size: 14px;
  color: rgba(76, 82, 88, 1);
  line-height: 30px;
  margin-bottom: 10px;
}
.commmentList .describe .support {
  width: 55px;
  height: 28px;
  background: rgba(235, 238, 240, 1);
  border-radius: 14px;
  text-align: center;
  line-height: 26px;
}
.commmentList .describe .support .icon-zan {
  color: #8b9199;
  font-size: 12px;
}
.commmentList .describe .support span {
  font-size: 14px;
  color: rgba(76, 82, 88, 1);
  margin-left: 2px;
}
.commmentList .describe .commentTime {
  font-size: 12px;
  color: rgba(182, 186, 191, 1);
  text-align: right;
  margin-top: -7px;
}
.commmentList .describe .support .active {
  color: #f38622;
}
</style>
