<template>
  <div>
    <NewSummary></NewSummary>
    <Footer></Footer>
  </div>
</template>

<script>
import NewSummary from '../components/NewSummary.vue'
import Footer from '../components/Footer.vue'

export default {
  name: 'Summarize',
  components: {
    NewSummary,
    Footer
  }
}
</script>

<style scoped>

</style>