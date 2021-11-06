import Vue from 'vue'
import App from './App.vue'
import router from './router'
//import mock from "./router/mock-data";

Vue.config.productionTip = false

let data = {
  summaries: [
      {
      title: "Midterm-Prep CS224",
      description: "I went over the architecture and encoding/decoding of y86-64 architecture. This subject makes my head spin quite a bit",
      categories: ["CS", "Productivity", "Y86-64 Assembly"],
      dateAdded: 'November, 5th, 2021'
    },
    {
      title: "CS 236 Exam Feedback",
      description: "I overcomplicated proof by contradiction trying to use De Morgan's laws. The principle of resolution applies to premises that have more than two things or'd together. " +
          "It can apply to any number of things or'd together. I also found that I left some redundant paths on my regular expression which may have caused some confusion for the grader",
      categories: ["CS", "CS236"],
      dateAdded: 'November, 5th, 2021'
    },
    {
      title: "Vue.js directives",
      description: "v-for allows loops through stored arrays to creat iterative elements. v-show only shows the attached markup element according to truth value of the asserted. v-model allows for elements in our script/data to be modified dynamically by markup elements/input and vice versa",
      categories: ["CS", "CS260", "Vue"],
      dateAdded: 'November, 5th, 2021'
    },
      {
          title: "Creative Project #3 Mini-Sprint",
          description: "Added category elements on the summary overviews. Restyled the submit button on the NewSummary form. Completed a dynamically colored progress bar for the timer",
          categories: ["CS", "CS260", "Vue", "Homework"],
          dateAdded: 'November, 5th, 2021'
      }
  ],
  categories: ['Quick Notes', 'CS', 'Y86-64 Assembly', 'VueJS', 'Music', 'CS236', 'CS260', 'Relational Algebra', 'Bitwise Operators', 'Homework']
}

new Vue({
  router,
  data,
  render: h => h(App)
}).$mount('#app')
