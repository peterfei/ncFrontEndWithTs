<template>
  <div style="background:#f7f9fa;width:100%;">
    <div class="content">
      <!-- 面包屑 -->
      <div class="crumbs">
        教学包&nbsp;/&nbsp;发布
      </div>
      <div class="main-box">
        <div class="main-title">
          教学包发布
        </div>
        <div>
          <el-form ref="form" label-width="100px">
            <el-form-item label="教学包标题：" class="title-block">
              <el-input v-model="packageTitle"></el-input>
            </el-form-item>
            <!-- <el-form-item label="创建封面：" class="upload">
              <images-uploader
                ref="imgUploader"
                @selected="addImages"
              ></images-uploader>
            </el-form-item> -->
            <el-form-item label="教学包描述：">
              <el-input type="textarea" v-model="packageIntro"></el-input>
            </el-form-item>
            <el-form-item label="学习方向：">
              <div class="block">
                <el-cascader
                  v-model="directValue"
                  :options="directList"
                  :props="props"
                  @change="setDirection()"
                ></el-cascader>
                <!-- :props="{ expandTrigger: 'hover' }" -->
              </div>
            </el-form-item>

            <el-form-item label="实用层次：">
              <el-select v-model="packageLevel" @change="setLevel">
                <el-option label="中职" value="1"></el-option>
                <el-option label="高职" value="2"></el-option>
                <el-option label="本科及以上" value="3"></el-option>
                <el-option label="其他" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否收费：" class="payment">
              <el-switch
                style="display: inline-block"
                v-model="paymentTypeSwitch"
                active-color="#13ce66"
                inactive-color="#ccc"
              >
              </el-switch>
              <div class="price" v-if="paymentTypeSwitch == true">
                <el-input placeholder="" v-model="payBodou" type="number">
                  <template slot="append">博豆</template>
                </el-input>
                <span class="text">或</span>
                <el-input placeholder="" v-model="payRmb" type="number">
                  <template slot="append">人民币</template>
                </el-input>
              </div>
            </el-form-item>

            <el-form-item class="btns">
              <el-button @click="cancelSubmit">取消</el-button>
              <el-button type="primary" @click="onSubmit">保存</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Categories } from '@/api/categories'
import { ResourceAddPackage, PackageOperate } from '@/api/resource'

interface formInterface {
  // directionStudy: null
}
@Component
export default class ResourceAdd extends Vue {
  public packageTitle: string = '' //资源包名称
  public packageIntro: string = '' //资源包介绍
  public packageLevel: any = '' //适用层级
  public paymentType: string = '' //收费类型
  public paymentTypeSwitch: boolean = false
  public directList: any = [] //三级类别
  public direct: any = '' //选中类别
  public directSelected: any = '' //选中的学习类别第三级 例如16
  public directValue: any = [] //选中的三级  例如[1,6,16]
  public packageId: any //编辑时获取的packid
  public editIs: boolean = false //编辑还是新增
  public editCateArr: Array<number> = [] // 编辑时获取的 [1,6,16]
  public props = {
    value: 'id',
    label: 'name',
    children: 'children',
    expandTrigger: 'hover' //方式
  }
  public imgCover: string =
    'https://imgs.gamersky.com/upimg/2020/202001051233012024.jpg' //上传封面
  public payBodou: number = 0 //博豆支付
  public payRmb: number = 0 //人民币支付
  public price: number = 0 //价格

  // 判断是新增还是添加
  async created() {
    this.directList = await Categories.getCategoriesList()
    this.packageId = this.$route.query.packageId
    if (this.packageId) {
      //编辑
      this.getEditPageDetail()
    }
  }

  //编辑页面的数据详情获取
  getEditPageDetail() {
    PackageOperate.editPackage(this.packageId).then((res: any) => {
      this.packageTitle = res.info.name
      this.packageIntro = res.info.intro
      this.packageLevel = res.info.education
      this.directSelected = res.info.category_id
      this.directValue = this.getEditCategoriesArr(this.directSelected)
    })
  }

  // 已知子节点获取父节点课程分类数组
  getEditCategoriesArr(id: number) {
    let ret: any = []
    this.directList.forEach((rec: any) => {
      rec.children &&
        rec.children.forEach((rr: any) => {
          rr.children &&
            rr.children.forEach((r: any) => {
              if (r.id === id) {
                ret = [rec.id, rr.id, r.id]
              }
            })
        })
    })
    return ret
  }
  // 递归获取编辑页面下的学习方向选中数组
  // getEditFatherCategoriesArr(id: number) {
  //   PackageOperate.getEditPackageFatherCategories(id).then((res: any) => {
  //     if (res.parent_id != 0) {
  //       this.editCateArr.unshift(res.parent_id)
  //       this.getEditFatherCategoriesArr(res.parent_id)
  //     }
  //   })
  // }

  // 选择学习方向
  setDirection() {
    this.directSelected = this.directValue[
      Object.keys(this.directValue)[Object.keys(this.directValue).length - 1]
    ]
  }
  // 设置适用层次
  public setLevel(val: number): void {
    this.packageLevel = val
  }
  // 页面提交
  onSubmit() {
    if (this.payBodou !== 0) {
      this.paymentType = 'both'
      this.price = this.payBodou
    }
    if (this.payRmb !== 0) {
      this.paymentType = 'rmb'
      this.price = this.payRmb
    } else {
      this.paymentType = ''
    }
    const formPost = {
      name: this.packageTitle,
      intro: this.packageIntro,
      education: this.packageLevel,
      category_id: this.directSelected,
      payment_type: this.paymentType,
      price: this.price,
      cover: this.imgCover
    }

    let msgText = '发布资源包成功'
    if (this.packageId) {
      // 编辑
      PackageOperate.editPackageSave(this.packageId, formPost)
      msgText = '资源包更新成功'
    } else {
      ResourceAddPackage.addPackage(formPost)
    }
    const router = this.$router
    this.$message({
      type: 'success',
      message: msgText,
      duration: 1200,
      onClose: function() {
        router.push({ path: '/resource' })
      }
    })
  }

