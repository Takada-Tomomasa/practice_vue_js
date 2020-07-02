var STORAGE_KEY = 'todos-vuejs-demo'
var todoStorage = {
  fetch: function() {
    var todos = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || '[]'
    )
    todos.forEach(function(todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function(todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}

var app = new Vue({
    el: '#app',
    data: {
      showContent: false,
      showDetails: false,
      // addStoryName: '',
      // addStoryContents: '',
      // storyName: '',
      // storyContents: '',
      // selected: '',
      // changeID: '',
      storyCount: 100,
      options: [
        { id: 1, name: 'Todo' },
        { id: 2, name: 'Doing' },
        { id: 3, name: 'Review' },
        { id: 4, name: 'Done'}
      ],
      todos:
      [{ id: 1, name: "画期的なデザインに変更", contents: "背景色を青に変える", status: 1},
      { id: 2, name: "ストーリー2", contents: "内容2", status: 1},
      { id: 3, name: "ストーリー3", contents: "内容3", status: 2},
      { id: 4, name: "ストーリー4", contents: "内容4", status: 3},
      { id: 5, name: "ストーリー5", contents: "内容5", status: 3},
      { id: 6, name: "ストーリー6", contents: "内容6", status: 4},
      { id: 7, name: "ストーリー7", contents: "内容7", status: 4}]
    },
    computed:{
      doneLength:function(){
        return this.todos.filter(function(val) {
          return val.status == 4 ;
        })
      }
    },
    methods:{
      openModal: function(){
        this.showContent = true
      },
      closeModal: function(){
        this.showContent = false
      },
      stopModal: function(){
        event.stopPropagation()
      },
      openModalDetails: function(item){
        this.showDetails = true
        this.storyName = item.name
        this.storyContents = item.contents
        this.changeID = item.id
        this.selected = item.status
      },
      closeModalDetails: function(){
        this.showDetails = false
      },
      addItem: function(){
        this.todos.push({
          id: this.storyCount,
          name: this.addStoryName,
          contents: this.addStoryContents,
          status: 1
        })
        this.showContent = false
        this.addStoryName = ''
        this.addStoryContents = ''
        this.storyCount = this.storyCount + 1
      },
      changeItem: function(){
        index = this.todos.findIndex((todo) => todo.id === this.changeID)
        this.todos.splice(index,1,{
          id: this.changeID,
          name: this.storyName,
          contents: this.storyContents,
          status: this.selected
        })
        this.showDetails = false
      },
      removeItem: function(){
        index = this.todos.findIndex((todo) => todo.id === this.changeID)
        this.todos.splice(index,1)
        this.showDetails = false
      },
    },
    watch: {
      // オプションを使う場合はオブジェクト形式にする
      todos: {
        // 引数はウォッチしているプロパティの変更後の値
        handler: function(todos) {
          todoStorage.save(todos)
        },
        // deep オプションでネストしているデータも監視できる
        deep: true
      }
    },
    created() {
      // インスタンス作成時に自動的に fetch() する
      this.todos = todoStorage.fetch()
    },
  })