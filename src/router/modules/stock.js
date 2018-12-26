import Layout from '@/views/layout/Layout'

export default {
  path: '/stock',
  component: Layout,
  redirect: '/stock/list',
  name: 'Stock',
  meta: {
    title: 'stock',
    icon: 'stock'
  },
  children: [
    {
      path: 'add',
      component: () => import('@/views/stock/stock/create'),
      name: 'inStock',
      meta: { title: 'inStock', icon: 'edit' },
      hidden: true
    },
    {
      path: 'update/:id(\\d+)',
      component: () => import('@/views/stock/stock/edit'),
      name: 'EditStock',
      meta: { title: 'editStock', noCache: true },
      hidden: true
    },
    {
      path: 'list',
      component: () => import('@/views/stock/stock/list'),
      name: 'StockList',
      meta: { title: 'stockList', icon: 'list' }
    }
  ]
}
