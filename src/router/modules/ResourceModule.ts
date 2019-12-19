import Layout from '@/views/layout/LayoutPage.vue'
import ResourceList from '@/views/resource/resourceList/resourceList.vue'
// import ResourceDetail from '@/views/resource/resourceDetail/resourceDetail.vue'
import ResourceAdd from '@/views/resource/resourceAdd/resourceAdd.vue'
// import MyResource from '@/views/resource/myResource/myResource.vue'
// import ResourceOrder from '@/views/resource/resourceOrder/resourceOrder.vue'

const ResourceModule = {
  path: '/resource',
  name: '',
  component: Layout,
  children: [
    {
      path: '',
      name: 'Resource',
      component: ResourceList
    },
    // {
    //   path: 'resourcedetail/:id',
    //   name: 'ResourceDetail',
    //   component: ResourceDetail,
    // },
    {
      path: 'addpackage',
      name: 'add',
      component: ResourceAdd
    }
    // {
    //   path: 'myresource/:id',
    //   name: 'my',
    //   component: MyResource,
    // },
    // {
    //   path: 'resourceorder/:id',
    //   name: 'order',
    //   component: ResourceOrder,
    // },
  ]
}
export default { ResourceModule }
