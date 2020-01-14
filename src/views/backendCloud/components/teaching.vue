<template>
  <div class="teaching">
    <div class="title">教学团队</div>
    <div class="teaching-content">
      <div class="item">
        <div class="item-title">首席讲师(课程负责人)</div>
        <div class="item-photo">
          <img :src="photo" alt="" />
          <div class="photo-name">周涵</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
@Component
export default class Teaching extends Vue {
  photo: string = '/image/bg/teaching.png'
  mounted() {
    console.log(`====================`)
  }
}
</script>
<style lang="scss" scoped>
.teaching {
  flex: 4;
  margin-left: 10px;
  .title {
    padding-bottom: 15px;
  }
  .teaching-content {
    padding-bottom: 15px;
    background-color: white;
    .item-title {
      margin: 15px;
    }
    .item-photo {
      margin: 15px;
      width: 84px;
      // height: 88px;
      background: rgba(247, 248, 250, 1);
      border-radius: 3px;
      display: flex;
      flex-direction: column;
      align-items: center;
      & > img {
        padding: 10px 17px 27px 17px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      & > .photo-name {
      }
    }
  }
}
</style>