  // 取消提交
  cancelSubmit() {
    this.$router.push({
      path: '/resource',
      query: {
        type: 'release'
      }
    })
  }
  // data() {
  //   return {
  //     value: [],
  //     edit: 0,
  //     editData: [],
  //     userid: null,
  //
  //     form: {
  //       region: '',
  //       type: [],
  //       resource: '',
  //       desc: '',
  //       pay_bodou: 0,
  //       pay_rmb: 0,
  //       price: 0 // 实际支付
  //     },
  //     imageUrl: '',
  //     input: '',
  //     chargeList: []
  //   }
  // },
  // created() {
  //   if (this.userid !== undefined) {
  //     Resource.ResourcePackage.editResource(this.userid)
  //       .then(rec => {
  //         this.form.pay_rmb = rec.info.price
  //         if (this.form.pay_rmb > 0) {
  //           this.form.payment_type = true
  //         }
  //         this.form.pay_bodou = rec.info.points
  //         arrDirection.push(Number(rec.category_parent.one_catid))
  //         arrDirection.push(Number(rec.category_parent.two_catid))
  //         arrDirection.push(Number(rec.category_parent.three_catid))

  //         this.direction = arrDirection
  //         this.form.directionStudy = Number(rec.category_parent.three_catid)
  //       })
  //       .catch(rec => {
  //       })
  //   } else {
  //     this.edit = 0
  //   }
  // },
  // mounted() {
  //   this.getDirectionStudy()
  // },
  // methods: {
  //   onSubmit() {
  //     const payRmb = this.form.pay_rmb
  //     const payBodou = this.form.pay_bodou
  //     if (payRmb > 0) {
  //       this.form.price = payRmb
  //       this.form.payment_type = 'rmb'
  //     }
  //     if (payBodou > 0) {
  //       this.form.price = payBodou
  //       this.form.payment_type = 'both'
  //     }
  //
  //     // 新增接口
  //     if (this.edit === 0) {
  //       Resource.ResourcePackage.addResource(postObj)
  //         .then(rec => {
  //           this.$message({
  //             message: '添加成功',
  //             type: 'success'
  //           })
  //           setTimeout(() => {
  //             this.$router.push({
  //               path: `/resource/myResource/${rec.id}?type=course`
  //             })
  //           }, 1500)
  //         })
  //         .catch(err => {
  //           this.$message({
  //             message: err.data.message,
  //             type: 'error'
  //           })
  //         })
  //     } else {
  //       // 编辑保存接口
  //       Resource.ResourcePackage.editResourceSave(this.userid, postObj)
  //         .then(rec => {
  //           this.$message({
  //             message: '修改成功',
  //             type: 'success'
  //           })
  //           setTimeout(() => {
  //             this.$router.push({
  //               path: `/resource/myResource/${rec.id}?type=course`
  //             })
  //           }, 1500)
  //         })
  //         .catch(err => {
  //           this.$message({
  //             message: err.data.message,
  //             type: 'error'
  //           })
  //         })
  //     }
  //   },
}
</script>

<style lang="scss" scoped>
.content {
  width: 1000px;
  margin: 0 auto;
  margin-bottom: 140px;
  .crumbs {
    margin: 20px 0;
    color: #8b9199;
    font-size: 12px;
    font-weight: 400;
  }
  .main-box {
    background: #fff;
    padding: 30px 50px;
    .main-title {
      color: #0a121a;
      font-size: 14px;
      font-weight: bold;
      margin-bottom: 45px;
    }
    .title-block {
      // ::v-deep .el-input__inner {
      //   width: 400px;
      // }
    }
    .upload {
      margin-bottom: 10px;
    }
    .bodou,
    .charge {
      display: inline-block;
      margin-left: 40px;
      ::v-deep .el-input {
        width: 80px;
        margin-left: 20px;
      }
    }
    .payment {
      .price {
        margin-left: 40px;
        display: inline;
        ::v-deep .el-input-group--append {
          width: 160px;
        }
        .text {
          margin: 0 15px;
        }
        ::v-deep input::-webkit-outer-spin-button,
        ::v-deep input::-webkit-inner-spin-button {
          -webkit-appearance: none;
        }
        ::v-deep input[type='number'] {
          -moz-appearance: textfield;
        }
      }
    }

    ::v-deep .el-form-item__label {
      text-align: left;
    }
    ::v-deep .el-textarea__inner {
      height: 150px;
    }
    ::v-deep .el-input--suffix .el-input__inner {
      width: 200px;
    }
    ::v-deep .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    ::v-deep .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    ::v-deep .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .btns {
      margin-top: 55px;
      ::v-deep .el-button {
        width: 90px;
        height: 40px;
        line-height: 18px;
      }
      ::v-deep .el-button--default {
        background: #8b9199;
        color: #fff;
        border-color: #8b9199;
      }
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
}
</style>
