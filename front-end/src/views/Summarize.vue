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
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Summarize',
  components: {
    NewSummary,
    Footer
  }
}
</script>

<style scoped>

</style>