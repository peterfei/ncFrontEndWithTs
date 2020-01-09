import Layout from '@/views/layout/LayoutPage.vue'
import FindPwd from '@/views/loginReg/FindPwd.vue'

const FindPwdModule = {
  path: '/findpwd',
  name: '',
  component: Layout,
  children: [
    {
      path: '',
      name: 'findpwd',
      component: FindPwd
    }
  ]
}

export default { FindPwdModule }
