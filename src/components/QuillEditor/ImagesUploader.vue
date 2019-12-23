<template>
  <div class="images-uploader">
    <el-dialog
      title="插入图片"
      :visible.sync="dialogVisible"
      width="500px"
    >
      <el-tabs
        v-model="activeTab"
        type="card"
        @tab-click="handleClick"
        :before-leave="changeTabs"
      >
        <el-tab-pane
          label="文件"
          name="first"
        >
          <el-form
            label-position="left"
            label-width="80px"
          >
            <el-form-item label="选择图片">
              <el-upload
                class="upload-demo"
                name="file"
                accept="image/*"
                :action="actionUrl"
                :data="uploadForm"
                list-type="picture-card"
                :show-file-list="false"
                :before-upload="beforeAvatarUpload"
                :on-success="handleAvatarSuccess"
              >
                <!--

          :headers="{Authorization: 'Bearer xxxxxxx', }"
            :on-preview="handleAvatarSuccess"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
                :on-exceed="handleExceed"-->
                <img
                  v-if="imageUrl"
                  :src="imageUrl"
                  class="preview"
                >
                <i
                  v-else
                  class="el-icon-plus avatar-uploader-icon"
                ></i>
              </el-upload>
            </el-form-item>
            <!-- <el-form-item label="图片描述">
              <el-input v-model="desc"></el-input>
            </el-form-item>-->
          </el-form>
        </el-tab-pane>
        <el-tab-pane
          label="URL"
          name="second"
        >
          <el-form
            label-position="left"
            label-width="80px"
          >
            <el-form-item label="图片地址">
              <el-input v-model="imageRemoteUrl"></el-input>
            </el-form-item>
            <!-- <el-form-item label="图片描述">
              <el-input v-model="desc"></el-input>
            </el-form-item>-->
          </el-form>
        </el-tab-pane>
        <el-tab-pane
          label="多图上传"
          name="mutiPics"
        >
          <el-form
            label-position="left"
            label-width="80px"
          >
            <el-form-item label="添加图片">
              <el-upload
                class="upload-demo"
                name="file"
                :action="actionUrl"
                :data="uploadForm"
                :file-list="fileList2"
                accept="image/*"
                multiple
                :before-upload="beforeAvatarUpload"
                :on-success="handleAvatarSuccess"
              >
                <el-button
                  size="mini"
                  type="primary"
                >点击上传</el-button>
                <div
                  slot="tip"
                  class="el-upload__tip"
                >只能上传jpg/png文件，且不超过2mb</div>
              </el-upload>
            </el-form-item>
            <!-- <el-form-item label="图片描述">
              <el-input v-model="desc"></el-input>
            </el-form-item>-->
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <div class="footer-ctl">
        <el-button
          type="primary"
          size="mini"
          @click="submit"
        >确认</el-button>
        <el-button
          size="mini"
          @click="cancle"
        >取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'; // TODO:should use the global Axios configured Object.

export default {
  name: 'ImagesUploader',
  data() {
    return {
      actionUrl: '',
      fileSucessList: [],
      fileList2: [],
      dialogVisible: false,
      activeTab: 'first',
      imageUrl: '',
      imageRemoteUrl: '',
      desc: '',
      uploadForm: null,
      dir: '',
    };
  },
  watch: {
    dialogVisible(newVal) {
      if (newVal === true) {
        const url = 'http://dev.nc.com/api/upload_policy';
        axios.get(url).then((res) => {
          const d = res.data || res;
          this.dir = d.dir;
          this.uploadForm = {
            name: '',
            policy: d.policy,
            // callback: d.callback,
            OSSAccessKeyId: d.accessid,
            success_action_status: '200', // 让服务端返回200，不设置则默认返回204
            signature: d.signature,
          };
          this.actionUrl = d.host;
        });
      }
    },
  },
  methods: {
    // 打开对话框
    open() {
      this.dialogVisible = true;
    },
    // 清空值
    reset() {
      this.imageUrl = '';
      this.imageRemoteUrl = '';
      // this.desc = '';
      this.fileList2 = [];
      this.fileSucessList = [];
    },
    // tab切换事件
    changeTabs() {
      this.reset();
    },
    // 点击取消按钮
    cancle() {
      this.reset();
      this.activeTab = 'first';
      this.dialogVisible = false;
    },
    // 点击确认按钮
    submit() {
      if (this.imageRemoteUrl) {
        this.fileSucessList.push({ name: '', href: this.imageRemoteUrl });
      }
      this.$emit('selected', this.fileSucessList);
      this.dialogVisible = false;
      this.activeTab = 'first';
      this.reset();
    },
    // when tab click
    handleClick(cc) {
      console.log('tab click', cc);
    },
    handleAvatarSuccess(res, file) {
      console.log();
      this.imageUrl = URL.createObjectURL(file.raw);
      // this.desc = file.name;
      // this.imageRemoteUrl = res.imgUrl;
      this.fileSucessList.push({
        name: file.name,
        href: `${this.actionUrl}/${this.dir}${file.name}`,
      });
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 200;
      if (!isJPG) {
        this.$message.error('上传图片只能为JPG格式');
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过2MB！');
      }
      console.log('before', file.name);
      this.uploadForm.name = file.name;
      this.uploadForm.key = this.dir + file.name;
      return isJPG && isLt2M;
    },
  },
};
</script>

<style lang="scss" scoped>
.footer-ctl {
  padding: 20px 0;
}

.preview {
  width: 146px;
  vertical-align: middle;
}
</style>
