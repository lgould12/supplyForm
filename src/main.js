import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {login} from './firebase'

Vue.config.productionTip = false

let app;
login.onAuthStateChanged(user => {
  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app')  
})
