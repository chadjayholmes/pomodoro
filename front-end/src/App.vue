<template>
  <div id="app">
    <div id="nav">
      <router-link class="link-text" to="/">Pomodoro</router-link>
    </div>
    <div class="sub-links">
      <router-link class="link-text new-summary-link" to="/">Focus</router-link>
      <router-link class="link-text my-summaries-link" to="/Summarize">New Summary</router-link>
      <router-link class="link-text my-summaries-link" to="/MySummaries">All Summaries</router-link>
      <router-link class="link-text my-summaries-link" to="/Bookmarked">Bookmarked</router-link>
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
  color: #708090;
  margin-top: 45px;
}

.link-text{
  margin-bottom: 45px;
  color: #3f4a60;
  font-weight: bold;
}

.sub-links {
  display: flex;
  justify-content: center;
  align-items: center;
}
.my-summaries-link{
  margin-left: 25px
}



</style>
