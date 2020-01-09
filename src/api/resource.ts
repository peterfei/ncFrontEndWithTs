import Request from '@/utils/request'
const moduleBasedUrl = 'resource_library'
const resourceUrl = `/api/resource_library` // 课程

const ResourcePackageList = {
  getPackageList(obj: any): Promise<any> {
    const url = `${resourceUrl}`

    return Request.get(url, obj)
  }
}
// 新增资源包接口
const ResourceAddPackage = {
  addPackage(postObj: any) {
    const url = `${resourceUrl}/add`
    return Request.post(url, postObj)
  }
}

// 教学包详情下的接口
const PackageDetail = {
  getDetail(id: number) {
    const url = `${resourceUrl}/${id}`
    return Request.get(url)
  }
}

// 针对教学包操作的
const PackageOperate = {
  deletePackage(id: number) {
    const url = `${resourceUrl}/destroy/${id}`
    return Request.delete(url)
  },

  // 编辑资源包
  editPackage(id: number) {
    const url = `${resourceUrl}/${id}/edit`
    return Request.get(url)
  },

  // 编辑资源包更新
  editPackageSave(id: number, params: any) {
    const url = `${resourceUrl}/${id}/update`
    return Request.post(url, params)
  }
}
export {
  ResourcePackageList,
  ResourceAddPackage,
  PackageOperate,
  PackageDetail
}
