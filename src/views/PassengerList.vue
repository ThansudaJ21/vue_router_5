<template>
  <h1>Events For Good</h1>
  <div class="events">
    <PassengerCard
      v-for="passenger in passengers"
      :key="passenger._id"
      :passenger="passenger"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import PassengerCard from '@/components/PassengerCard.vue'
import PassengerService from '@/services/PassengerService.js'
import NProgress from 'nprogress'

export default {
  name: 'Home',
  props: {
    page: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      required: true
    }
  },
  components: {
    PassengerCard // register it as a child component
  },
  data() {
    return {
      passengers: null,
      totalEvents: 0 // <--- Added thiss to store totalEvents
    }
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    NProgress.start()
    PassengerService.getPassengers(
      parseInt(routeTo.query.perPage) || 10,
      parseInt(routeTo.query.page) || 0
    )
      .then((response) => {
        next((comp) => {
          comp.passengers = response.data.data
          comp.totalEvents = response.headers['x-total-count']
        })
      })
      .catch(() => {
        next({ name: 'NetworkError' })
      })
      .finally(() => {
        NProgress.done()
      })
  },

  beforeRouteUpdate(routeTo, routeFrom, next) {
    NProgress.start()
    PassengerService.getPassengers(
      parseInt(routeTo.query.perPage) || 10,
      parseInt(routeTo.query.page) || 0
    )
      .then((response) => {
        next((comp) => {
          comp.passengers = response.data.data
          comp.totalEvents = response.headers['x-total-count']
        })
      })
      .catch(() => {
        next({ name: 'NetworkError' })
      })
      .finally(() => {
        NProgress.done()
      })
  },
  computed: {
    hasNextPage() {
      //First, calculate total pages
      let totalPages = Math.ceil(this.totalEvents / this.perPage) //this.size is event per pages
      //Then check to see if the current page is less than the tatal pages
      return this.page < totalPages
    }
  }
}
</script>
<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pagination {
  display: flex;
  width: 290 px;
}
.pagination a {
  flex: 1;
  text-decoration: none;
  color: #502c2c;
}

#page-prev {
  text-align: left;
  padding-right: 10px;
}
#page-next {
  text-align: right;
}
</style>
