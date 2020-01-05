<template>
  <div class="audio-video-uploader">
    <div class="file-item">
      <div class="file-detail">
        <span
          class="file-name word-spot"
          :title="fileName"
        >{{fileName}}</span>
        <span class="file-status">状态：{{statusText}}</span>
        <span class="file-progress">
          <el-progress
            :percentage="authProgress"
            :status="progressStatus"
          ></el-progress>
        </span>
      </div>
      <div class="file-cooper">
        <el-button
          size="small"
          type="success"
          @click='authUpload'
          :disabled="uploadDisabled"
        >上传 </el-button>
        <el-button
          size="small"
          type="warning"
          :disabled="pauseDisabled"
          @click='pauseUpload'
        >暂停 </el-button>
        <el-button
          size="small"
          type="primary"
          :disabled="resumeDisabled"
          @click='resumeUpload'
        >回复上传</el-button>
        <el-button
          size="small"
          type="danger"
          :disabled="resumeDisabled"
          @click='resumeUpload'
        >删除</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import ResourseUploader from '@/util/ResourseUploader';
import Utils from '@/util/utils';
import axios from '@/api/axios_base';

export default {
  props: ['file'],
  name: 'AudioVideoUploader',
  data() {
    return {
      fileType: null, // 文件类型，根据文件类型判断是否允许上传
      fileName: null, // 文件名称
      timeout: '', // 请求过期时间
      partSize: '', // 分片大小默认1M，不能小于100K
      parallel: '', // 并行上传分片个数，默认5
      retryCount: '', // 网络原因失败时 3
      retryDuration: '', // 网络原因失败时，重新上传间隔时间，默认为2秒
      region: 'cn-shanghai', // 上传到点播的地域
      userId: '1743939798990987', // 阿里账号ID，必须有值
      // file: null, // 文件
      authProgress: 0, // 进度条
      uploadDisabled: true, // 开始上传按钮状态
      resumeDisabled: true, // 恢复上传按钮状态
      pauseDisabled: true, // 暂停上传按钮状态
      uploader: null, // ali 对象
      statusText: '', // 上传状态
      autographInfo: '', // 授权信息
      resourseId: null, // 资源id
      imgUrl: null, // 图片的路径
      resourceType: '2', // 资源类型 2=>作业 3=>测验 4=>资料,如果有别的场景请提出
      progressStatus: 'text', // 进度条状态
    };
  },
  async mounted() {
    // 格式判断
    try {
      this.fileType = await Utils.getTheFileType(this.file);
      this.fileName = this.file.name;
      // 如果是音视频和附件的类型
      if (this.fileType === 'video' || this.fileType === 'audio') {
        // 音视频和附件的类型
        const userData = '{"Vod":{}}';
        if (this.uploader) {
          this.uploader.stopUpload();
          this.authProgress = 0;
          this.statusText = '';
        }
        this.uploader = this.createUploader();
        this.uploader.addFile(this.file, null, null, null, userData);
        this.uploadDisabled = false; // 开始上传按钮状态
        this.pauseDisabled = true;
        this.resumeDisabled = true;
      } else if (this.fileType === 'image') {
        // 如果是图片类型
        const read = new FileReader();
        read.readAsDataURL(this.file);
        read.onload = () => {
          this.imgUrl = read.result;
          this.uploadDisabled = false; // 开始上传按钮状态
        };
      } else {
        // 附件
        this.uploadDisabled = false; // 开始上传按钮状态
      }
    } catch (err) {
      this.$notify.error({
        title: '错误提示',
        message: `${err}这个格式不支持`,
      });
    }
  },
  methods: {
    async fileChange() {
      // this.file = e.target.files[0] || null;
    },
    // 开始上传
    async authUpload() {
      // 然后调用 startUpload 方法, 开始上传
      // 如果是音视频
      if (this.fileType === 'video' || this.fileType === 'audio') {
        if (this.uploader !== null) {
          // 调用sdk上传
          this.uploader.startUpload();
          this.uploadDisabled = true;
          this.pauseDisabled = false;
        }
      } else {
        // 附件的类型
        // 获取阿里云数据库授权
        const authPolicy = await ResourseUploader.getAuthPolicy(this.file);
        if (authPolicy.policy) {
          const formDataAly = new FormData();
          formDataAly.append('key', authPolicy.dir + this.file.name);
          formDataAly.append('policy', authPolicy.policy);
          formDataAly.append('OSSAccessKeyId', authPolicy.accessid);
          formDataAly.append('success_action_status', 200);
          formDataAly.append('host', authPolicy.host);
          formDataAly.append('signature', authPolicy.signature);
          formDataAly.append('file', this.file);
          // 将文件提到到阿里云数据库
          await ResourseUploader.postFileToAly(formDataAly);
          const postAttachmentsObj = {
            title: this.file.name,
            oss_url: authPolicy.dir + this.file.name,
            type: this.file.type,
            ext: this.file.name.substr(
              this.file.name.lastIndexOf('.') + 1,
              this.file.name.length,
            ),
            file_md5: authPolicy.md5Firle,
            size: this.file.size,
            // is_private: null, // 是否私有
            resource_type: this.resourceType, // 资源类型 2=>作业 3=>测验 4=>资料
          };
          const obj = await ResourseUploader.postAssattachmentsToIbd(
            postAttachmentsObj,
          );

          console.log('data=', obj);
        }
      }
    },
    // 暂停上传
    pauseUpload() {
      if (this.uploader !== null) {
        this.uploader.stopUpload();
        this.resumeDisabled = false;
        this.pauseDisabled = true;
      }
    },
    // 恢复上传
    resumeUpload() {
      if (this.uploader !== null) {
        this.uploader.startUpload();
        this.resumeDisabled = true;
        this.pauseDisabled = false;
      }
    },
    // 创建uploader
    createUploader() {
      const self = this;
      // eslint-disable-next-line
      const uploader = new AliyunUpload.Vod({
        timeout: self.timeout || 60000,
        partSize: self.partSize || 1048576,
        parallel: self.parallel || 5,
        retryCount: self.retryCount || 3,
        retryDuration: self.retryDuration || 2,
        region: self.region,
        userId: self.userId,
        // 添加文件成功
        addFileSuccess() {
          self.uploadDisabled = false;
          self.resumeDisabled = false;
          self.statusText = '添加文件成功, 等待上传...';
        },
        // 开始上传
        async onUploadstarted(uploadInfo) {
          self.autographInfo = (await ResourseUploader.getAuthAutograph(
            self.file,
            self.fileType,
          )) || null;
          console.log('self.autographInfo=', self.autographInfo);
          // 如果是音视频
          // 如果VideoId有值 ，表示阿里云视频库没有该资源
          if (self.autographInfo.VideoId) {
            uploader.setUploadAuthAndAddress(
              uploadInfo,
              self.autographInfo.UploadAuth,
              self.autographInfo.UploadAddress,
              self.autographInfo.VideoId,
            );
            self.statusText = '文件开始上传...';
          } else {
            // 阿里云视频库有该资源 调取将资源传入ibd的方法
            self.resourseId = await ResourseUploader.postFileInfoToIbd(
              self.autographInfo.vid,
              self.autographInfo.media_type,
              self.autographInfo.md5Firle,
            );
            if (self.resourseId) {
              self.pauseDisabled = true; // 暂停上传按钮状态
              self.authProgress = 100; // 进度为100
              self.progressStatus = 'success'; // 进度状态
              self.statusText = '文件上传成功!';
            }
          }
        },
        // 文件上传成功
        async onUploadSucceed() {
          // 调取将资源传入ibd的方法
          self.resourseId = await ResourseUploader.postFileInfoToIbd(
            self.autographInfo.VideoId,
            self.fileType,
            self.autographInfo.md5Firle,
          );
          self.statusText = '文件上传成功!';
          if (self.resourseId) {
            self.pauseDisabled = true; // 暂停上传按钮状态
            self.authProgress = 100;
            self.statusText = '文件上传成功!';
          }
        },
        // 文件上传失败
        onUploadFailed(uploadInfo, code, message) {
          console.log(
            `onUploadFailed: file:${
              uploadInfo.file.name
            },code:${code}, message:${message}`,
          );
          self.statusText = '文件上传失败!';
        },
        // 取消文件上传
        onUploadCanceled(uploadInfo, code, message) {
          console.log(
            `Canceled file: ${
              uploadInfo.file.name
            }, code: ${code}, message:${message}`,
          );
          self.statusText = '文件已暂停上传';
        },
        // 文件上传进度，单位：字节, 可以在这个函数中拿到上传进度并显示在页面上
        onUploadProgress(uploadInfo, totalSize, progress) {
          const progressPercent = parseInt(Math.ceil(progress * 100), 10);
          if (progressPercent === 0) {
            self.progressStatus = 'text';
          } else if (progressPercent === 100) {
            self.progressStatus = 'success';
          } else {
            self.progressStatus = 'exception';
          }
          self.authProgress = progressPercent;
          this.onProcess(progressPercent);
          self.statusText = '文件上传中...';
        },
        // 上传凭证超时
        onUploadTokenExpired(uploadInfo) {
          // 上传大文件超时, 如果是上传方式一即根据 UploadAuth 上传时
          // 需要根据 uploadInfo.videoId 调用刷新视频上传凭证接口(https://help.aliyun.com/document_detail/55408.html)重新获取 UploadAuth
          // 然后调用 resumeUploadWithAuth 方法, 这里是测试接口, 所以我直接获取了 UploadAuth
          const refreshUrl = `https://demo-vod.cn-shanghai.aliyuncs.com/voddemo/RefreshUploadVideo?BusinessType=vodai&TerminalType=pc&DeviceModel=iPhone9,2&UUID=59ECA-4193-4695-94DD-7E1247288&AppVersion=1.0.0&Title=haha1&FileName=xxx.mp4&VideoId=${
            uploadInfo.videoId
          }`;
          axios.get(refreshUrl).then(({ data }) => {
            const uploadAuth = data.UploadAuth;
            uploader.resumeUploadWithAuth(uploadAuth);
            console.log(
              `upload expired and resume upload with uploadauth ${uploadAuth}`,
            );
          });
          self.statusText = '文件超时...';
        },
        // 全部文件上传结束
        onUploadEnd(uploadInfo) {
          console.log('onUploadEnd: uploaded all the files', uploadInfo);
          self.statusText = '文件上传完毕';
        },
      });
      return uploader;
    },
  },
};
</script>
<style lang="scss" scoped>
.audio-video-uploader {
  color: #8a9199;
  &:hover {
    color: #08111a;
    background-color: #f2f2f2;
  }
  .file-item {
    width: 100%;
    height: 40px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0;
    & > .file-detail {
      display: flex;
      align-items: center;
      flex: 1;
      & > .file-name {
        width: 360px;
      }
      & > .file-status {
        width: 260px;
      }
      & > .file-progress {
        width: 260px;
      }
    }
    & > .file-cooper {
      width: 320px;
      display: flex;
      justify-content: space-around;
    }
  }
}
</style>
