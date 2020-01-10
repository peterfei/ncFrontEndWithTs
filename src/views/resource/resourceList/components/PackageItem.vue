<template>
  <div class="item-box">
    <div class="img"><img src="" alt="" /></div>
    <div class="detail">
      <div class="top">
        <el-dropdown :hide-on-click="true">
          <span class="el-dropdown-link">
            <i
              class="iconfont icon-icon-test1 handle-i"
              v-if="typeChoose !== 'all'"
            ></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="unzip"
              >解压到备课区</el-dropdown-item
            >
            <el-dropdown-item
              v-if="status == 2 || status == 9"
              @click.native="reviewCheck(id)"
            >
              提交审核</el-dropdown-item
            >
            <el-dropdown-item @click.native="editPackage(id)"
              >编辑</el-dropdown-item
            >
            <el-dropdown-item
              v-if="is_published == 0 && status == 1"
              @click.native="upshelf(id)"
              >上架
            </el-dropdown-item>
            <el-dropdown-item
              v-if="is_published == 1 && status == 1"
              @click.native="downshelf(id)"
              >下架
            </el-dropdown-item>
            <el-dropdown-item
              v-if="status != 0 && status != 1"
              @click.native="deletePackage(id)"
            >
              删除</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
        <router-link
          :to="{ path: `/resource/resourcedetail/${id}?type=course` }"
        >
          <p class="package-title word-spot">{{ title }}</p>
          <span
            class="status-tag success"
            v-if="(status == 1) & (typeChoose == 'myfa')"
            >已发布</span
          >
          <span
            class="status-tag review"
            v-if="(status == 0) & (typeChoose == 'myfa')"
            >待审核</span
          >
          <span
            class="status-tag error"
            v-if="(status == 2) & (typeChoose == 'myfa')"
            >已驳回</span
          >
        </router-link>

        <!-- 当我们的发布时，进入编辑条目页面 -->
        <router-link
          :to="{ path: `/resource/myResource/${id}` }"
          v-if="typechoose == 'myfa'"
        >
          <p class="package-title word-spot">这里是标题</p>
          <span
            class="status-tag success"
            v-if="(status == 1) & (typechoose == 'myfa')"
            >已发布</span
          >
          <span
            class="status-tag review"
            v-if="(status == 0) & (typechoose == 'myfa')"
            >待审核</span
          >
          <span
            class="status-tag error"
            v-if="(status == 2) & (typechoose == 'myfa')"
            >未通过</span
          >
          <span
            class="status-tag wait"
            v-if="(status == 9) & (typechoose == 'myfa')"
            >待发布</span
          >
        </router-link>

        <p class="describe word-spot">{{ school }}</p>
        <div class="tags">
          <span v-for="(tag, index) in tags" :key="tag.id" class="tag">
            {{ tagObj[index] }}{{ tag }}
          </span>
        </div>
      </div>
      <div class="down">
        <div class="price-extract">
          <!-- <span class="bodou" v-if="bodou != 0">博豆:{{ bodou }}</span> -->
          <span class="price" v-if="price != 0">￥{{ price }}</span>
          <span class="free" v-else>免费</span>
          <span class="extract">摘录:&nbsp;{{ bought_num }}</span>
        </div>
        <div class="update-time" v-if="is_published != 0">
          <i class="iconfont icon-tubiao1"></i>
          <span>2019-07-29 16:35:52</span>
        </div>
        <div class="xiajia" v-if="is_published === 0">
          <i class="iconfont icon-tubiao"></i>
        </div>
      </div>
    </div>

    <!-- 解压到备课区弹框 -->
    <!-- <el-dialog
      class="unzipDialog"
      title="选择目录"
      :visible.sync="prepareDialogVisible"
      width="400px"
      highlight-current
      :before-close="handleClose"
    >
      <el-tree
        :data="treedata"
        :props="defaultProps"
        @node-click="handleNodeClick"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="prepareDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="prepareDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog> -->
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
@Component
export default class PackageItem extends Vue {
  public tagObj = {
    course: '课程',
    testing: '测验',
    material: '资料',
    homework: '作业',
    interaction: '互动'
  }
  @Prop({ default: '1111111' }) typechoose: string
  @Prop({ default: '1111111' }) title: string
  @Prop({ default: '' }) id: number
  @Prop({ default: '' }) price: string
  @Prop({ default: 0 }) bodou: number // 博豆
  @Prop({ default: 0 }) bought_num: number
  @Prop({ default: 0 }) is_published: number
  @Prop({ default: 0 }) status: number // 审核状态 0待审核 1通过 2未通过 9未发布
  @Prop({ default: '' }) school: string
  @Prop({ default: 'all' }) typeChoose: string // 全部 我的发布 我的摘录
  @Prop({ default: '' }) tags: string

