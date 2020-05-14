
// 引入Vue全家桶
import Vue from "vue"
import VueRouter from "vue-router"
Vue.use(VueRouter);
import VueResource from "vue-resource"
Vue.use(VueResource);
import Vuex from 'vuex'
Vue.use(Vuex);

//引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

// 调用element
import ElementUI from 'element-ui'
Vue.use(ElementUI)

// 调用vuex状态管理
import store from "./store.js"
// 调用路由
import router from "./router.js" 

//引入全局css和全局的vue模板
import "./css/index.scss"
import app from "./App.vue"


let rm =new Vue({
    el:"#app",
    router,
    store,
    render:c=>c(app)
});

