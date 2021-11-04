<template>
  <form class="wrapper">
    <div class="form-group">
      <label for="FormControlInput1">Title</label>
      <input v-model="summary.title" type="text" class="form-control" id="FormControlInput1">
    </div>
    <div class="form-group">
      <label for="FormControlInput2" >Summary</label>
      <textarea v-model="summary.description" class="form-control" id="FormControlInput2" rows="6"></textarea>
    </div>
    <div class="form-group submit-button">
      <button @click.prevent="addSummary">Add Summary</button>
    </div>
    <p>Select Category(s)</p>
    <div class="form-group" v-for="category in this.$root.$data.categories" :key="category">
      <input @change="appendCategory(category)" class="form-check-input" type="checkbox" value="" id="defaultCheck1">
      <label class="form-check-label" for="defaultCheck1">{{ category }}</label>
    </div>

  </form>
</template>

<script>
//import Summaries from 'Summaries'
export default {
  name: "Summarize",
  components: {
    //Summaries
  },
  props: {

  },
  data() {
    return {
      summary: {
        id: 2,
        title: '',
        description: '',
        categories: []
      }
    }
  },
  methods: {
    addSummary() {
      let tempCategories = []
      this.summary.categories.forEach(category => {
          tempCategories.push(category);
      })
      let tempSummary = {id: this.summary.id, title: this.summary.title, description: this.summary.description, category: tempCategories}
      this.$root.$data.summaries.push(tempSummary);
      this.summary.id = '';
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
          console.log("caught a repeat");
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
  }
}
</script>

<style scoped>

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



</style>