  // 删除资源包
  deletePackage(id: number) {
    this.$confirm('确定删除该教学包?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.$emit('deletePackage', id)
    })
  }
  // 编辑资源包
  editPackage(id: any) {
    console.log('编辑')
    this.$router.push({
      path: 'resource/addpackage',
      query: { packageId: id }
    })
    // this.$router.push({
    //   path: 'resource/addpackage',
    //   query: { userid: id }
    // })
  }
}

// this.name:String = 'aaaaaaaa'
// import Resource from '@/api/resource/index'
// import Prepare from '@/api/prepare/index'

// export default {
//   data() {
//     return {
//       prepareDialogVisible: false,
//
//       treedata: [],
//       defaultProps: {
//         children: '_child',
//         label: 'name'
//       }
//     }
//   },

//   computed: {},
//   methods: {
//     handleNodeClick(data) {
//       console.log(data)
//     },

//     // 编辑资源包
//     editPackage(id) {
//       Resource.ResourcePackage.editResource(id)
//         .then(rec => {
//           console.log(rec)
//           this.$router.push({
//             path: 'resource/addpackage',
//             query: { userid: id }
//           })
//         })
//         .catch(rec => {
//           console.log(rec)
//         })
//     },
//
//     // 解压到备课区
//     unzip() {
//       this.prepareDialogVisible = true
//       Prepare.Prepare.getPrepareTree().then(rec => {
//         this.treedata = rec
//         console.log('树形图获取方法请求结束')
//         console.log(this.treedata)
//       })
//     },
//     handleClose(done) {
//       this.prepareDialogVisible = false
//       console.log(done)
//     },

//     // 资源包上架
//     upshelf(id) {
//       const obj = {
//         id,
//         is_publish: 1
//       }
//       this.$emit('setPublish', obj)
//     },
//     // 资源包下架
//     downshelf(id) {
//       const obj = {
//         id,
//         is_publish: 0
//       }
//       this.$emit('setPublish', obj)
//     },
//     // 提交审核
//     reviewCheck(id) {
//       const obj = {
//         id
//       }
//       this.$emit('setArraignment', obj)
//     }
//   }
// }
</script>
<style lang="scss" scoped>
::v-deep .el-dropdown-menu__item {
  color: #8a9199;
  &:hover {
    background: #ebeff3 !important;
    color: #575e66 !important;
  }
}
::v-deep .el-dropdown-menu__item:hover {
}

