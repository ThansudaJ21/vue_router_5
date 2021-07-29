import { createRouter, createWebHistory } from 'vue-router'
import PassengerList from '../views/PassengerList.vue'
import About from '../views/About.vue'
import PassengerDetails from '../views/Passenger/Details.vue'
import PassengerLayout from '../views/Passenger/Layout.vue'
import PassengerEdit from '../views/Passenger/Edit.vue'
import NotFound from '@/views/Passenger/NotFound.vue'
import Airline from '@/views/Passenger/Airline.vue' 

const routes = [
  {
    path: '/',
    name: 'PassengerList',
    component: PassengerList,
    props: (route) => ({
      page: parseInt(route.query.page) || 0,
      perPage: parseInt(route.query.perPage) || 10
    })
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/passenger/:id',
    name: 'PassengerLayout',
    component: PassengerLayout,
    props: true,
    children: [
      {
        path: '',
        name: 'PassengerDetails',
        component: PassengerDetails
       
      },
      {
        path: '/passenger/:id/edit',
        name: 'PassengerEdit',
        component: PassengerEdit,
        props: true
      },
      {
        path: '/passenger/:id/airline',
        name: 'Airline',
        component: Airline,
        props: true
      }
    ]
  },
  {
    path: '/404/:resource',
    name: '404Resource',
    component: NotFound,
    props: true
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
