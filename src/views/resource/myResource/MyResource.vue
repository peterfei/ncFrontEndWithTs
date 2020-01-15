<template>
  <div class="content w-1200 layout-content myresource-box">
    <!-- 面包屑 -->
    <div class="crumbs">
      教学包&nbsp;/&nbsp;发布
    </div>
    <div class="main-content">
      <div class="left-nav">
        <div class="cover-block">
          <img src="" alt="" />
        </div>
        <div class="title">
          {{ packageDetail.title }}
        </div>
        <div class="types">
          <div
            class="item"
            v-for="nav in navTypes"
            :key="nav.index"
            :class="{ active: navType == nav.name }"
            @click="changeUrl(nav.name)"
          >
            <span>{{ nav.label }}</span>
            <i class="el-icon-caret-right"></i>
          </div>
        </div>
      </div>
      <div class="right-package">
        <div class="package-intro">
          <div class="title">
            教学包介绍
          </div>
          <div class="tags">
            <span class="charge">价格：{{ packageDetail.price }}</span>
            <span class="rank">{{ packageDetail.education | eduFormat }}</span>
            <span class="time">更新时间：{{ packageDetail.update }}</span>
          </div>
          <div class="intro">教学包描述：{{ packageDetail.intro }}</div>
        </div>
        <div class="add-items">
          <div class="add-btn-block">
            <span class="add-btn" @click="addItem">
              添加{{ navType | navFormat }}
            </span>
          </div>
          <div class="add-item-block" v-if="addResourceShow == true">
            <el-input
              v-model="addResourceTitle"
              placeholder="请输入内容"
            ></el-input>
            <span class="cancel-btn" @click="cancelItemTitle">取消</span>
            <span class="save-btn" @click="saveItemTitle">保存</span>
          </div>
          <div class="item-list">
            <!-- <el-collapse
              v-model="activeName"
              accordion
              v-if="navType == 'course'"
            >
              <course-item
                v-for="item in courseList"
                :key="item.id"
                :id="item.id"
                :itemId="item.id"
                :packageId="packageId"
                :title="item.resource.base_resource.title"
                @delItem="delItem"
              ></course-item>
            </el-collapse> -->

            <!-- 作业列表 -->
            <!-- <el-collapse
              v-if="navType == 'homework'"
              v-model="activeNames"
              accordion
              @change="itemDetail"
            >
              <el-collapse-item
                v-for="item in homeworkList"
                :key="item.id"
                Consistency
                :name="item.id"
              >
                <div class="edit-title" v-if="item.type === 2">
                  <el-input
                    v-model="inputTitle"
                    placeholder="请输入内容"
                  ></el-input>
                  <span class="cancel-btn" @click.stop.prevent="cancelItem"
                    >取消</span
                  >
                  <span class="save-btn" @click="addItemTitle">保存</span>
                </div>
                <template slot="title" class="aaaaaaaa">
                  <div class="item-content-block" v-if="item.editType === 0">
                    <span class="item-title word-spot">{{
                      item.resource.title
                    }}</span>
                    <div class="info">
                      <span class="datatime">
                        <i class="iconfont icon-tubiao1"></i>
                        {{ item.resource.updated_at }}
                      </span>
                      <span class="excerpt" @click.stop.prevent="excerptList">
                        摘录：{{ item.resource.bought_num }}
                      </span>
                    </div>
                    <div class="icons">
                      <i
                        class="iconfont icon-bianji"
                        @click.stop.prevent="
                          editTitle(item.id, item.resource.title)
                        "
                      ></i>
                      <i
                        class="iconfont icon-shanchu"
                        @click.stop.prevent="delItem(item)"
                      ></i>
                    </div>
                  </div>
                  <div v-if="item.editType === 1" class="edit-title">
                    <el-input
                      v-model="editTitleInput"
                      @click.stop.native="stopstop"
                    ></el-input>
                    <div class="btns">
                      <span
                        class="cancel-btn"
                        @click.stop.prevent="cancelEditTitle(item.id)"
                        >取消</span
                      >
                      <span
                        class="save-btn"
                        @click.stop.prevent="updateTitle(item.id)"
                        >保存</span
                      >
                    </div>
                  </div>
                </template>

                <homework-item
                  v-if="item.editType === 0"
                  :title="item.resource.title"
                  :itemid="item.id"
                  @updateDetail="updateItemDetail"
                  :neirong="materialItem.resource"
                  :materiacontent="
                    materialItem.resource ? materialItem.resource.content : ''
                  "
                  @cancelCollapse="cancelCollapse"
                ></homework-item>
              </el-collapse-item>
            </el-collapse> -->
            <!-- 作业列表end -->

            <!-- 测验列表 -->
            <!-- <el-collapse
              v-if="navType == 'testing'"
              v-model="activeNames"
              accordion
            >
              <el-collapse-item
                v-for="item in testList"
                :key="item.id"
                :title="item.resource.title"
                :name="item.id"
                :itemid="item.id"
              >
                <template slot="title">
                  <div class="item-content-block">
                    <span class="item-title word-spot">{{
                      item.resource.title
                    }}</span>
                    <div class="info">
                      <span class="datatime">
                        <i class="iconfont icon-tubiao1"></i>
                        {{ item.resource.updated_at }}
                      </span>
                      <span class="excerpt" @click.stop.prevent="excerptList">
                        摘录：{{ item.resource.bought_num }}
                      </span>
                    </div>
                    <div class="icons">
                      <i
                        class="iconfont icon-bianji"
                        @click.stop.prevent="edit"
                      ></i>
                      <i
                        class="iconfont icon-shanchu"
                        @click.stop.prevent="delItem(item.id)"
                      ></i>
                    </div>
                  </div>
                </template>
                <testing-item :iteminfo="materialItem"></testing-item>
              </el-collapse-item>
            </el-collapse> -->
            <!-- 测验列表end -->

            <!-- 资料 -->
            <!-- <el-collapse
              v-if="navType == 'material'"
              v-model="activeNames"
              :accordion="true"
              @change="itemDetail"
            >
              <el-collapse-item
                v-for="item in materialList"
                :key="item.id"
                :title="item.resource.title"
                :name="item.id"
                :itemid="item.id"
              >
                <template slot="title">
                  <div class="item-content-block">
                    <span class="item-title word-spot">{{
                      item.resource.title
                    }}</span>
                    <div class="info">
                      <span class="datatime">
                        <i class="iconfont icon-tubiao1"></i>
                        {{ item.resource.updated_at }}
                      </span>
                      <span class="excerpt" @click.stop.prevent="excerptList">
                        摘录：{{ item.resource.bought_num }}
                      </span>
                    </div>
                    <div class="icons">
                      <i class="iconfont icon-bianji"></i>
                      <i
                        class="iconfont icon-shanchu"
                        @click.stop.prevent="delItem(item)"
                      ></i>
                    </div>
                  </div>
                </template>

                <div v-loading="mLoading" style="min-height: 50px;">
                  <material-item
                    :updateContent="mFormDataContent"
                    :iteminfo="materialItem"
                    :materialType="mType"
                    :materialLabel="materialLabel"
                    @addMaterialContent="updateItemDetail"
                    :neirong="materialItem.resource"
                    :materiacontent="
                      materialItem.resource ? materialItem.resource.content : ''
                    "
                    @cancelCollapse="cancelCollapse"
                  ></material-item>
                </div>
              </el-collapse-item>
            </el-collapse> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { mockMyResourceDetail } from '@/mocks/index'
