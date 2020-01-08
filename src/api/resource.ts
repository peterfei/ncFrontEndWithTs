import Request from '@/utils/request'
const moduleBasedUrl = 'resource_library'
const resourceUrl = `/api/resource_library` // 课程

const ResourcePackageList = {
  getPackageList(obj: any): Promise<any> {
    const url = `${resourceUrl}`

    return Request.get(url, obj)
  }
}
const ResourceAddPackage = {
  addPackage(postObj: any) {
    const url = `${resourceUrl}/add`
    return Request.post(url, postObj)
  }
}

const PackageOperate = {
  deletePackage(id: number) {
    const url = `${resourceUrl}/destroy/${id}`
    return Request.delete(url)
  },

  // getEditPackageFatherCategories(id: number) {
  //   const url = `/api/categories/${id}`
  //   return Request.get(url)
  // },

  editPackage(id: number) {
    const url = `${resourceUrl}/${id}/edit`
    return Request.get(url)
  },

  editPackageSave(id: number, params: any) {
    const url = `${resourceUrl}/${id}/update`
    return Request.post(url, params)
  }
}
export { ResourcePackageList, ResourceAddPackage, PackageOperate }
