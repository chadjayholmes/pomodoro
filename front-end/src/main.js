import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { Auth0Plugin } from './auth';
import { domain, clientId } from '../auth_config.json';
import 'bootstrap'

Vue.config.productionTip = false

let data = {
    categories: ['Random', 'Quick Notes', 'Y86-64 Assembly', 'Vue', 'Music', 'CS236', 'CS260', 'Relational Algebra', 'Bitwise Operators', 'Homework']
}

// Install the authentication plugin here
Vue.use(Auth0Plugin, {
  domain,
  clientId,
  onRedirectCallback: (appState) => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname,
    );
  },
});

new Vue({
    router,
    data,
    render: h => h(App)
}).$mount('#app')
