<template>
  <div>
    <div class="summaries-wrap">
      <div class="message" v-show="bookmarked.length === 0">
        Click the
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-bookmark icon" viewBox="0 0 16 16">
        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
        </svg>
        icon in
        <router-link class="link-text" to="/MySummaries">All Summaries</router-link>
        to bookmark a summary.
      </div>
      <div v-show="bookmarked.length !== 0">
        Click the
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#3f4a60" class="bi bi-bookmark-check icon" viewBox="0 0 16 16">
          <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/>
        </svg>
        icon in
        <router-link class="link-text" to="/MySummaries">All Summaries</router-link>
        to un-bookmark a summary.
      </div>
      <div v-for="summary in bookmarked" v-bind:key="summary" class="summary-object">
        <div class="title">
          {{ summary.title }}
        </div>
        <div class="description">
          {{ summary.description }}
        </div>
        <div class="date">
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" class="bi bi-calendar-event calendar" viewBox="0 0 16 16">
            <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z"/>
            <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>          </svg>
            {{ summary.dateAdded }}
        </div>
        <div class="categories">
          <div v-for="category in summary.categories" v-bind:key="category" class="category-text">
            #{{ category }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {

  // eslint-disable-next-line vue/multi-word-component-names
  name: "MyBookmarks",
  data() {
    return{
      bookmarked: []
    }
  },
  async mounted() {
    let res = await axios.get('/api/summaries/', {
      params: {
        user: this.$auth.user.email,
      }
    });
    let  summaries = res.data;
    this.bookmarked = summaries.filter((summary) => {
      return summary.bookmarked
    });

    /*for(let i = 0; i < this.$root.$data.summaries.length; i++){
      if(this.$root.$data.summaries[i].bookmarked){
        this.bookmarked.push(this.$root.$data.summaries[i])
      }
    }*/
  }
}
</script>

<style scoped>

.calendar{
  margin-right: 8px;
}

.summary-object{
  margin-top: 45px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  margin-right: auto;
  margin-left: auto;
  /*border-left: 4px solid lightgrey;*/
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  padding: 15px;
  border-radius: 5px;

}

.title{
  text-align: left;
  font-weight: bold;
  margin-bottom: 10px;
}

.description {
  text-align: left;
  margin-bottom: 30px;
}

.date {
  text-align: left;
  margin-bottom: 10px;
}

.categories {
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
}

.category-text {
  margin-right: 10px;
  font-style: italic;
  font-size: 12px;
}

.message {
  width: 50%;
  margin-right: auto;
  margin-left: auto;
}

.link-text{
  margin: 0;
}

.icon{
  margin-left: 3px;
  margin-right:3px;
}

@media only screen and (max-width: 600px){
  .summary-object{
    width: 90%;
  }

  .message {
    width: 90%;
  }

}

</style>
