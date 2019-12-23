<template>
  <div class="tab">
    <div class="listBox">
      <router-link
        class="tab_content"
        v-for="item in moocList"
        :key="item.id"
        :to="{
          path: `/cloud/cloudDetail/${
            item.last_issue ? item.last_issue.id : ''
          }/packages/${item.id}`
        }"
        tag="div"
      >
        <img
          :src="item.cover ? item.cover : 'http://placehold.it/200x150'"
          alt=""
          class="cover-img"
        />
        <div class="right_content">
          <div class="titcon">
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
          <div class="avaCon" v-if="item['lecturer'].length > 0">
            <img :src="item['lecturer'][0]['avatar']" alt="" class="ava" />
            <span>{{ item['lecturer'][0]['realname'] }}</span>
            <span class="line">|</span>
            <span>{{ item['lecturer'][0]['school_name'] }}</span>
          </div>
          <p class="intro">{{ item.description }}</p>
          <div class="lastCon">
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
    <!-- <div v-else>
      <h6 class="no-content">暂无信息</h6>
    </div> -->
    <div class="block ">
      <el-pagination
        layout="prev, pager, next"
        :total="pageMeta.total"
        :page-size="parseInt(pageMeta.per_page, 10)"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script lang="ts">
// @Prop({ default: [] }) carouselLists!: Array<object>
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({})
export default class GraphicList extends Vue {
  @Prop({ default: [] }) moocList!: Array<object>
  @Prop({ default: [] }) pageMeta!: Array<object>
  numl(val: any) {
    return `${val}`
  }
  handleCurrentChange(val: any) {
    console.log(val)
    this.$emit('handleCurrentChange', val)
  }
}
// export default {
//   name: 'GraphicList',
//   props: {
//     moocList: {},
//     pageMeta: {}
//   },
//   data() {
//     return {}
//   },
//   filters: {
//     numl(val) {
//       return `${val}`
//     }
//   },
//   methods: {
//     handleCurrentChange(val) {
//       console.log(val)
//       this.$emit('handleCurrentChange', val)
//     }
//   }
// }
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
.right_content {
  margin-top: -3px;
}
.tab_content {
  background-color: #fff;
  padding: 20px 22px 20px 19px;
  border-bottom: 1px solid #f2f2f2;
  display: flex;
  flex-direction: row;
}
.tab_content:last-child {
  margin-bottom: 20px;
}

.tab_content .cover-img {
  width: 200px;
  display: inline-block;
  height: 150px;
  margin-right: 14px;
}
.tab_content .titcon {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.tab_content .titcon .star {
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
.tab_content .titcon .star > span {
  margin-left: 2px;
}
.icon-shijian {
  font-size: 12px;
  margin-right: 2px;
  margin-left: 2px;
}
.tab_content .titcon .title {
  font-size: 20px;
  font-weight: bold;
  color: #0a121a;
  margin-right: 7px;
}
.tab_content .avaCon {
  margin-top: 14px;
}
.tab_content .avaCon span {
  font-size: 12px;
  color: #4c5359;
}
.tab_content .avaCon .line {
  padding: 0px 13px;
}
.tab_content .avaCon .ava {
  border-radius: 50%;
  width: 20px;
  height: 20px;
  margin-right: 8px;
}
.tab_content .intro {
  font-size: 12px;
  color: #8a9199;
  line-height: 20px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.tab_content .lastCon span {
  font-size: 12px;
}
.tab_content .lastCon .price {
  color: #4c5359;
  margin-right: 20px;
}
.tab_content .lastCon .free {
  color: #40c78d;
  margin-right: 20px;
}
.tab_content .lastCon .num {
  color: #8a9199;
}
.icon-guankanshu {
  font-size: 10px;
}
.page-block {
  background: rgba(244, 244, 244, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 50px auto 100px;
  button {
    background: rgba(244, 244, 244, 1);
    background-color: rgba(244, 244, 244, 1) !important;
  }
  li {
    background: rgba(244, 244, 244, 1);
  }
}
</style>
