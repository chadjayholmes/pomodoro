<template>
  <div id="app">
    <div id="nav">
      <router-link class="link-text" to="/">Pomodoro</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav{
  font-size: 60px;
  color: #2c3e50;
  margin-top: 80px;
}

.link-text{
  color: #2c3e50;
}


</style>
