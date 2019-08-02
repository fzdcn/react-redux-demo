import asyncComponent from '@/utils/asyncComponent'
const Index = asyncComponent(() => import('@/pages/index/Index'))
const Introduce = asyncComponent(() => import('@/pages/introduce/Introduce'))
const About = asyncComponent(() => import('@/pages/about/About'))
const Contact = asyncComponent(() => import('@/pages/contact/Contact'))
let Routers = [
  {
    path: '/index',
    name: 'index',
    component: Index,
    auth: true
  },
  {
    path: '/introduce',
    name: 'introduce',
    component: Introduce,
    auth: true
  },
  {
    path: '/about',
    name: 'about',
    component: About,
    auth: true
  },
  {
    path: '/contact',
    name: 'contact',
    component: Contact,
    auth: true
  }
]
export default Routers
