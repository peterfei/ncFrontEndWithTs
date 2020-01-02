<template>
  <div class="upload-box">
    <div class="username">
      <el-input placeholder="真实姓名" v-model="nameInput"></el-input>
    </div>
    <div class="img-upload">
      <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        :file-list="fileList"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">
          请上传教师资格认证资料，png、jpg、bmp、jpeg格式。
        </div>
      </el-upload>
    </div>
    <div class="next-block">
      <el-row>
        <el-col :span="12">
          <el-button class="prev-btn" @click="toPrevtPage">
            上一步
          </el-button>
        </el-col>
        <el-col :span="12">
          <el-button
            class="finish-btn"
            :class="{ active: canNextBoolean == true }"
            @click="toNextPage"
          >
            完成
          </el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class uploadInfo extends Vue {
  public canNextBoolean: boolean = true
  public nameInput: string = '' //真实姓名
  public fileList: Array<any> = []
  // 判断是否可以下一步
  canNext() {
    this.canNextBoolean = true
  }
  // 点击上一页
  toPrevtPage() {}

  // 点击前往下一页
  toNextPage() {
    if (this.canNextBoolean == true) {
      this.$router.push({
        path: `/reg/`,
        query: {
          type: 'complete'
        }
      })
    }
  }

  handleRemove(file: any, fileList: any) {
    console.log(file, fileList)
  }
  handlePreview(file: any) {
    console.log(file)
  }
  handleExceed(files: any, fileList: any) {
    this.$message.warning(
      `当前限制选择 3 个文件，本次选择了 ${
        files.length
      } 个文件，共选择了 ${files.length + fileList.length} 个文件`
    )
  }
  beforeRemove(file: any, fileList: any) {
    return this.$confirm(`确定移除 ${file.name}？`)
  }
}
</script>

<style lang="scss" scoped>
$orange-color: #ff783c;
$orangeHoverColor: #ff6520;
$gray: #edeeef;
.upload-box {
  .username {
    margin-bottom: 20px;
    ::v-deep .el-input__inner {
      height: 44px;
    }
  }
  .img-upload {
    ::v-deep .el-upload {
      button {
        height: 40px;
        background: #67c23a;
        border: none;
        width: 100px;
        &:hover {
          background: #69b444;
          transition: 0.3s;
        }
      }
    }
    ::v-deep .el-upload__tip {
      font-size: 12px;
      color: #909499;
      margin-top: 12px;
    }
  }
  .next-block {
    position: absolute;
    bottom: 30px;
    width: 344px;
    ::v-deep .el-button {
      width: 162px;
      height: 44px;
      background: $gray;
      border: none;
      color: #909499;
    }

    ::v-deep .el-col {
      width: 162px;
      .prev-btn {
        background: $orange-color;
        color: #fff;
        &:hover {
          background: $orangeHoverColor;
        }
      }
      .finish-btn {
        cursor: not-allowed;
      }
    }
    ::v-deep .el-col:nth-child(1) {
      margin-right: 20px;
    }
  }
}
</style>
