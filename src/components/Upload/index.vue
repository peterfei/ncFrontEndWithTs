<template>
  <el-upload
    class="ibd-upload"
    :action="action"
    v-bind="$attrs"
    v-on="$listeners"
    :http-request="uploader"
  >
    <slot></slot>
    <template slot="trigger" v-if="$slots.trigger">
      <slot name="trigger"></slot>
    </template>
    <template slot="tip" v-if="$slots.tip">
      <slot name="tip"></slot>
    </template>
  </el-upload>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import Utils from '@/utils/utils'
import {
  getUploadPolicy,
  postUploadFile,
  postAttachmentCallback
} from '@/api/commons'

@Component({
  name: 'IbdUpload'
})
export default class Upload extends Vue {
  @Prop({ type: String, default: 'fakeactioin' }) action: string
  @Prop({ type: Function }) httpRequest: Function

  get uploader() {
    return this.httpRequest || this.defaultUploader
  }

  // 自定义上传方法，以覆盖默认的上传动作
  defaultUploader(params: any) {
    console.log(456, params)
    const extName =
      params.file.name.indexOf('.') !== -1
        ? params.file.name.split('.')[1]
        : undefined
    // 1. 根据文件生成MD5值 params.file
    Utils.getFileMD5(params.file)
      .then(md5 => {
        // 2.获取文件的上传授权
        getUploadPolicy(md5, extName).then((res: any) => {
          console.log('policy', res)
          // 文件已存在的场合
          if (res._id && !res.accessid) {
            // 直接输出上传成功，及文件信息
            console.log('quick upload', res)
          } else {
            postUploadFile(res, params.file)
              .then(ossUrl => {
                console.log('uploaded ::', ossUrl)
                const attachmentType = Utils.getAttachmentType(params.file)
                postAttachmentCallback(params.file, {
                  md5,
                  ossUrl,
                  ...attachmentType
                }).then(resourceInfo => {
                  console.log('resourceInfo', resourceInfo)
                })
              })
              .catch(err => {
                console.log('123', err)
              })
          }
        })
      })
      .catch(err => {
        console.error(err)
      })
  }
}
</script>

<style lang="scss" scoped></style>