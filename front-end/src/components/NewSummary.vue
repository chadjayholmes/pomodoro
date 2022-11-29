<template>
  <form class="wrapper">
    <div class="form-group">
      <label for="FormControlInput1">Study Topic</label>
      <input v-model="summary.title" type="text" class="form-control" id="FormControlInput1">
    </div>
    <div class="form-group">
      <label for="FormControlInput2" >Summary</label>
      <textarea v-model="summary.description" class="form-control" id="FormControlInput2" rows="6"></textarea>
    </div>
    <div class="form-group submit-button">
      <button class="submit" @click.prevent="addSummary">Add Summary</button>
    </div>
    <p>Select Category(s)</p>
    <div class="form-group categories" v-for="category in this.allCategories" :key="category">
      <input @change="appendCategory(category)" class="form-check-input" type="checkbox" value="" id="defaultCheck1">
      <label class="form-check-label" for="defaultCheck1">{{ category }}</label>
<!--      <div class="trash" @click="deleteCategory(category)">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
          <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg>
      </div>-->
    </div>
    <div class="new-category">
      <form @submit.prevent="addNewCategory">
        <input v-model="newCategory" class="category-input" type="text" placeholder="New Category">
        <button class="submit">Add</button>
      </form>
    </div>

  </form>
</template>

<script>
//import Summaries from 'Summaries'
import moment from 'moment';
import axios from 'axios';

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Summarize",
  components: {
    //Summaries
  },
  props: {

  },
  data() {
    return {
      summary: {
        title: '',
        description: '',
        categories: [],
        dateAdded: ''
      },
      allCategories: [],
      newCategory: '',
    }
  },
  methods: {
    async addSummary() {
      let tempCategories = []
      this.summary.categories.forEach(category => {
          tempCategories.push(category);
      })
      let date = moment( new Date().toJSON().slice(0, 10) ).format('MMMM Do YYYY')
/*
      let tempSummary = {title: this.summary.title, description: this.summary.description, categories: tempCategories, dateAdded: date}
*/
      try{
        await axios.post('api/summaries/', {
          user: this.$auth.user.email,
          title: this.summary.title,
          description: this.summary.description,
          categories: tempCategories,
          dateAdded: date,
          bookmarked: false,
          editing: false,
        });
        alert('Summary successfully added!');
      }catch(error){
        return
      }
      this.summary.title = '';
      this.summary.description = '';
      let myArray = document.getElementsByClassName("form-check-input")
      for(let i = 0; i < myArray.length; i++){
        if(myArray[i].checked === true){
          myArray[i].click();
        }
      }
    },
    appendCategory(category){
      let exists = false;
      for(let i = 0; i < this.summary.categories.length; i++){
        if(this.summary.categories[i] === category){
          exists = true;
          this.summary.categories.splice(i, 1);
        }
      }
      if(!exists){
        this.summary.categories.push(category)
      }
    },
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    async addNewCategory() {
      try{
        console.log('got here')
        console.log(this.$auth.user.email)
        await axios.post('/api/categories/', {
          user: this.$auth.user.email,
          newCategory: this.newCategory
        });
        this.allCategories.push(this.newCategory)
        this.newCategory = ''
        alert('Category successfully added!');
      }catch(error){
        return false;
      }
    },
    async getCategories() {
      try{
        let gotCategories = await axios.get('/api/categories/', {
          params: {
            user: this.$auth.user.email
          }
        });
        this.allCategories = gotCategories.data[0].allCategories;
      }catch(error){
        return false;
      }
    },
  },
  created() {
    this.getCategories();
  }
}
</script>

<style scoped>

.category-input{
  margin-right: 5px;
}
/*

.trash{
  margin-left: 15px;
  align-items: center;
}

.button-category{
  background-color: lightgrey;
  color: #3f4a60;
  border-radius: 5px;
  margin-left: 3px;
}
*/

.wrapper{
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 40px;
  text-align: left;
}

.submit-button{
  display: flex;
  justify-content: flex-end;
}

.categories {
  text-align: left;
  margin-left: 20px;
  display: flex;
  flex-direction: row;
}

.submit {
  background-color: #3f4a60;
  color: white;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
}

.form-check-input{
  cursor: pointer;
}


</style>
