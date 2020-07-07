import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

// ストアを作成
const store = new Vuex.Store({
  state: {
    todos:{}
  },
  getters:{
      todos(state){
          return state.todos
      }
  },
  mutations: {
    // カウントアップするミューテーションを登録
    setTodos(state,newTodos){
      state.todos = newTodos;
    },
    addTodo(state,newTodo){
      state.todos.push(newTodo);
    },
    changeTodo(state, {todo, index}){
      state.todos.splice(index, 1, todo);
    },
    removeTodo(state, index){
      state.todos.splice(index, 1);
    },
  }
})
export default store