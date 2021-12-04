import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

let data = {
    categories: ['Random', 'Quick Notes', 'Y86-64 Assembly', 'Vue', 'Music', 'CS236', 'CS260', 'Relational Algebra', 'Bitwise Operators', 'Homework']
}

new Vue({
    router,
    data,
    render: h => h(App)
}).$mount('#app')
