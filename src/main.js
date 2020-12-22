import Vue from 'vue'
import VueRouter from 'vue-router';
import App from "@/App";
import ContactDetails from "@/components/ContactDetails";
import Contacts from "@/components/Contacts";

// load font-awesome icons
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faTrash, faEye, faSave, faArrowLeft, faUndo } from '@fortawesome/free-solid-svg-icons'

library.add(faPlus)
library.add(faTrash)
library.add(faEye)
library.add(faSave)
library.add(faArrowLeft)
library.add(faUndo)

Vue.use(VueRouter)

// Set global component for using icon in all app
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
// Add storage, i'm using vuex, it's easy way for show, how it's will be work app. In task no requirements for using API
// or database for collect data and in that case i using vuex as for demonstration for save time. If need to use another
// way please ask me
import store from "@/store";

// Default routes for that task
const router = new VueRouter({
  routes: [
    { path: '/', component: Contacts, name: 'contacts' },
    { path: '/details/:id', component: ContactDetails, name: 'details' },
    { path: '/details', component: ContactDetails, name: 'details-create' }
  ],
  mode: 'history'
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
