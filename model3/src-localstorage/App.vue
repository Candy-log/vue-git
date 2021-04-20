<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <todoheader :addTitle="addTitle"></todoheader>
      <todolist  :deleteTodo="deleteTodo" :todos="todos"></todolist>
      <todofooter>
        <input type="checkbox" v-model="isAllCheck" slot="checkAll" />
        <span slot="count">已完{{ completeSize }}</span>/ 全部{{ todos.length }}
        <button
          class="btn btn-danger"
          v-show="completeSize"
          @click="deleteCompleteTodos"
          slot="delete"
        >
          清除已完成任务
        </button>
      </todofooter>
    </div>
  </div>
</template>

<script>
import todoheader from "./components/todoheader";
import todolist from "./components/todolist";
import todofooter from "./components/todofooter";
import storageUlit from "./util/storageUlit"
export default {
  components: {
    todoheader,
    todolist,
    todofooter,
  },
  data() {
    return {
      // 从localStorage读取todos
      todos: storageUlit.readTodos()
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
        storageUlit.saveTodos(value)
      },
    },
  },
  methods: {
    addTitle(todo) {
      debugger
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
