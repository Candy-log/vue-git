<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <todoheader></todoheader>
      <!-- <todoheader ref="header"></todoheader> -->
      <todolist :todos="todos" @deleteTodo="deleteTodo"></todolist>
      <todofooter
        :todos="todos"
        @deleteCompleteTodos="deleteCompleteTodos"
        @selectAllTodos="selectAllTodos"
      ></todofooter>
    </div>
  </div>
</template>

<script>
import PubSub from "pubsub-js";
import todoheader from "./components/todoheader";
import todolist from "./components/todolist";
import todofooter from "./components/todofooter";
export default {
  components: {
    todoheader,
    todolist,
    todofooter,
  },
  data() {
    return {
      // 从localStorage读取todos
      todos: JSON.parse(window.localStorage.getItem('todos_key') || "[]")
    };
  },
  watch:{ //监视
      todos:{
        deep:true, // 深度监视
        // 将todos最新的值的Json数据，保存到LocalStorage
        handler:function(value){
          window.localStorage.setItem('todos_key',JSON.stringify(value))
        }

      }
  },
  // mounted() { //执行异步代码
  // // 给<TodoHeader/> 绑定addTodo事件监听
  // // this.$on('addTodo',this.addTodo) //给App绑定的监听，不对
  // this.$refs.header.$on('addTodo',this.addTitle)

    
  // },
  mounted() {
    PubSub.subscribe('addTitle',(msg,data)=>{
    debugger
    console.log(msg,data);
    })
  },
  methods: {
    addTitle(todo) {
      this.todos.unshift(todo);
    },
    deleteTodo(index) {
      this.todos.splice(index, 1);
    },
    // 删除所有选的todo
    deleteCompleteTodos() {
      this.todos = this.todos.filter((todo) => !todo.complete);
    },
    // 全选/全不选
    selectAllTodos(check) {
      this.todos.forEach((todo) => (todo.complete = check));
    },
  },
};
</script>

<style>
/*app*/
.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
