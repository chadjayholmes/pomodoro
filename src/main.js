import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

let data = {
  summaries: [
      {
      title: "Midterm-Prep CS224",
      description: "I went over the architecture and encoding/decoding of y86-64 architecture. This subject makes my head spin quite a bit",
      categories: ["Y86-64 Assembly"],
      dateAdded: 'October 23rd 2021'
    },
    {
      title: "CS 236 Exam Feedback",
      description: "I overcomplicated proof by contradiction trying to use De Morgan's laws. The principle of resolution applies to premises that have more than two things or'd together. " +
          "It can apply to any number of things or'd together. I also found that I left some redundant paths on my regular expression which may have caused some confusion for the grader",
      categories: ["CS236", "Relational Algebra"],
      dateAdded: 'November 3rd 2021'
    },
    {
      title: "Vue.js directives",
      description: "v-for allows loops through stored arrays to creat iterative elements. v-show only shows the attached markup element according to truth value of the asserted. v-model allows for elements in our script/data to be modified dynamically by markup elements/input and vice versa",
      categories: ["Vue"],
      dateAdded: 'November 4th 2021'
    },
      {
          title: "Creative Project #3 Mini-Sprint",
          description: "Added category elements on the summary overviews. Restyled the submit button on the NewSummary form. Completed a dynamically colored progress bar for the timer",
          categories: ["CS260", "Vue", "Homework"],
          dateAdded: 'November 6th 2021'
      },
      {
          title: "React JS",
          description: "similar to Vue.js, seems like the principles are all the same but syntax differs and the two have different strengths. To be continued...",
          categories: ["Quick Notes"],
          dateAdded: 'November 6th 2021'
      },
      {
          title: "Solo Practice",
          description: "tried my hand at learning Ariel Posen's solo in 'Try' but going to need more time",
          categories: ["Quick Notes", "Music"],
          dateAdded: 'November 6th 2021'
      }

  ],
  categories: ['Random', 'Quick Notes', 'Y86-64 Assembly', 'Vue', 'Music', 'CS236', 'CS260', 'Relational Algebra', 'Bitwise Operators', 'Homework']
}

new Vue({
  router,
  data,
  render: h => h(App)
}).$mount('#app')
