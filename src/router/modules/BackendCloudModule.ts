import Layout from '@/views/layout/LayoutPage.vue'
import BackendCloud from '@/views/backendCloud/index.vue'
import BackendCloudGuide from '@/views/backendCloud/guideCloud.vue'
import Guide from '@/views/backendCloud/components/guide.vue'
import Teaching from '@/views/backendCloud/components/teaching.vue'
import Course from '@/views/backendCloud/components/course.vue'
import TeachingContent from '@/views/backendCloud/components/teachingContent.vue'
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

      component: BackendCloudGuide,
      children: [
        {
          path: '/',
          name: 'backend_guide',
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
        },
        {
          path: 'teaching_content',
          name: 'teaching-content',
          component: TeachingContent
        }
      ]
    }
  ]
}
export default { BackendCloudModule }
