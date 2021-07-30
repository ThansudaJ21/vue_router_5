<template>
  <div v-if="GStore.passenger">
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
    <router-view :passenger="GStore.passenger" />
  </div>
</template>

<script>
// import PassengerService from '@/services/PassengerService.js'

export default {

  inject: ['GStore']
}
</script>

