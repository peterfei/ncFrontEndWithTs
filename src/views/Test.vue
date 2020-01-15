<template>
  <div class="i-test">
    <ibd-upload
      multiple
      :on-success="handlerSuccess"
      :on-progress="handlerProgress"
    >
      <el-button>点击上传</el-button>
      <div slot="tip">
        hahha
      </div>
    </ibd-upload>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'IbdTest',
  components: {
    IbdUpload: () => import('../components/Upload/index.vue')
  }
})
export default class IbdTest extends Vue {
  mounted() {
    window.test = process.env
  }
  handlerUploader() {
    console.log('123')
  }
  handlerSuccess(a: any, b: any, c: any, d: any) {
    console.log('onsuccess', a, b, c, d)
  }
  handlerProgress(e: any, file: File) {
    console.log(e, file)
  }
}
</script>

<style lang="scss" scoped></style>
