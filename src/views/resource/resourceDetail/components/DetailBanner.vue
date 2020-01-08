<template>
  <div class="head">
    <div class="bg-img"></div>
    <div class="bg-jianbian"></div>

    <div class="content w-1200">
      <!-- 标题及描述 -->
      <div class="title-describe">
        <div class="title word-spot">
          {{ packageTitle }}
        </div>
        <div class="date-level">
          <span class="level">{{ packageEducation | eduFormat }}</span>
          <span class="date">更新时间：{{ packageUpdate | dataFormat }}</span>
        </div>
        <div class="describe word-spot-2">
          {{ packageIntro }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { mockResPackFilter } from '@/mocks/index'
import PackageItem from './components/PackageItem.vue'
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { PackageDetail } from '@/api/resource'

@Component({
  components: { DetailBanner },
  filters: {
    // 更新时间格式
    dataFormat(data: any) {
      const dt = new Date(data)
      const y = dt.getFullYear()
      const m = dt.getMonth() + 1
      const d = dt.getDate()
      return `${y}-${m}-${d}`
    },
    // 教育层级格式
    eduFormat(val: number) {
      if (val == 0) {
        return '其他'
      } else if (val == 1) {
        return '中职'
      } else if (val == 2) {
        return '高职'
      } else if (val == 3) {
        return '本科及以上'
      }
    }
  }
})
export default class DetailBanner extends Vue {
  @Prop({ default: '' }) packageTitle: string
  @Prop({ default: '' }) packageIntro: string
  @Prop({ default: '' }) packageUpdate: string
  @Prop({ default: '' }) packageEducation: string
}
</script>

<style lang="scss" scoped>
.head {
  height: 220px;
  width: 100%;
  overflow: hidden;
  .bg-img {
    width: 100%;
    height: 100%;
    background: url('../../../../../public/image/bg/1.jpg');
    filter: blur(20px);
    background-size: cover;
    position: absolute;
  }
  .bg-jianbian {
    background: -webkit-gradient(
      linear,
      left top,
      right top,
      from(rgba(0, 0, 0, 0.5)),
      to(rgba(0, 0, 0, 0.1))
    );
    background: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.5),
      rgba(0, 0, 0, 0.1)
    );
    height: 220px;
    width: 100%;
    position: absolute;
    z-index: 1;
  }
  .content {
    position: relative;
    z-index: 999;
    margin-top: 42px;

    .title-describe {
      max-width: 740px;
      margin: 0 auto;
      .title {
        text-align: center;
        font-size: 32px;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        margin-bottom: 12px;
      }
      .date-level {
        text-align: center;
        color: #fff;
        font-size: 14px;
        margin-bottom: 14px;
        height: 20px;
        .level {
          margin-right: 20px;
        }
      }
      .describe {
        font-size: 12px;
        font-weight: 300;
        color: rgba(255, 255, 255, 1);
        line-height: 24px;
        opacity: 0.8;
      }
    }
  }
}
</style>
