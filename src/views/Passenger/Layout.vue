<template>
  <div v-if="passenger">
    <div id="nav">
      <router-link :to="{ name: 'PassengerDetails', params: { id } }"
        >Details</router-link
      >|
      <router-link :to="{ name: 'Airline', params: { id } }"
        >Airline</router-link
      >
      |
      <router-link :to="{ name: 'PassengerEdit', params: { id } }"
        >Edit</router-link
      >
    </div>
    <router-view :passenger="passenger" />
  </div>
</template>

<script>
import PassengerService from '@/services/PassengerService.js'

export default {
  props: ['id'],
  data() {
    return {
      passenger: null
    }
  },
  created() {
    PassengerService.getPassenger(this.id)
      .then((response) => {
        this.passenger = response.data
        if (response && response.status == 204) {
          this.$router.push ({
            name: '404Resource',
            params: {resource: 'passenger'}
          })
        }
      })
      .catch(() => {
       
      })
  }
}
</script>