// import Resource from '@/api/resource/index'
// import courseItem from './components/courseItem.vue'
// import homeworkItem from './components/homeworkItem.vue'
// import testingItem from './components/testingItem.vue'
// import materialItem from './components/materialItem.vue'
@Component({
  components: {},
  filters: {
    // 教育层级格式
    eduFormat(val: number) {
      if (val == 0) {
        return '其他'
      } else if (val == 1) {
        return '中职'
      } else if (val == 2) {
        return '高职'
      } else if (val == 3) {
        return '本科及以上'
      }
    },
    navFormat(val: string) {
      if (val === 'course') {
        return '课程'
      } else if (val === 'task') {
        return '作业'
      } else if (val === 'test') {
        return '测验'
      } else if (val === 'datum') {
        return '资料'
      }
    }
  }
})
export default class MyResource extends Vue {
  public packageDetail: any = mockMyResourceDetail
  public current: string = 'confirm'
  public payment: string = 'zhibubao'

  public navTypes: Array<any> = [
    {
      name: 'course',
      label: '课程'
    },
    {
      name: 'task',
      label: '作业'
    },
    {
      name: 'test',
      label: '测验'
    },
    {
      name: 'datum',
      label: '资料'
    }
  ]
  public navType: any = 'course' //当前的页面分类
  public packageId: any = null
  public addResourceTitle: string = ''
  public addResourceShow: boolean = false
  @Watch('$route', { immediate: true, deep: true })
  onUrlChange(to: {
    id: number
    query: { id: number; type: string; filter: string }
  }) {
    const url = to.query
    this.navType = to.query.type
  }
  mounted() {
    console.log('mounted', this.$route)
  }

