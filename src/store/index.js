import { createStore } from 'vuex'
import values from './modules/values'
import principles from './modules/principles'
export default createStore({
  modules: {
    values,
    principles
  }
})
