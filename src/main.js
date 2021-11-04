import Vue from 'vue'
import App from './App.vue'
import router from './router'
//import mock from "./router/mock-data";

Vue.config.productionTip = false

let data = {
  summaries: [{
    id: 1,
    title: "Midterm-Prep CS224",
    description: "I went over the architecture and encoding/decoding of y86",
    categories: ["CS", "Productivity", "Y86-64 Assembly", "Vue", "Music", "CS236", "CS260"]
  }],
  categories: ['Hello', 'CS', 'Religion', 'Productivity', 'Y86-64 Assembly', 'Vue', 'Music', 'CS236', 'CS260']
}

new Vue({
  router,
  data,
  render: h => h(App)
}).$mount('#app')
