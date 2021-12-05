<template>
  <div class="wrap">
    <div class="filters">
      <div class="tag-wrap">
        <div class="filter-category" v-for="category in this.allCategories" :key="category">
          <input @change="applyFilter(category)" class="checkbox" type="checkbox" value="" id="defaultCheck1">
          <label>{{ category }}</label>
        </div>
      </div>
    </div>
    <div class="filter-title">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
      </svg>
      check to apply filter(s) and include any summaries with a selected category
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
      </svg>
    </div>
    <div class="summaries-wrap">
      <div v-for="summary in filteredCategories" v-bind:key="summary.id" class="summary-object">
        <div v-show="!summary.bookmarked" class="bookmark">
          <svg v-if="!summary.editing" @click="edit(summary)" xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-pencil edit" viewBox="0 0 16 16">
            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
          </svg>
          <svg v-if="summary.editing" @click="save(summary)" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-check-lg edit" viewBox="0 0 16 16">
            <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
            <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
          </svg>
          <svg @click="toggleBookmark(summary)" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-bookmark icon" viewBox="0 0 16 16">
            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
          </svg>
        </div>
        <div  v-show="summary.bookmarked" class="bookmark">
          <svg v-if="!summary.editing" @click="edit(summary)" xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-pencil edit" viewBox="0 0 16 16">
            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
          </svg>
          <svg v-if="summary.editing" @click="save(summary)" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-check-lg edit" viewBox="0 0 16 16">
            <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
            <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
          </svg>
          <svg @click="toggleBookmark(summary)" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#3f4a60" class="bi bi-bookmark-fill icon" viewBox="0 0 16 16">
            <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z"/>
          </svg>
        </div>
        <div v-if="summary.editing">
          <input type="text" class="form-control title" id="FormControlInput1" v-model="newTitle">
        </div>
        <div v-if="!summary.editing" class="title">
          {{ summary.title }}
        </div>
        <div v-if="summary.editing">
          <textarea class="form-control description" id="FormControlInput2" rows="3" v-model="newDescription"></textarea>
        </div>
        <div v-if="!summary.editing" class="description">
          {{ summary.description }}
        </div>
        <div class="date">
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" class="bi bi-calendar-event calendar" viewBox="0 0 16 16">
            <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z"/>
            <path d="M6.5 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-9 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm3 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>          </svg>{{ summary.dateAdded }}
        </div>
        <div class="categories">
          <div v-for="category in summary.categories" v-bind:key="category" class="category-text">
            #{{ category }}
          </div>
        </div>
        <div  class="bookmark">
          <svg @click="deleteSummary(summary)" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-trash icon" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Summaries",
  data() {
    return {
      filterApplied: false,
      categories: [],
      allCategories: [],
      summaries: [],
      newCategory: '',
      editing: false,
      newTitle: '',
      newDescription: '',
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
    async getSummaries() {
      try{
        let summaries = await axios.get("/api/summaries");
        this.summaries = summaries.data;
        console.log(this.summaries);
      }catch(error){
        console.log(error);
        return false;
      }
    },
     async toggleBookmark(summary) {
      try{
        let newSummary = await axios.put('/api/summaries/' + summary._id + '/bookmark', {
          bookmarked: !summary.bookmarked,
        });
        await this.getSummaries();
        console.log(newSummary);
        return true;
      }catch(error) {
        console.log(error);
      }
    },
    async deleteSummary(summary) {
      try{
        await axios.delete('/api/summaries/' + summary._id);
        await this.getSummaries();
        return true;
      }catch(error){
        console.log(error);
        return false;
      }
    },
    async addNewCategory() {
      try{
        debugger;
        await axios.put('/api/categories/', {
          newCategory: this.newCategory
        });
      }catch(error){
        console.log(error);
        return false;
      }
    },
    async getCategories() {
      try{
        let gotCategories = await axios.get('/api/categories/');
        console.log(gotCategories.data[0].allCategories);
        this.allCategories = gotCategories.data[0].allCategories;
      }catch(error){
        console.log(error);
        return false;
      }
    },
    async edit(summary) {
      try{
        if(!summary.editing){
          this.newTitle = summary.title;
          this.newDescription = summary.description;
        }
        let newSummary = await axios.put('/api/summaries/' + summary._id +'/edit', {
          editing: !summary.editing,
        });
        await this.getSummaries();
        console.log(newSummary);
        return true;
      }catch(error) {
        console.log(error);
      }
    },
    async save(summary) {
      try{
        let newSummary = await axios.put('/api/summaries/' + summary._id, {
          title: this.newTitle,
          description: this.newDescription,
          editing: !summary.editing,
        });
        await this.getSummaries();
        console.log(newSummary);
        this.newTitle = '';
        this.newDescription = '';
        return true;
      }catch(error) {
        console.log(error);
      }
    }
  },
  computed: {
    filteredCategories() {
      if(!this.categories){
        return this.summaries;
      }

      if(this.filterApplied){
        let filtered = this.summaries.filter((summary) => {
          console.log(summary.categories);
          console.log(this.categories);
          return this.categories.every(val => summary.categories.includes(val));
          // return summary.categories.join(',').includes(this.categories.join(','));
        });
        console.log(filtered);
        return filtered;
      }
      else {
        return this.summaries;
      }
    }
  },
  created() {
    this.getSummaries();
    this.getCategories();
  }
}
</script>

<style scoped>

.calendar{
  margin-right: 8px;
}

.edit{
  margin-right: 40px;
  cursor: pointer;
}

.tag-wrap{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

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
  flex-direction: column;
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
  cursor: pointer;
}

.button-category{
  background-color: #3f4a60;
  color: white;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
  margin-left: 5px;
}

.summary-object{
  margin-top: 45px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  margin-right: auto;
  margin-left: auto;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  /*border-left: 4px solid lightgrey;*/
  padding: 15px;
  border-radius: 5px;

}

.bookmark {
  text-align: right;
}

.icon{
  cursor: pointer;
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
  font-size: 12px;
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