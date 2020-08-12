import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    tasks: []
  },
  mutations: {
    addTask(state, taskName) {
      const newId = () => {
        let maxId = 0;
        state.tasks.forEach(element => { 
          if (maxId < element.id) {
            maxId = element.id;
          }
        })
        maxId++;
        return maxId;
      };
      state.tasks.push({
        'id': newId(),
        'taskName': taskName, 
        'status': '作業中'
      });
    },
    deleteTask(state, id) {
      let i = 0;
      state.tasks.some(element => { 
        if (id === element.id) {
          return true;
        }
        i++;
      });
      state.tasks.splice(i, 1);
      store.commit('numbering');
    },
    numbering(state) {
      let i = 1;
      state.tasks.forEach(element => { 
        element.id = i;
        i++;
      });
    },
    changeStatus(state, id) {
      const foundTask = state.tasks.find(element => (id === element.id));
      switch (foundTask.status) {
        case '作業中':
          foundTask.status = '完了';
          break;
        case '完了': 
          foundTask.status = '作業中';
          break;
        default: 
          console.log('該当しないtask.statusがあります');
      }
    }
  }, 
})

new Vue({
  store,
  render: h => h(App), 
}).$mount('#app')
