import Layout from '@/views/layout/LayoutPage.vue'
import BackendCloud from '@/views/backendCloud/index.vue'
// import CloudDetail from '@/views/cloud/cloudDetail/index.vue'

const BackendCloudModule = {
  path: '/backend_cloud',
  name: '',
  component: Layout,
  children: [
    {
      path: '',
      name: 'backend_cloud',
      component: BackendCloud
    }
  ]
}
export default { BackendCloudModule }
