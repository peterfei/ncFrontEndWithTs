import Layout from '@/views/layout/LayoutPage.vue'
import CloudList from '@/views/cloud/cloudList/CloudList.vue'
import CloudDetail from '@/views/cloud/cloudDetail/index.vue'

const CloudModule = {
  path: '/cloud',
  name: '',
  component: Layout,
  children: [
    {
      path: '',
      name: 'cloud',
      component: CloudList
    },
    {
      path: 'clouddetail/packages/:pkgId/',
      name: 'CloudDetail',
      component: CloudDetail,
      meta: {
        title: '首页'
      }
    }
  ]
}
export default { CloudModule }
