<template>
  <div>
    <el-upload
      action="https://jsonplaceholder.typicode.com/posts/"
      list-type="picture-card"
      :auto-upload="false"
    >
      <i
        slot="default"
        class="el-icon-plus"
      ></i>
      <div
        slot="file"
        slot-scope="{file}"
      >
        <img
          class="el-upload-list__item-thumbnail"
          :src="file.url"
          alt=""
        >
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <i class="el-icon-zoom-in">2</i>
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleDownload(file)"
          >
            <i class="el-icon-download">3</i>
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
          >
            <i class="el-icon-delete">4</i>
          </span>
        </span>
      </div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img
        width="100%"
        :src="dialogImageUrl"
        alt=""
      >
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'IbdImageUploader',
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: true,
      disabled: false,
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      console.log('beforeAvatarUpload=', file);
    },
    handleRemove(file) {
      console.log('handleRemove=', file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;

      console.log('handlePictureCardPreview=', file);
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);

      console.log('handleDownload=', file);
    },
  },
};
</script>

<style>
</style>
