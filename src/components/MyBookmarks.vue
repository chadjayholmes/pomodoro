<template>
  <div>
    <div class="summaries-wrap">
      <div v-show="bookmarked.length === 0">
        Click the
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-bookmark icon" viewBox="0 0 16 16">
        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
        </svg>
        icon in
        <router-link class="link-text" to="/MySummaries">All Summaries</router-link>
        to set a summary as bookmarked
      </div>
      <div v-show="bookmarked.length !== 0">
        Click the
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-bookmark-check icon" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
          <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
        </svg>
        icon in
        <router-link class="link-text" to="/MySummaries">All Summaries</router-link>
        to remove a summary from bookmarks
      </div>
      <div v-for="summary in bookmarked" v-bind:key="summary" class="summary-object">
        <div class="title">
          {{ summary.title }}
        </div>
        <div class="description">
          {{ summary.description }}
        </div>
        <div class="date">
          -- {{ summary.dateAdded }}
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
export default {
  name: "MyBookmarks",
  data() {
    return{
      bookmarked: []
    }
  },
  mounted() {
    for(let i = 0; i < this.$root.$data.summaries.length; i++){
      if(this.$root.$data.summaries[i].bookmarked){
        this.bookmarked.push(this.$root.$data.summaries[i])
      }
    }
  }
}
</script>

<style scoped>
.summary-object{
  margin-top: 45px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  margin-right: auto;
  margin-left: auto;
  border-left: 4px solid lightgrey;
  padding: 15px;
  border-radius: 25px;

}

.title{
  text-align: left;
  font-weight: bold;
  margin-bottom: 10px;
}

.description {
  text-align: left;
  margin-bottom: 10px;
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

.link-text{
  margin: 0;
}

.icon{
  margin-left: 3px;
  margin-right:3px;
}

</style>