<template>
  <div class="teaching-team">
    <div class="title">教学团队</div>
    <div class="author-detail" v-for="item in lecturer" :key="item.id">
      <!-- <div v-if="index<0"> -->
      <img :src="item.avatar" alt="" />
      <div class="intro">
        <div class="author-box">
          <span class="author">{{ item.realname }}</span>
          <span class="teacher">{{ item.role }}</span>
        </div>
        <div class="intrduce">
          {{ item.shorthand }}
        </div>
      </div>
      <!-- </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component({})
export default class TeachingTeam extends Vue {
  @Prop({ default: () => {} }) lecturer!: object
}
// export default {
//   name: 'TeachingTeam',
//   props: {
//     lecturer: {}
//   },
//   data() {
//     return {
//       items: [
//         {
//           src:
//             'http://static.ibodao.com/Public/uploads/images/2019/0215/5c661a4a1f265.png',
//           author: '汤小洋',
//           teacher: '讲师',
//           intro:
//             '管理学博士，副教授，苏州经贸职业技术学院电子商务与物流学院副院长'
//         },
//         {
//           src:
//             'http://static.ibodao.com/Public/uploads/images/2019/0215/5c661a4a1f265.png',
//           author: '汤小洋',
//           teacher: '讲师',
//           intro:
//             '管理学博士，副教授，苏州经贸职业技术学院电子商务与物流学院副院长'
//         }
//       ]
//     }
//   },
//   methods: {}
// }
</script>

<style lang="scss" scoped>
.teaching-team {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #e8e8e8;
}
.teaching-team .title {
  color: #07111b;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
}
.teaching-team .author-detail {
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;
}
.teaching-team .author-detail img {
  width: 48px;
  height: 48px;
  border-radius: 50% !important;
  background-color: #eee;
  margin-right: 10px;
  box-sizing: border-box;
}
.teaching-team .intro {
  flex: 1;
}
.teaching-team .intro .author-box {
  margin-bottom: 8px;
}
.teaching-team .intro .author-box .author {
  color: #555555;
  font-size: 14px;
  font-weight: bold;
}
.teaching-team .intro .author-box .teacher {
  color: #8b9199;
  font-size: 12px;
  margin-left: 10px;
}
.teaching-team .intro .intrduce {
  font-size: 12px;
  color: #4c5258;
  line-height: 22px;
}
</style>
