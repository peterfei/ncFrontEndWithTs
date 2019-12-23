import Request from '@/utils/request'
const moocModuleBasedUrl = 'mooc';

const moocPackageUrl = `${moocModuleBasedUrl}/packages`;// 课程包列表
// export const Cloud = {
//   getList(params:any) {
//     return Request.xget(
//       '/api/mooc/packages',
//       params
//     )
//   }
// }
export const MoocList = {
  // 课程包列表
  getList(params:any) {
    const url = `${moocPackageUrl}`;
    return Request.get(url,params)
  },
};

export default {
  MoocList,
};


// const moocPackageUrl = `${moocModuleBasedUrl}/packages`;// 课程包列表