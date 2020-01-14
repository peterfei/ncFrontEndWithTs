import Layout from '@/views/layout/LayoutPage.vue'
import BackendCloud from '@/views/backendCloud/index.vue'
import BackendCloudGuide from '@/views/backendCloud/guideCloud.vue'
import Guide from '@/views/backendCloud/components/guide.vue'
import Teaching from '@/views/backendCloud/components/teaching.vue'
import Course from '@/views/backendCloud/components/course.vue'

// import CloudDetail from '@/views/cloud/cloudDetail/index.vue'

const BackendCloudModule = {
  path: '/backend_cloud',
  name: '',
  component: Layout,
  children: [
    {
      path: '/',
      // name: 'backend_cloud',
      component: BackendCloud
    },
    {
      path: 'guide',
      // name: 'backend_cloud_guide',
      component: BackendCloudGuide,
      children: [
        {
          path: '/',
          component: Guide
        },
        {
          path: 'teaching',
          name: 'teaching',
          component: Teaching
        },
        {
          path: 'course',
          name: 'course',
          component: Course
        }
      ]
    }
  ]
}
export default { BackendCloudModule }
