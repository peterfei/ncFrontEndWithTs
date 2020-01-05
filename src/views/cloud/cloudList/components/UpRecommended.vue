<template>
  <div>
    <div class="right-bottom">
      <div class="title">
        <i class="icon iconfont icon-tuijian"></i>
        <span>大咖推荐</span>
      </div>
      <router-link
        v-for="item in recommendList"
        :key="item.id"
        :to="{ path: `/cloud/cloudDetail/${item.id}` }"
        tag="div"
      >
        <div class="bottom-list">
          <div class="picw-list">
            <img :src="item.cover" class="pic" alt="" />
            <div class="info">
              <span class="title">{{ item.title }}</span>
              <span class="num">
                <i class="icon iconfont icon-guankanshu"></i>
                {{ item.study_count }}人参加
              </span>
            </div>
          </div>
          <div class="bottom-btn" v-if="item['lecturer'].length > 0">
            <span>{{ item['lecturer'][0]['realname'] }}</span>
            <span class="line">|</span>
            <span>{{ item['lecturer'][0]['school_name'] }}</span>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model } from 'vue-property-decorator'
@Component({})
export default class urRecommend extends Vue {
  @Prop({ default: [] }) recommendList!: Array<object>
}
</script>

<style lang="scss" scoped>
.right-bottom {
  margin-top: 20px;
  background-color: #fff;
  padding: 30px 20px 0px 20px;
  margin-bottom: 20px;
  border-radius: 5px;
}
.right-bottom .title {
  padding-bottom: 6px;
}
.right-bottom .title > span {
  color: #242b33;
  font-weight: bold;
}
.right-bottom .bottom-list {
  border-bottom: 1px solid #f2f2f2;
  padding-bottom: 20px;
}
.picw-list {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
}
.picw-list .pic {
  margin-right: 10px;
}
.picw-list .pic img {
  border-radius: 5px;
}
.picw-list .info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
}
.picw-list .info .title {
  font-size: 14px;
  color: #242b33;
  line-height: 22px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.picw-list .info .num {
  font-size: 12px;
  color: #8a9199;
}
.icon-tuijian {
  color: #40c78d;
  margin-right: 7px;
}
.picw-list .pic {
  margin-right: 10px;
  border-radius: 5px;
  width: 100px;
  height: 75px;
  display: inline-block;
}
.picw-list .info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.picw-list .info .title {
  font-size: 14px;
  color: #242b33;
  line-height: 22px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.picw-list .info .num {
  font-size: 12px;
  color: #8a9199;
}
.right-bottom .bottom-btn {
  background-color: #fafafa;
  width: 200px;
  height: 24px;
  border-radius: 12px;
  text-align: center;
  margin-top: 10px;
}
.right-bottom .bottom-btn span {
  font-size: 12px;
  color: #4c5359;
}
.right-bottom .bottom-btn .line {
  padding: 0px 13px;
}
</style>
