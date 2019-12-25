import Layout from '@/views/layout/LayoutPage.vue'
import CourseList from '@/views/course/courseList/CourseList.vue'
import CourseDetail from '@/views/course/courseDetail/CourseDetail.vue'

const CoursesModule = {
  path: '/course',
  name: '',
  component: Layout,
  children: [
    {
      path: '',
      name: 'Course',
      component: CourseList
    },
    {
      path: 'coursedetail/:id',
      name: 'Detail',
      component: CourseDetail
    }
  ]
}
export default { CoursesModule }
