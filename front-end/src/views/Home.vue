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
  // eslint-disable-next-line vue/multi-word-component-names
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

footer{
  position: fixed;
  bottom: 0;
  left: 50%;
  margin-left: -100px;
}
</style>
