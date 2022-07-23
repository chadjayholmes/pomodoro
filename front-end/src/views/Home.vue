<template>
  <div>
    <pomodoro></pomodoro>
  </div>
</template>

<script>
import Pomodoro from '../components/Pomodoro.vue'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Home',
  components: {
    Pomodoro,
  }
}
</script>

<style scoped>
* {
  background-color: white;
}

</style>
