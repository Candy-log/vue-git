<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <todoheader :addTitle="addTitle"></todoheader>
      <todolist :deleteTodo="deleteTodo" :todos="todos"></todolist>
      <todofooter>
        <input type="checkbox" v-model="isAllCheck" slot="checkAll" />
        <span slot="count">已完{{ completeSize }}/全部{{ todos.length }}</span>
        <button
          class="btn btn-danger"
          v-show="completeSize"
          @click="deleteCompleteTodos"
          slot="delete"
        >清除已完成任务</button>
        <span>我是匿名插槽</span>
      </todofooter>
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
      // 从localStorage读取todos
      todos: JSON.parse(window.localStorage.getItem("todos_key") || "[]"),
    };
  },
  computed: {
    isAllCheck: {
      get() {
        return this.completeSize === this.todos.length && this.completeSize > 0;
      },
      set(value) {
        // value 是当前checbox最新的值
        this.selectAllTodos(value);
      },
    },
    completeSize() {
      return this.todos.reduce(
        (preTotal, todo) => preTotal + (todo.complete ? 1 : 0), //返回值作为下一次的preTotal的值
        0
      );
    },
  },
  watch: {
    //监视
    todos: {
      deep: true, // 深度监视
      // 将todos最新的值的Json数据，保存到LocalStorage
      handler: function (value) {
        window.localStorage.setItem("todos_key", JSON.stringify(value));
      },
    },
  },
  methods: {
    addTitle(todo) {
      debugger;
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