  public buy() {}

  // 点击左侧改变url
  changeUrl(nav: string) {
    this.$router.push({
      query: {
        type: nav
      }
    })
  }

  // 添加一条资源
  addItem() {
    this.addResourceShow = true
  }
  // 取消添加item
  cancelItemTitle() {
    this.addResourceShow = false
  }

  // 保存item新增
  saveItemTitle() {
    this.$message({
      message: '新增item成功',
      type: 'success'
    })
    this.addResourceShow = false
    this.addResourceTitle = ''
  }
}

// watch: {
//   formData: {
//     handler(v) {
//       this.formData = v
//     },
//     deep: true
//   },

// },

// data() {
//   return {
//     loading: true,
//     editTitleInput: '',
//     activeAaaaa: [],
//     editType: 0,
//     pageid: '',
//     inputTitle: '', // 添加新标题的
//     activeName: '1',
//     navType: 'course',
//     query: '',
//     addSubject: 0, // 0不显示 1显示 是否添加标题(框)
//     courseList: [],
//     homeworkList: [],
//     testList: [],
//     materialList: [],
//     packageId: '',
//     packageTitle: '', // 教学包名称
//     packageIntro: '', // 教学包介绍
//     packagePrice: '', // 教学包价格
//     packageUpdated_at: '', // 更新时间
//     packageEducation: '', // 适用层次 0 1 2
//     packageEducationLabel: '', // 适用层次

//     activeNames: '',
//     materialItem: '',
//     materialLabel: '',
//     materialType: '',
//     formContent: {
//       // 提交内容表单
//       title: '',
//       id: '', // 教学包id
//       item_id: '', // 教学包资源id
//       content: ''
//     },
//     // 资料内容
//     mLoading: true,
//     mFormDataContent: '', // 表单内容
//     mType: '' // 类型
//   }
// },

// created() {
//   this.pageid = this.$route.params.id
//   this.packageId = this.$route.params.id
// },
// mounted() {
//   this.$router.push({
//     query: { type: 'course' }
//   })

//   this.getPackDetail()
// },
// methods: {
//   addMaterial() {},
//   // 修改标题按钮触发动作
//   editTitle(itemid, title) {
// this.editTitleInput = title
// this.homeworkList = this.homeworkList.map(item => {
//   const obj = item
//   if (obj.id === itemid) {
//     return { ...obj, editType: 1 }
//   }
//   return obj
// })
// },
// 保存修改标题时触发动作
// updateTitle(itemid) {
// const obj = {
//   item_id: 46,
//   title: this.editTitleInput,
//   resource_type: 'homework'
// }
// Resource.MyResource.addResourceItem(this.packageId, obj)
//   .then(rec => {
//     console.log(rec)
//     this.$message({
//       type: 'success',
//       message: '修改标题成功!'
//     })
//   })
//   .catch(error => {
//     console.log(error)
//   })
// },

