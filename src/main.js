import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tailwind.css'
import axios from 'axios'
axios.defaults.baseURL = "https://sheltered-meadow-48233.herokuapp.com/api"
axios.defaults.withCredentials = true

import Layout from './components/reusable/Layout.vue'
import Card from './components/reusable/Card.vue'
import Icon from './components/reusable/Icon.vue'
import Button from './components/reusable/Button.vue'


const app = createApp(App)

app.component('Layout', Layout)
   .component('Card', Card)
   .component('Icon', Icon)
   .component('Button', Button)
   

app.use(store).use(router)
app.mount('#app')
