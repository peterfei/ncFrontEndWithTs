// import CourseEvaluation from '@/views/cloud/cloudDetail/CourseEvaluation.vue';
import Layout from '@/views/layout/LayoutPage.vue'
import CloudList from '@/views/cloud/cloudList/CloudList.vue'
import CloudDetail from '@/views/cloud/cloudDetail/index.vue';

// import CourseIntroduction from '@/views/cloud/cloudDetail/CourseIntroduction.vue';
// import LearningSyllabus from '@/views/cloud/cloudDetail/LearningSyllabus.vue';
// import CourseNotice from '@/views/cloud/cloudDetail/CourseNotice.vue';
// import ScoringRules from '@/views/cloud/cloudDetail/ScoringRules.vue';

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
      path: 'clouddetail/:id/packages/:course_id',
      name: 'CloudDetail',
      component: CloudDetail,
      // children: [
      //   {
      //     path: '',
      //     name: 'CourseIntroduction',
      //     component: CourseIntroduction,
      //   },
        // {
        //   path: 'introduction',
        //   name: 'CourseIntroduction',
        //   component: CourseIntroduction,
        // },
        // {
        //   path: 'syllabus',
        //   name: 'LearningSyllabus',
        //   component: LearningSyllabus,
        // },
        // {
        //   path: 'notice',
        //   name: 'CourseNotice',
        //   component: CourseNotice,
        // },
        // {
        //   path: 'rules',
        //   name: 'ScoringRules',
        //   component: ScoringRules,
        // },
        // {
        //   path: 'evaluate',
        //   name: 'CourseEvaluation',
        //   component: CourseEvaluation,
        // },
      // ],
    },
  ]
}
export default { CloudModule }
