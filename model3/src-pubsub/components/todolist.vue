<template>
  <ul class="todo-main">
    <todoitem
      v-for="(todo, index) in todos"
      :key="index"
      :todo="todo"
      :index="index"
     
    ></todoitem>
  </ul>
</template>

<script>
import todoitem from "./todoitem";
export default {
  components: {
    todoitem,
  },
  props: {
    todos: Array,
    
  },
};
</script>

<style>
/*main*/
.todo-main {
  margin-left: 0px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0px;
}

.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}
</style>
