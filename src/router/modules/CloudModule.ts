import Layout from '@/views/layout/LayoutPage.vue'
import CloudList from '@/views/cloud/cloudList/CloudList.vue'
import CloudDetail from '@/views/cloud/cloudDetail/index.vue'

// import CourseIntroduction from '@/views/cloud/cloudDetail/CourseIntroduction.vue';
// import LearningSyllabus from '@/views/cloud/cloudDetail/LearningSyllabus.vue';

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
      // path: 'clouddetail/:id/packages/:course_id',
      path: 'clouddetail/packages/:pkgId/',
      name: 'CloudDetail',
      component: CloudDetail,
    }
  ]
}
export default { CloudModule }
