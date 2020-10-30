
// 引入Vue全家桶
import Vue from "vue"
import VueRouter from "vue-router"
Vue.use(VueRouter);


// 调用element
import ElementUI from 'element-ui'
Vue.use(ElementUI)

// 调用路由
import router from "./router/router.js" 



//引入全局css和全局的vue模板
import "./css/index.scss"
import app from "./App.vue"


let rm =new Vue({
    el:"#app",
    router,
    render:c=>c(app)
});

