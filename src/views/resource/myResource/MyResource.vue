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
            <!-- 课程列表 -->
            <el-collapse
              accordion
              v-model="activeNames"
              @change="collapseChange"
            >
              <div v-for="item in dataList" :key="item.id" class="item-block">
                <div v-if="editTitleIndex !== item.id">
                  <el-collapse-item :name="item.id">
                    <!-- <div> -->
                    <template slot="title">
                      <div class="head-block">
                        <div class="icon-title">
                          <span class="type-icon">
                            <i class="iconfont icon-ziyuan1"></i>
                          </span>
                          {{ item.name }}
                        </div>
                        <div class="options" @click.stop.prevent="stop">
                          <i
                            class="iconfont icon-yidong"
                            @click.stop.prevent="dragItem()"
                          ></i>
                          <i
                            class="iconfont icon-bianji"
                            @click.stop.prevent="editItemTitle(item.id)"
                          ></i>
                          <i
                            class="iconfont icon-shanchu"
                            @click.stop.prevent="delItem()"
                          ></i>
                        </div>
                      </div>
                    </template>
                    <div v-loading="loading">
                      任天堂香港有限公司官微宣布，任天堂商店现在已经支持VISA、MasterCard、
                      Alipay、Unionpay（银联）付款。大陆版支付宝可以直接扫码支付，对于玩家来说更加便利了。
                      游民星空笔者亲测在付款时可以从三种方式中任选一种：银联、Visa、Mster卡，大陆版支付宝，Alipay
                      HK。连接体验也比较流畅。 游民星空 游民星空
                      港服商店已经上架了不少Switch游戏，还有预付序号卡、NS
                      Online会员等内容。
                      本文由游民星空制作发布，未经允许禁止转载。
                    </div>
                  </el-collapse-item>
                </div>
                <div v-if="editTitleIndex === item.id">
                  <div class="itemtitle-edit-block">
                    <el-input
                      v-model="item.name"
                      class="title-item-edit"
                      :autofocus="true"
                      :class="{ active: editTitleIndex === item.id }"
                    >
                    </el-input>
                    <div class="options">
                      <span class="cancel" @click="cancelUpdateTitle"
                        >取消
                      </span>
                      <span class="save" @click="updateTitle">保存</span>
                    </div>
                  </div>
                </div>
              </div>
            </el-collapse>

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
import { mockMyCourseList } from '@/mocks/index'
import { mockMyTaskList } from '@/mocks/index'
import { mockMyTestList } from '@/mocks/index'
import { mockMyDatumList } from '@/mocks/index'

// import { mockMyCourseList } from '@/mocks/index'
import Sortable from 'sortablejs'

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
  public packageDetail: any = mockMyResourceDetail //资源包详情信息
  public editTitleIndex: number = 0
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

  public dataList: any
  public courseList: Array<any> = mockMyCourseList
  public taskList: Array<any> = mockMyTaskList
  public testList: Array<any> = mockMyTestList
  public datumList: Array<any> = mockMyDatumList
  public activeNames: any = ''

  public loading: boolean = true
  @Watch('$route', { immediate: true, deep: true })
  onUrlChange(to: {
    id: number
    query: { id: number; type: string; filter: string }
  }) {
    const url = to.query
    this.navType = to.query.type
    this.$message('一进入页面就提示this.navType===' + this.navType)
    if (this.navType === 'course') {
      this.dataList = this.courseList
    } else if (this.navType === 'task') {
      this.dataList = this.taskList
    } else if (this.navType === 'test') {
      this.dataList = this.testList
    } else if (this.navType === 'datum') {
      this.dataList = this.datumList
    }
  }
  mounted() {}

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
    this.editTitleIndex = 0 //关闭可能打开的编辑标题框
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

  // 编辑item 标题
  editItemTitle(val: number) {
    this.editTitleIndex = val
    this.addResourceShow = false
    this.$message('点击了编辑标题icon')
    console.log(this.editTitleIndex)
  }
  // 删除资源
  delItem() {
    this.$confirm('确定要删除吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.$message({
        type: 'success',
        message: '删除成功!'
      })
    })
  }
  // 更新资源标题
  updateTitle() {
    this.$message({
      message: '题目保存成功',
      type: 'success'
    })
    this.editTitleIndex = 0
  }

  // 取消更新标题
  cancelUpdateTitle() {
    this.$message('取消编辑标题')
    this.editTitleIndex = 0
    this.closeCollapse()
  }

  // 收起手风琴折叠效果
  closeCollapse() {
    this.activeNames = ''
  }

  dragItem() {
    this.activeNames = ''
  }

  // 标题操作区阻止冒泡
  stop() {
    this.activeNames = ''
    this.$message('阻止冒泡')
  }

  // 触发手风琴
  collapseChange() {
    if (this.activeNames) {
      this.$message('触发了手风琴' + this.activeNames)
      this.loading = true
    } else {
      this.$message('关闭手风琴')
      this.loading = false
    }
    setTimeout(() => {
      this.loading = false
    }, 1000)
  }
}

// 手风琴展开详情
// itemDetail(id) {
// this.mLoading = true
// this.$set(this.formContent, 'content', '')
// this.mFormDataContent = ''
// setTimeout(() => {
//   Resource.MyResource.detailResourceItem(this.pageid, id)
//     .then(rec => {
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
    // 左侧nav菜单
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
          line-height: 35px;
          cursor: pointer;
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
      // 新增资源
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
        // 添加item
        .add-item-block {
          padding: 20px 40px;
          background: #f7f9fa;
          .el-input {
            width: 700px;
            margin-right: 20px;
          }
          span {
            display: inline-block;
            width: 50px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            cursor: pointer;
            font-size: 12px;
            color: #fff;
          }
          .save-btn {
            background: $main;
            &:hover {
              background: $mian-bright;
              transition: 0.3s;
            }
          }
          .cancel-btn {
            background: $grey;
            margin-right: 10px;
            &:hover {
              background: $grey-bright;
              transition: 0.3s;
            }
          }
        }
        ::v-deep .el-collapse {
          border-bottom: none !important;
        }
        .item-list {
          .item-block {
            min-height: 50px;
            border-bottom: 1px solid #ebeef5;
            ::v-deep .el-collapse-item__header {
              border-bottom: none;
            }
            .head-block {
              display: flex;
              width: 100%;
              justify-content: space-between;
              .options {
                padding: 0 15px;
                i {
                  color: #8a9199;
                  margin-right: 20px;
                }
                i:last-of-type {
                  margin-right: 0;
                }
              }
            }
            .itemtitle-edit-block {
              background: #f7f9fa;
              height: 80px;
              display: flex;
              padding: 0 50px 0 40px;
              align-items: center;
              .title-item-edit {
                ::v-deep .el-input__inner {
                  width: 700px;
                }
              }
              .options {
                width: 128px;
                span {
                  display: inline-block;
                  width: 50px;
                  height: 30px;
                  line-height: 30px;
                  text-align: center;
                  cursor: pointer;
                  font-size: 12px;
                  color: #fff;
                }
                .save {
                  background: $main;
                  &:hover {
                    background: $mian-bright;
                    transition: 0.3s;
                  }
                }
                .cancel {
                  background: $grey;
                  margin-right: 10px;
                  &:hover {
                    background: $grey-bright;
                    transition: 0.3s;
                  }
                }
              }
            }
          }
          .type-icon {
            color: #bdc1c6;
            margin-right: 8px;
          }

          .title-item-edit.active {
            ::v-deep .el-input__inner {
              border: 1px solid $main;
            }
          }
        }
      }
    }
  }
}
</style>
