<template>
  <div>
    <div class="right_moddle">
      <div class="title">
        <i class="icon iconfont icon-renqiiconx"></i>
        <span>人气爆棚</span>
      </div>
      <div class="picw-con">
        <router-link
          v-for="list in popularityList"
          :key="list.id"
          :to="{ path: `/cloud/cloudDetail/${list.id}` }"
          tag="div"
        >
          <div class="aaaa">
            <div class="imgBox">
              <div class="picw-list">
                <img :src="list.cover" class="pic" alt="" />
                <div class="info">
                  <span class="title">{{ list.title }}</span>
                  <span class="num">
                    <i class="icon iconfont icon-guankanshu"></i>
                    {{ list.study_count }}人参加
                  </span>
                </div>
              </div>
            </div>
            <div class="text-list mb20 clearfix">
              <span class="number green">{{ list.id }}</span>
              <span class="text">{{ list.title }}</span>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model } from 'vue-property-decorator'
@Component({})
export default class ExtraordinaryPopularity extends Vue {
  @Prop({ default: [] }) popularityList!: Array<object>
  seen: false
  hide: true
  current: 0
  // enter(index: any) {
  //   console.log()
  //   this.current = index
  //   // this.seen = true
  //   // this.hide = false
  // }
  // leave() {
  //   this.seen = false
  //   this.hide = true
  // }
}
// export default {
//   name: 'ExtraordinaryPopularity',
//   props: {
//     popularityList: {}
//   },
//   data() {
//     return {
//       seen: false,
//       hide: true,
//       current: 0
//     }
//   },
//   methods: {
//     enter(index) {
//       this.current = index
//       console.log(index)
//       this.seen = true
//       this.hide = false
//     },
//     leave() {
//       this.seen = false
//       this.hide = true
//     }
//   }
// }
</script>

<style lang="scss" scoped>
.aaaa {
  .imgBox {
    height: 0px;
    overflow: hidden;
    transition: all 0.3s;
    margin-bottom: 20px;
  }
  .text-list {
    overflow: hidden;
    transition: all 0.3s;
    height: 30px;
  }
  &:hover {
    .imgBox {
      height: 76px;
    }
    .text-list {
      height: 0px;
    }
  }
}
.picw-con > .aaaa:first-child {
  .imgBox {
    display: block !important;
    height: 76px !important;
  }
  .text-list {
    display: none !important;
    height: 0px !important;
  }
}

.right_moddle {
  background: #fff;
  padding: 30px 20px;
  border-radius: 5px;
}
.right_moddle > .title {
  margin-bottom: 30px;
}
.right_moddle .picw-con ul {
  padding: 0px;
  margin: 0px;
}
.icon-renqiiconx {
  color: #ff783c;
  margin-right: 7px;
}
.icon-tuijian {
  color: #40c78d;
  margin-right: 7px;
}
.right_moddle .picw-list,
.bottom-list .picw-list {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.right_moddle .picw-list:first-child,
.bottom-list .picw-list:first-child {
  margin-top: 0px;
}
.picw-list .pic {
  margin-right: 10px;
  width: 100px;
  height: 75px;
  background: #eee;
  border-radius: 5px;
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
.right_moddle .title > span {
  color: #242b33;
  font-weight: bold;
}
.picw-list .info .num {
  font-size: 12px;
  color: #8a9199;
}
.right_moddle .picw-list .pic {
  margin-right: 10px;
}
.right_moddle .picw-list .pic img {
  border-radius: 5px;
}
.right_moddle .picw-list .info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.right_moddle .picw-list .info .title {
  font-size: 14px;
  color: #242b33;
  line-height: 22px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.right_moddle .picw-list .info .num {
  font-size: 12px;
  color: #8a9199;
}
.right_moddle .text-list {
  // margin-bottom: 10px;
}
.text-list:last-child {
  margin-bottom: 0px;
}
.mb20 {
  margin-bottom: 20px;
}
.right_moddle .text-list .number {
  border-radius: 3px;
  display: inline-block;
  color: #fff;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  font-weight: bold;
  margin-right: 10px;
  float: left;
  font-size: 14px;
}
.green {
  background-color: #42a23a;
}
.blue {
  background-color: #3cb0e0;
}
.yellow {
  background-color: #ffa628;
}
.gray {
  background-color: #b7b7b7;
}
.text {
  color: #242b33;
  font-size: 14px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  float: left;
  width: 230px;
}
</style>
