import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/Home'
import Login from '@/pages/login/Login'
import Edit from '@/pages/edit/Edit'

Vue.use(Router)

Router.prototype.pushSave = function (routeObject) {
  let isSameRoute = true

  if (this.currentRoute.name === routeObject.name && routeObject.params) {
    for (const key in routeObject.params) {
      if (
        !this.currentRoute.params[key] ||
        this.currentRoute.params[key] !== routeObject.params[key]
      ) {
        isSameRoute = false
      }
    }
  } else {
    isSameRoute = false
  }

  if (!isSameRoute) {
    this.push(routeObject)
  }
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/edit',
      name: 'Edit',
      component: Edit
    }
  ]
})
