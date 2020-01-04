import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import taskResult from '@/views/taskResult'
Vue.use(Router)
var routes= [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },{
    path: '/taskList/:taskType',
    name: 'taskResult',
    component: taskResult,
    props:(route) => ({ query: route.query,taskType:route.params.taskType })
  }
]
export default new Router({
  routes: routes
})
