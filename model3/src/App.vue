<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <todoheader :addTitle="addTitle"></todoheader>
      <todolist :todos="todos" :deleteTodo="deleteTodo"></todolist>
      <todofooter
        :todos="todos"
        :deleteCompleteTodos="deleteCompleteTodos"
        :selectAllTodos="selectAllTodos"
      ></todofooter>
    </div>
  </div>
</template>

<script>
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
      todos: [
        { title: "吃饭", complete: false },
        { title: "睡觉", complete: true },
        { title: "coding", complete: false },
      ],
    };
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
