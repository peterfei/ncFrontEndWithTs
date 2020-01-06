import Layout from '@/views/layout/LayoutPage.vue'
// import Register from '@/views/loginReg/index.vue'
import ProFileBox from '@/views/proFile/ProFile.vue'

const ProFileModule = {
  path: '/profile',
  name: '',
  component: Layout,
  children: [
    {
      path: '/',
      name: 'profile',
      component: ProFileBox
    }
    // {
    //   path: '/login/:type',
    //   name: 'loginName',
    //   component: LoginBox
    // }
  ]
}
export default { ProFileModule }
