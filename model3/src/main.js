import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueResource from 'vue-resource'
import Axios from 'axios'
import Moment from "moment"



// 声明使用插件
Vue.use(VueResource) // 内部会给vm对象和组件对象添加一个属性：$http

// 挂载到Vue的原型上
Vue.prototype.$axios = Axios

// 挂在到vue的原型上
Vue.prototype.$moment = Moment

Vue.config.productionTip = false;

// 
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
