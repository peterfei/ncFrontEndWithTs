import Layout from '@/views/layout/LayoutPage.vue'
// import Register from '@/views/loginReg/index.vue'
import ProfileBox from '@/views/profile/Profile.vue'

const ProfileModule = {
  path: '/profile',
  name: '',
  component: Layout,
  children: [
    {
      path: '/',
      name: 'profile',
      component: ProfileBox
    }
    // {
    //   path: '/login/:type',
    //   name: 'loginName',
    //   component: LoginBox
    // }
  ]
}
export default { ProfileModule }
