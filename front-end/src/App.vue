<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">Pomodoro</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item" >
            <router-link v-if="this.$router.currentRoute.path === '/'" class="nav-link active" to="/">
            Timer
            </router-link>
            <router-link v-if="this.$router.currentRoute.path !== '/'" class="nav-link" to="/">
            Timer
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link active" to="/Summarize" v-if="$auth.isAuthenticated &&
            this.$router.currentRoute.path === '/Summarize'">
            New Summary
            </router-link>
            <router-link class="nav-link" to="/Summarize" v-if="$auth.isAuthenticated &&
            this.$router.currentRoute.path !== '/Summarize'">
            New Summary
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link active" to="/MySummaries" v-if="$auth.isAuthenticated &&
            this.$router.currentRoute.path === '/MySummaries'">
            All Summaries
            </router-link>
            <router-link class="nav-link" to="/MySummaries" v-if="$auth.isAuthenticated &&
            this.$router.currentRoute.path !== '/MySummaries'">
            All Summaries
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link active" to="/Bookmarked" v-if="$auth.isAuthenticated &&
            this.$router.currentRoute.path === '/Bookmarked'">
            Bookmarked
            </router-link>
            <router-link class="nav-link" to="/Bookmarked" v-if="$auth.isAuthenticated &&
            this.$router.currentRoute.path !== '/Bookmarked'">
            Bookmarked
            </router-link>
          </li>
        </ul>
        <ul class="nav navbar-nav navbar-right ml-auto">
          <li class="nav-item login-item">
            <div v-if="!$auth.loading">
            <!-- show login when not authenticated -->
              <a v-if="!$auth.isAuthenticated" @click="login" class="nav-link sign-in">Sign-in / Register</a>
              <a v-if="$auth.isAuthenticated" @click="logout" class="nav-link sign-out">Sign out</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
    </nav>
    <router-link class="link-text pomodoro" to="/">Pomodoro</router-link>
    <router-view/>
  </div>
</template>


<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Nav',
  methods: {
    // Log the user in
    login() {
      this.$auth.loginWithRedirect();
    },
    // Log the user out
    async logout() {
      const isSure = confirm('Are you sure you want to sign out?');
      if (isSure) {
        await this.$auth.logout({
          returnTo: window.location.origin
        });
        alert('You have successfully signed out');
      }
    }
  }
}
</script>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav{
  display: flex;
  flex-direction: column;
  font-size: 60px;
  color: #708090;
}

.navbar{
  margin-bottom: 5vh;
}

.pomodoro{
  font-size: 60px;
}


router-link:hover{
  text-decoration: underline;

}

/* .collapse{
  justify-content: center !important;
} */



.sign-in:hover, .sign-out:hover{
  color: blue !important;
  cursor: pointer;
  text-decoration: underline !important;
}


.link-text{
  color: #3f4a60;
  font-weight: bold;
  margin-bottom: 0 !important;
  margin-top: 50px !important;
}

.sub-links {
  display: flex;
  justify-content: center;
  align-items: center;
}
.my-summaries-link{
  display: flex;
  margin-left: 25px;
}

@media only screen and (max-width: 600px){
  .sub-links{
    flex-direction: column;
  }
  .my-summaries-link{
    margin-left: 0px;
  }
  .link-text{
    margin-bottom: 10px;
    text-decoration: underline;
  }
}



</style>