.item-box {
  width: 590px;
  height: 160px;
  padding: 20px;
  background: rgba(255, 255, 255, 1);
  transition: 0.5s;
  border-radius: 10px;
  display: flex;
  margin-bottom: 20px;
  &:hover {
    box-shadow: 0px 4px 11px 0px rgba(230, 230, 230, 1);
    .handle-i {
      display: inline-block !important;
      &:hover {
        color: #ff783c;
      }
    }
  }
  .img {
    width: 160px;
    height: 120px;
    background: #ccc;
    border-radius: 5px;
    margin-right: 20px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .detail {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 370px;
    flex: 1;
    .top {
      position: relative;
      top: -3px;
      ::v-deep .el-dropdown {
        cursor: pointer;
        position: absolute;
        right: 0;
        top: 0;
      }
      a {
        width: 80%;
      }
      .handle-i {
        display: none;
      }
    }
    .package-title {
      font-size: 16px;
      font-weight: 400;
      color: rgba(23, 24, 26, 1);
      margin: 0;
      display: inline-block;
      max-width: 70%;
      margin-right: 5px;
    }
    .review {
      background: #00a5e1;
    }
    .success {
      background: #40c78d;
    }
    .error {
      background: #f01414;
    }
    .wait {
      background: #f09855;
    }
    .status-tag {
      color: #fff;
      width: 50px;
      height: 18px;
      line-height: 20px;
      border-radius: 2px;
      display: inline-block;
      vertical-align: top;
      text-align: center;
      font-size: 12px;
      position: relative;
      top: 2px;
    }
    .describe {
      font-size: 12px;
      margin: 0;
      font-weight: 400;
      color: rgba(139, 145, 153, 1);
    }
    .tag {
      padding: 0 8px;
      height: 22px;
      margin-right: 10px;
      line-height: 24px;
      background: rgba(235, 238, 240, 1);
      text-align: center;
      border-radius: 2px;
      display: inline-block;
      font-size: 12px;
      font-weight: 400;
      margin-top: 8px;
      color: rgba(139, 145, 153, 1);
    }
  }
  .unzipDialog {
    ::v-deep .el-dialog__header {
      border-bottom: 1px solid #e7e7e7;
      padding: 20px 0 15px 0;
      margin: 0 20px;
    }
    ::v-deep .el-dialog__body {
      margin-bottom: 100px;
      .el-tree-node__label {
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .el-tree-node:focus > .el-tree-node__content {
        background-color: #f2f2f2 !important;
      }
    }
    ::v-deep .el-dialog__title {
      font-weight: bold;
      font-size: 14px;
      color: #4c5258;
    }
    ::v-deep .el-dialog__headerbtn {
      i {
        color: #4c5258;
        width: 15px;
        height: 15px;
        font-weight: bold;
      }
    }
    ::v-deep .el-dialog__footer {
      text-align: center;
      .el-button--default {
        background: #dcdee0;
        color: #4c5258;
        &:hover {
          border-color: #dcdee0;
        }
      }
      ::v-deep .el-button {
        width: 90px;
        padding: 0;
        line-height: 36px;
        height: 36px;
        line-height: 36px;
      }
    }
  }
}
.down {
  display: flex;
  justify-content: space-between;
  position: relative;
  .price {
    font-size: 12px;
    font-weight: 400;
    margin-right: 20px;
    color: rgba(240, 20, 20, 1);
  }
  .extract {
    font-size: 12px;
    font-weight: 400;
    color: rgba(138, 145, 153, 1);
  }
  .free {
    font-size: 12px;
    color: #40c78d;
    margin-right: 20px;
  }
  .bodou {
    font-size: 12px;
    color: #f01414;
    margin-right: 20px;
  }
  .extract_btn {
    width: 70px;
    cursor: pointer;
    color: #fff;
    height: 32px;
    line-height: 32px;
    background: rgba(255, 120, 60, 1);
    border-radius: 4px;
    text-align: center;
    position: absolute;
    bottom: 0;
    right: 0;
  }
  .update-time {
    font-size: 12px;
    font-weight: 400;
    color: rgba(139, 145, 153, 1);
    position: relative;
    width: 137px;
    span {
      bottom: 0;
      position: absolute;
      right: 0;
    }
    i {
      position: absolute;
      bottom: 0;
      font-size: 14px;
      color: #8b9199;
    }
  }
  .xiajia {
    position: absolute;
    right: 0;
    bottom: 0;
    i {
      color: #b7bbbf;
      font-size: 50px;
    }
  }
}
::v-deep .el-dropdown-menu el-popper:hover {
  .handle-i {
    display: inline-block !important;
  }
}
</style>
