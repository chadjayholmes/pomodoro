<template>
  <div class="wrap">
    <div class="filters">
      <div class="filter-category" v-for="category in this.$root.$data.categories" :key="category">
        <input @change="applyFilter(category)" class="checkbox" type="checkbox" value="" id="defaultCheck1">
        <label>{{ category }}</label>
      </div>
    </div>
    <div class="filter-title">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
      </svg>check to apply filter(s) and include any summaries with a selected tag<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
    </svg>
    </div>
    <div class="summaries-wrap">
      <div v-for="summary in filteredCategories" v-bind:key="summary" class="summary-object">
        <div @click="toggleBookmark(summary)" v-show="!summary.bookmarked" class="bookmark">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-bookmark" viewBox="0 0 16 16">
            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
          </svg>
        </div>
        <div @click="toggleBookmark(summary)" v-show="summary.bookmarked" class="bookmark">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-bookmark-check" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
          </svg>
        </div>
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
  name: "Summaries",
  data() {
    return {
      filterApplied: false,
      categories: []
    }
  },
  methods: {
    applyFilter(category){
      let exists = false;
      for(let i = 0; i < this.categories.length; i++){
        if(this.categories[i] === category){
          exists = true;
          console.log("caught a repeat");
          this.categories.splice(i, 1);
        }
      }
      if(!exists){
        this.categories.push(category)
        this.filterApplied = true;
      }
    },
    toggleBookmark(summary) {
      summary.bookmarked = !summary.bookmarked;
    }
  },
  computed: {
    filteredCategories() {
      if(!this.categories.length){
        return this.$root.$data.summaries;
      }
      let filtered = []
      if(this.filterApplied){
        for(let i = 0; i < this.categories.length; i++){
          for(let j = 0; j < this.$root.$data.summaries.length; j++){
            if(this.$root.$data.summaries[j].categories.includes(this.categories[i])){
              if(!filtered.includes(this.$root.$data.summaries[j])){
                filtered.push(this.$root.$data.summaries[j])
              }
            }
          }
        }
        return filtered;
      }
      else {
        return this.$root.$data.summaries;
      }
    }
  }
}
</script>

<style scoped>

.wrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.filter-title {
  text-align: center;
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  font-weight: 500;
}

.filters {
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  border: 2px solid lightslategrey;
  border-radius: 25px;
  padding: 15px;
  margin-bottom: 2px;
}

.filter-category {
  width: auto;
  margin-right: 15px;
}

.checkbox {
  margin-right: 5px;
}

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

.bookmark {
  text-align: right;
  cursor: pointer;
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

@media only screen and (max-width: 600px){
  .summary-object{
    width: 90%;
  }

}
</style>