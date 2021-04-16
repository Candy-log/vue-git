<template>
  <div>
    <p class="msg">{{msg}}</p>
  </div>
</template>

<script>
export default { //配置对象与vue一致
  data(){ //必须写函数
    return{
      msg:'Hollo Vue Compnent'
    }
  }
}
</script>

<style>
  .msg{
    color:red;
    font-size:30px
  }
</style>