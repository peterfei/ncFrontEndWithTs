import Layout from '@/views/layout/LayoutPage.vue'
import ResourceList from '@/views/resource/resourceList/ResourceList.vue'
import ResourceDetail from '@/views/resource/resourceDetail/ResourceDetail.vue'
import ResourceAdd from '@/views/resource/resourceAdd/ResourceAdd.vue'
import ResourceOrder from '@/views/resource/resourceOrder/ResourceOrder.vue'
import MyResource from '@/views/resource/myResource/MyResource.vue'
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
    {
      path: 'resourcedetail/:id',
      name: 'ResourceDetail',
      component: ResourceDetail
    },
    {
      path: 'addpackage',
      name: 'add',
      component: ResourceAdd
    },
    {
      path: 'order/:id',
      name: 'order',
      component: ResourceOrder
    },
    {
      path: 'myresource/:id',
      name: 'myresource',
      component: MyResource
    }
  ]
}
export default { ResourceModule }
