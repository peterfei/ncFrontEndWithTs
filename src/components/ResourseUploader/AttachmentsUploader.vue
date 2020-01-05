<template>
  <div class="ele-uploader">
    <el-upload
      class="upload-demo"
      ref="upload"
      :action="actionUrl"
      :data="postData"
      :on-change="fileChange"
      :on-remove="handleRemove"
      :on-success="handSuccess"
      :auto-upload="false"
      :list-type="listType"
      :file-list="fileList"
      :before-upload="beforeUpload"
    >
      <el-button
        slot="trigger"
        size="small"
        type="primary"
      >选取文件</el-button>
      <el-button
        style="margin-left: 10px;"
        size="small"
        type="success"
        @click="authUpload"
      >上传到服务器</el-button>
      <div
        slot="tip"
        class="el-upload__tip"
      >且不超过500M</div>
    </el-upload>
  </div>
</template>
<script>
import ResourseUploader from '@/util/ResourseUploader';
import Utils from '@/util/utils';

export default {
  data() {
    return {
      actionUrl: 'https://ibodao-nc-test.oss-cn-hangzhou.aliyuncs.com/', // 上传url
      postData: {}, // 发送的参数
      fileList: [],
      listType: 'text',
      resourceType: '2', // 资源类型 2=>作业 3=>测验 4=>资料,如果有别的场景请提出
      authPolicyData: {}, // 授权返回信息
      resourceData: [], // 文件在资源库中的id
    };
  },
  methods: {
    beforeUpload(file) {
      return new Promise((r, t) => {
        // 获取阿里云数据库授权
        ResourseUploader.getAuthPolicy(file).then(async (authPolicy) => {
          this.authPolicyData = authPolicy;
          if (authPolicy.id !== undefined) {
            this.fileList.push({
              name: file.name,
              url: authPolicy.oss_full_url,
            });
            // 已存在
            const postAttachmentsObj = {
              title: this.authPolicyData.title,
              oss_url: this.authPolicyData.oss_url,
              type: this.authPolicyData.type,
              ext: this.authPolicyData.ext,
              file_md5: this.authPolicyData.md5Firle,
              size: this.authPolicyData.size,
              // is_private: null, // 是否私有
              resource_type: this.resourceType, // 资源类型 2=>作业 3=>测验 4=>资料
            };
            // 上传本地资源库
            const rId = await ResourseUploader.postAssattachmentsToIbd(
              postAttachmentsObj,
            );
            this.resourceData.push({
              name: this.authPolicyData.title,
              resourceId: rId,
            });
            this.$emit('uploadSucess', this.resourceData);
            t(new Error('文件已存在'));
          } else {
            this.actionUrl = authPolicy.host;
            this.postData.name = file.name;
            this.postData.key = authPolicy.dir + file.name;
            this.postData.policy = authPolicy.policy;
            this.postData.OSSAccessKeyId = authPolicy.accessid;
            this.postData.success_action_status = '200';
            this.postData.signature = authPolicy.signature;
            r(true);
          }
        });
      });
    },
    // 上传文件
    async authUpload() {
      this.$refs.upload.submit();
    },
    // 上传成功
    async handSuccess(response, file) {
      console.log('上传成功file = ', file);
      // 不存在
      const postAttachmentsObj = {
        title: file.name,
        oss_url: this.authPolicyData.dir + file.name,
        type: file.raw.type,
        ext: file.name.substr(file.name.lastIndexOf('.') + 1, file.name.length),
        file_md5: this.authPolicyData.md5Firle,
        size: file.size,
        // is_private: null, // 是否私有
        resource_type: this.resourceType, // 资源类型 2=>作业 3=>测验 4=>资料
      };
      // 上传本地资源库
      const rId = await ResourseUploader.postAssattachmentsToIbd(
        postAttachmentsObj,
      );
      this.resourceData.push({
        name: file.name,
        resourceId: rId,
      });
      this.$emit('uploadSucess', this.resourceData);
      console.log('this.resourceData-hhh=', this.resourceData);
    },
    // 删除文件
    handleRemove(file) {
      if (!file) return;
      const len = this.resourceData.findIndex(rec => rec.name === file.name);
      if (len >= 0) {
        this.resourceData.splice(len, 1);
      }
    },
    // 选择文件
    async fileChange(file) {
      try {
        await Utils.getTheFileType(file.raw);
        // r(true);
      } catch (err) {
        this.$notify.error({
          title: '错误提示',
          message: `${err}这个格式不支持`,
        });
        // t(new Error('文件已存在'));
      }
      // return new Promise(async (r, t) => {

      // });

      // 格式判断
    },
  },
};
</script>

<style  lang="scss" scoped>
</style>
