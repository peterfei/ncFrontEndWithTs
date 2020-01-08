<template>
  <div style="width:100%;background:#f7f8fa">
    <div class="banner">
      <detail-banner
        :packageTitle="packageTitle"
        :packageIntro="packageIntro"
        :packageUpdate="packageUpdate"
        :packageEducation="packageEducation"
      ></detail-banner>
    </div>
  </div>
</template>

<script lang="ts">
import DetailBanner from './components/DetailBanner.vue'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { PackageDetail } from '@/api/resource'

@Component({
  components: { DetailBanner }
})
export default class ResourceDetail extends Vue {
  public packageId: any //资源包id
  public packageTitle: string = '' //资源包标题
  public packageIntro: string = '' //资源包简介
  public packageUpdate: string = '' //资源包更新时间
  public packageEducation: string = '' //资源包适用等级
  created() {
    this.packageId = this.$route.params.id
    this.getPackageDetail()
  }
  getPackageDetail() {
    PackageDetail.getDetail(this.packageId).then((res: any) => {
      console.log('res=', res)
      this.packageTitle = res.name
      this.packageIntro = res.intro
      this.packageUpdate = res.updated_at
      this.packageEducation = res.education
    })
  }
}
</script>

<style lang="scss" scoped>
body {
  background: #ffffff;
}
.banner {
  width: 100%;
  overflow: hidden;
  height: 220px;
  position: relative;
}

.content-block {
  position: relative;
  margin-top: -25px;
  margin-bottom: 120px;
}

.types-block {
  border-bottom: 1px solid #ebeff3;
  padding-bottom: 35px;
  margin-bottom: 30px;
  .types {
    width: 610px;
    display: flex;
    justify-content: space-evenly;
    margin: 0 auto;
    .active {
      color: #0a121a;
      border-bottom: 2px solid #0a121a;
      padding-bottom: 10px;
    }
  }
  .type-item {
    font-size: 16px;
    position: relative;
    font-weight: bold;
    color: rgba(176, 180, 185, 1);
    display: inline-block;
    cursor: pointer;
    .tag {
      color: #8b9199;
      font-size: 12px;
      position: absolute;
      left: 35px;
      top: -5px;
      font-weight: 400;
    }
  }
}
.detail-content {
  display: flex;
  justify-content: space-between;
  .left-content {
    width: 840px;
    margin-right: 40px;
  }
  .right-content {
    .title {
      font-size: 16px;
      font-weight: bold;
      color: rgba(7, 17, 27, 1);
      margin-bottom: 20px;
    }
    .author-date {
      text-align: center;
    }
  }
}
::v-deep .el-dialog {
  border-radius: 15px;
}
::v-deep .el-dialog__title {
  font-weight: bold;
  font-size: 14px;
  color: #4c5258;
}
::v-deep .el-dialog__body {
  .head-info {
    border-bottom: 1px solid #e7e7e7;
    padding-bottom: 22px;
    .title {
      font-size: 16px;
      font-weight: bold;
      color: rgba(76, 82, 88, 1);
      text-align: center;
      margin-bottom: 15px;
    }
    .author-date {
      text-align: center;
      .item:last-of-type {
        border-right: none;
      }
      .item {
        color: #8b9199;
        font-size: 12px;
        margin-right: 14px;
        padding-right: 14px;
        border-right: 1px solid #e7e7e7;
      }
    }
    .nums {
      font-size: 12px;
      margin-top: 20px;
      color: #8b9199;
      .scores {
        text-align: right;
        span {
          color: #ff783c;
        }
      }
    }
  }
  .content-body {
    font-size: 14px;
    color: #4c5258;
    padding-top: 20px;
    label {
      width: 64px;
      margin-right: 16px;
    }
  }
  .task-head {
    .title {
      margin-bottom: 12px;
    }
  }
  .task-body {
    .el-row {
      margin-bottom: 12px;
    }
    .label-title {
      width: 70px;
      margin-right: 8px;
    }
    .task-content {
      line-height: 22px;
    }
  }
  .test-body {
    max-height: 490px;
    overflow-y: auto;
    padding-top: 26px;
    .item-box {
      border-bottom: 1px solid #e7e7e7;
      margin-bottom: 12px;
      .score {
        margin-bottom: 10px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(139, 145, 153, 1);
      }
      .title {
        font-size: 16px;
        color: #4c5258;
        margin-bottom: 22px;
        padding-left: 12px;
        line-height: 24px;
      }
      .options {
        padding-left: 12px;
        p {
          margin-top: 0;
          margin-bottom: 12px;
          color: #4c5258;
          font-size: 14px;
        }
      }
    }
  }
}
</style>
