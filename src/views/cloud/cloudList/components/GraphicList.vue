<template>
  <div class="tab">
    <div class="list-box" v-if="moocList.length > 0">
      <router-link
        class="tab-content"
        v-for="item in moocList"
        :key="item.id"
        :to="{ path: `/cloud/cloudDetail/packages/${item.id}` }"
        tag="div"
      >
        <img
          :src="item.cover ? item.cover : 'http://placehold.it/200x150'"
          alt=""
          class="cover-img"
        />
        <div class="right-content">
          <div class="tit-con">
            <span class="title">{{ item.title }}</span>
            <div class="star ing" v-if="item.status == 0">
              <i class="icon iconfont icon-shijian"></i>
              <!-- <span>{{ item.status==0 ? '未开始': (item.status==1 ? '进行中' : '已结束') }}</span> -->
              <span>未开始</span>
            </div>
            <!-- 进行中 -->
            <div class="star waiting" v-else-if="item.status == 1">
              <i class="icon iconfont icon-shijian"></i>
              <span>进行中</span>
            </div>

            <!-- 已结束 -->
            <div class="star unstar" v-else>
              <i class="icon iconfont icon-shijian"></i>
              <span>已结束</span>
            </div>
          </div>
          <div class="ava-con" v-if="item['lecturer'].length > 0">
            <img :src="item['lecturer'][0]['avatar']" alt="" class="ava" />
            <span>{{ item['lecturer'][0]['realname'] }}</span>
            <span class="line">|</span>
            <span>{{ item['lecturer'][0]['school_name'] }}</span>
          </div>
          <p class="intro">{{ item.description }}</p>
          <div class="last-con">
            <span class="free" v-if="item.latest_price == 0">免费</span>
            <span class="price" v-else>￥{{ item.latest_price }}</span>
            <span class="num">
              <i class="icon iconfont icon-guankanshu"></i>
              {{ item.study_count }}人参加
            </span>
          </div>
        </div>
      </router-link>
    </div>
    <div v-else>
      <h6 class="no-content">暂无信息</h6>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({})
export default class GraphicList extends Vue {
  @Prop({ default: () => [] }) moocList!: Array<object> //子组件接收到父组件传过来的数组
  @Prop({ default: () => ({}) }) pageMeta!: object
  handleCurrentChange(val: any) {
    console.log(`==========`, val)
    this.$emit('handleCurrentChange', val)
  }
}
</script>

<style lang="scss" scoped>
.tab {
  width: 100%;
}
.no-content {
  width: 100%;
  margin: 100px 0;
  text-align: center;
}
.right-content {
  margin-top: -3px;
}
.tab-content {
  background-color: #fff;
  padding: 20px 22px 20px 19px;
  border-bottom: 1px solid #f2f2f2;
  display: flex;
  flex-direction: row;
}
.tab-content:last-child {
  margin-bottom: 20px;
}

.tab-content .cover-img {
  width: 200px;
  display: inline-block;
  height: 150px;
  margin-right: 14px;
}
.tab-content .tit-con {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.tab-content .tit-con .star {
  font-size: 12px;
  color: #fff;
  background-size: cover;
  background-repeat: no-repeat;
  width: 68px;
  height: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.ing {
  background: url('./../../../../assets/image/bg/star.png');
}
.waiting {
  background: url('./../../../../assets/image/bg/wait.png');
}
.unstar {
  background: url('./../../../../assets/image/bg/unstar.png');
}
.tab-content .tit-con .star > span {
  margin-left: 2px;
}
.icon-shijian {
  font-size: 12px;
  margin-right: 2px;
  margin-left: 2px;
}
.tab-content .tit-con .title {
  font-size: 20px;
  font-weight: bold;
  color: #0a121a;
  margin-right: 7px;
}
.tab-content .ava-con {
  margin-top: 14px;
}
.tab-content .ava-con span {
  font-size: 12px;
  color: #4c5359;
}
.tab-content .ava-con .line {
  padding: 0px 13px;
}
.tab-content .ava-con .ava {
  border-radius: 50%;
  width: 20px;
  height: 20px;
  margin-right: 8px;
}
.tab-content .intro {
  font-size: 12px;
  color: #8a9199;
  line-height: 20px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.tab-content .last-con span {
  font-size: 12px;
}
.tab-content .last-con .price {
  color: #4c5359;
  margin-right: 20px;
}
.tab-content .last-con .free {
  color: #40c78d;
  margin-right: 20px;
}
.tab-content .last-con .num {
  color: #8a9199;
}
.icon-guankanshu {
  font-size: 10px;
}
</style>
