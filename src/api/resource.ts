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
export { ResourcePackageList, ResourceAddPackage }
