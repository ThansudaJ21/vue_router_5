import { createRouter, createWebHistory } from 'vue-router'
import PassengerList from '../views/PassengerList.vue'
import About from '../views/About.vue'
import PassengerDetails from '../views/Passenger/Details.vue'
import PassengerLayout from '../views/Passenger/Layout.vue'
import PassengerEdit from '../views/Passenger/Edit.vue'
import NotFound from '@/views/Passenger/NotFound.vue'
import Airline from '@/views/Passenger/Airline.vue' 
import NProgress from 'nprogress'
import PassengerService from '../services/PassengerService'
import GStore from '@/store'
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
    beforeEnter: (to) => {
      // put API call here
      return PassengerService.getPassenger(to.params.id) //Return and params.id
        .then(response => {
          //still nees to set the data here
          GStore.passenger = response.data //<---- Store data here
        })
        .catch((error) => {
          if (error.response && error.response.status == 204) {
            return {
              name: '404Resource',
              params: { resource: 'passenger' }
            }
          } else {
            return { name: 'NetworkError' }
          }
        })

    },
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
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach(() => {
  NProgress.start()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
