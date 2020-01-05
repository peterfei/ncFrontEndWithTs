<template>
  <div>
    <div v-if="uploaderType === 'av'">
      <div class="av-card">
        <el-button class="file-select" size="small" type="primary">
          <input type="file" id="fileUpload" @change="selectFile($event)" />
          选择文件
        </el-button>
      </div>
      <div v-for="item in AudioVideoList" :key="item.id">
        <audio-video-uploader :file="item.fileInfo"></audio-video-uploader>
      </div>
    </div>
    <div v-else class="at-card">
      <attachments-uploader @uploadSucess="uploadSucess"></attachments-uploader>
    </div>
  </div>
</template>

<script>
import AudioVideoUploader from './AudioVideoUploader.vue'
import AttachmentsUploader from './AttachmentsUploader.vue'

export default {
  name: 'ResourseUploader',
  props: ['uploaderType'],
  components: {
    AudioVideoUploader,
    AttachmentsUploader
  },
  data() {
    return {
      file: {}, // 选择的文件
      AudioVideoList: [] // 文件列表
    }
  },
  methods: {
    selectFile(e) {
      this.file = e.target.files[0] || null
      this.AudioVideoList.push({ fileInfo: this.file })
    },
    uploadSucess(d) {
      this.$emit('uploadSucess', d)
    }
  }
}
</script>

<style lang="scss" scoped>
.av-card,
.at-card {
  margin: 20px 0;
}
.file-select {
  position: relative;
  left: 0;
  top: 0;
  & input {
    position: absolute;
    opacity: 0;
    width: 40px;
    height: 30px;
    left: 0;
    top: 0;
  }
}
</style>
