<template>
  <div class="i-test">
    <ibd-upload multiple>
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
  handlerUploader() {
    console.log('123')
  }
}
</script>

<style lang="scss" scoped></style>
