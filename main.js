var app = new Vue({
    el: '#app',
    data: {
      showContent: false,
      addStoryName: '',
      todos:
      [{ id: 1, name: "画期的なデザインに変更", contents: "背景色を青に変える", status: 1},
      { id: 2, name: "ストーリー2", contents: "内容2", status: 1},
      { id: 3, name: "ストーリー3", contents: "内容3", status: 2},
      // { id: 8, name: "ストーリー8", contents: "内容8", status: 2},
      { id: 4, name: "ストーリー4", contents: "内容4", status: 3},
      { id: 5, name: "ストーリー5", contents: "内容5", status: 3},
      { id: 6, name: "ストーリー6", contents: "内容6", status: 4},
      { id: 7, name: "ストーリー7", contents: "内容7", status: 4}]
    },
    methods:{
      openModal: function(){
        this.showContent = true
      },
      closeModal: function(){
        this.showContent = false
      },
      addItem: function(){
        this.todos.push({
          id: 10,
          name: this.addStoryName,
          contents: "内容10",
          status: 1
        })
        this.showContent = false
        this.addStoryName = ''
      }
    }
  })