// stopstop() {},

// 删除条目
// delItem(obj) {
// this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
//   confirmButtonText: '确定',
//   cancelButtonText: '取消',
//   type: 'warning'
// })
//   .then(() => {
//     Resource.MyResource.delResourceItem(obj.teaching_package_id, obj.id)
//       .then(rec => {
//         console.log('删除信息=', rec)
//         this.getPackDetail()
//       })
//       .catch(error => {
//         console.log(error)
//       })
//     this.$message({
//       type: 'success',
//       message: '删除成功!'
//     })
//   })
//   .catch(() => {
//   })
// },
// // 取消编辑标题
// cancelEditTitle(itemid) {
// this.homeworkList = this.homeworkList.map(item => {
//   const obj = item
//   if (obj.id === itemid) {
//     return { ...obj, editType: 0 }
//   }
//   return obj
// })
// },
// // 取消条目
// cancelCollapse() {
//   this.activeNames = 0
// },

// 添加、修改资源内容条目
// updateItemDetail(obj) {
// const postObj = obj
// postObj.item_id = this.formContent.item_id
// postObj.title = this.formContent.title
// console.log('更新详情=', obj)
// Resource.MyResource.updateResourceItem(this.pageid, obj)
//   .then(rec => {
//     console.log(rec)
//     this.$message({
//       message: '更新成功',
//       type: 'success'
//     })
//     this.getPackDetail()
//     this.activeNames = 0
//   })
//   .catch(error => {
//     console.log(error)
//   })
// },

// 手风琴展开详情
// itemDetail(id) {
// this.mLoading = true
// this.$set(this.formContent, 'content', '')
// this.mFormDataContent = ''
// setTimeout(() => {
//   Resource.MyResource.detailResourceItem(this.pageid, id)
//     .then(rec => {
//       console.log('单个手风琴详情信息=', rec)
//       this.formContent.title = rec.resource.base_resource.title
//       this.formContent.item_id = rec.id
//       this.mType = rec.resource.base_resource.type
//       this.mFormDataContent = rec.resource.base_resource.content
//     })
//     .catch(error => {
//       console.log(error)
//     })
//     .finally(() => {
//       this.mLoading = false
//       })
//   }, 300)
// },

// 切换 作业 课程 测验等
// setType(tab) {
// this.query = tab
// this.navType = tab
// const obj = {
//   type: this.query
// }
// this.$router.push({
//   query: obj
// })
// this.addSubject = 0
// },

// 获取列表
// getPackDetail() {
// Resource.ResourcePackage.getResourceDetail(this.pageid)
//   .then(rec => {
//     this.packageTitle = rec.name // 教学包标题
//     this.packageIntro = rec.intro // 教学包描述
//     if (rec.price === '0.00') {
//       this.packagePrice = '免费'
//     } else {
//       this.packagePrice = rec.price // 教学包价格
//     }
//     this.packageUpdated_at = rec.updated_at // 更新时间
//     this.packageEducation = rec.education // 适用层次
//     this.courseList = rec.teaching_pkg_items.course
//     this.homeworkList = rec.teaching_pkg_items.homework.map(item => ({
//       ...item,
//       editType: 0
//     }))
//     this.testList = rec.teaching_pkg_items.testing
//     this.materialList = rec.teaching_pkg_items.material
//   })
//   .catch(error => {
//   })
// },

// addItem() {
//   this.addSubject = 1
// },
// cancelItem() {
//   this.addSubject = 0
// },

// 添加资源标题-保存
// addItemTitle() {
// const postObj = {
//   title: this.inputTitle,
//   resource_type: this.navType
// }
// Resource.MyResource.addResourceItem(this.pageid, postObj)
//   .then(rec => {
//     this.$message({
//       message: '添加成功',
//       type: 'success'
//     })
//     this.addSubject = 0
//     this.inputTitle = ''
//     this.getPackDetail()
//   })
//   .catch(err => {})
//     }
//   }
// }
</script>

