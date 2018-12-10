import Layout from '@/views/layout/Layout'

export default {
  path: '/product',
  component: Layout,
  redirect: '/product/list',
  name: 'Product',
  meta: {
    title: 'product',
    icon: 'product'
  },
  children: [
    {
      path: 'add',
      component: () => import('@/views/product/product/create'),
      name: 'CreateProduct',
      meta: { title: 'createProduct', icon: 'edit' },
      hidden: true
    },
    {
      path: 'update/:id(\\d+)',
      component: () => import('@/views/product/product/edit'),
      name: 'EditProduct',
      meta: { title: 'editProduct', noCache: true },
      hidden: true
    },
    {
      path: 'list',
      component: () => import('@/views/product/product/list'),
      name: 'ProductList',
      meta: { title: 'productList', icon: 'list' }
    }
  ]
}
