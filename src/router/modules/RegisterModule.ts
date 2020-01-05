import Layout from '@/views/layout/LayoutPage.vue'
// import Register from '@/views/loginReg/index.vue'
import RegBox from '@/views/loginReg/Register.vue'

const RegisterModule = {
  path: '/reg',
  name: '',
  component: Layout,
  children: [
    {
      path: '',
      name: 'regName',
      component: RegBox
    }
    // {
    //   path: '/login/:type',
    //   name: 'loginName',
    //   component: LoginBox
    // }
  ]
}
export default { RegisterModule }