<style lang="scss" scoped>
.layout-content {
  width: 1200px;
  margin: 0 auto;
}
.myresource-box {
  padding-top: 20px;
  .crumbs {
    color: #8b9199;
    margin-bottom: 17px;
    font-size: 12px;
  }
  .main-content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    .left-nav {
      width: 200px;
      padding: 20px;
      background: #fff;
      border-radius: 10px;
      .cover-block {
        width: 160px;
        height: 120px;
        margin-bottom: 13px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          display: inline-block;
          background: #ccc;
        }
      }
      .title {
        font-size: 14px;
        font-weight: bold;
        color: #4c5258;
        line-height: 22px;
        margin-bottom: 13px;
      }
      .types {
        .item {
          color: #4c5359;
          display: flex;
          justify-content: space-between;
          cursor: pointer;
          line-height: 35px;
          span {
            font-size: 14px;
          }
          i {
            line-height: 35px;
          }
        }
        .active {
          color: #ff783c;
        }
      }
    }
    .item-content-block {
      display: inherit;
      width: 100%;
      .item-title {
        width: 305px;
        display: inline-block;
        margin-right: 40px;
      }
      .info {
        margin-right: 125px;
        .datatime {
          font-size: 12px;
          color: #8b9199;
          margin-right: 18px;
          i {
            font-size: 12px;
            margin-right: 2px;
          }
        }
        .excerpt {
          font-size: 12px;
          color: #8b9199;
        }
      }
      .icons {
        display: none;

        i {
          color: #8a9199;
          margin-left: 20px;
          font-size: 14px;
        }
      }
      &:hover {
        .icons {
          display: inline-block !important;
        }
      }
    }
    .right-package {
      width: 980px;
      margin-bottom: 240px;
      .package-intro {
        margin-bottom: 20px;
        padding: 30px;
        border-radius: 10px;
        background: #fff;
        .title {
          font-size: 16px;
          font-weight: 400;
          color: rgba(76, 83, 89, 1);
          margin-bottom: 14px;
        }
        .tags {
          font-size: 12px;
          font-weight: 400;
          color: rgba(139, 145, 153, 1);
          margin-bottom: 14px;
          span {
            margin-right: 20px;
          }
        }
        .intro {
          font-size: 12px;
          font-weight: 300;
          color: rgba(139, 145, 153, 1);
          line-height: 21px;
          opacity: 0.8;
        }
      }

      .add-items {
        background: #fff;
        padding: 30px;
        border-radius: 10px;
        .add-btn-block {
          margin-bottom: 20px;
          .add-btn {
            width: 90px;
            height: 36px;
            line-height: 36px;
            text-align: center;
            color: #fff;
            background: #4c5258;
            border-radius: 4px;
            display: inline-block;
            cursor: pointer;
            font-size: 12px;
          }
        }
        .add-item-block {
          padding: 20px 40px;
          background: #f7f9fa;
          ::v-deep .el-input {
            width: 712px;
            margin-right: 18px;
          }
          .cancel-btn,
          .save-btn {
            display: inline-block;
            width: 50px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            cursor: pointer;
            font-size: 12px;
            color: #fff;
          }
          .cancel-btn {
            background: #b6babf;
            margin-right: 10px;
          }
          .save-btn {
            background: #ff783c;
          }
        }
        ::v-deep .el-collapse {
          border-bottom: none !important;
        }
        .item-list {
          .edit-title {
            display: flex;
            width: 100%;
            .btns {
              width: 20%;
              margin-left: 40px;
              span {
                width: 50px;
                height: 30px;
                display: inline-block;
                vertical-align: middle;
                text-align: center;
                color: #fff;
                line-height: 30px;
              }
              .save-btn {
                background: #ff783c;
              }
              .cancel-btn {
                background: #b6babf;
                margin-right: 15px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
