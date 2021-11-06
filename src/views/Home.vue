<template>
  <div>
    <pomodoro></pomodoro>
    <Footer></Footer>
  </div>
</template>

<script>
import Pomodoro from '../components/Pomodoro.vue'
import Footer from "../components/Footer";

export default {
  name: 'Home',
  components: {
    Pomodoro,
    Footer
  }
}
</script>

<style scoped>
* {
  background-color: white;
}
</style>