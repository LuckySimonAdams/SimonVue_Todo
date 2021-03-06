// import Todo from '../views/todo/todo.vue'
// import Login from '../views/login/login.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app',
    // path: '/app/:id', // /app/xxx
    props: true, // 将id作为props传入组件（解耦）
    // component: Todo, // 使用服务端渲染就不能用懒加载方式
    component: () => import(/* webpackChunkName: "components/todo-view" */ '../views/todo/todo.vue'), // 动态加载
    name: 'app',
    meta: {
      title: 'this is app',
      description: 'xxxxxx'
    },
    // children: [
    //   {
    //     path: 'child',
    //     component: ChildComp
    //   }
    // ],
    beforeEnter (to, from, next) {
      next()
    }
  },
  {
    path: '/login',
    // component: Login
    component: () => import(/* webpackChunkName: "components/login-view" */'../views/login/login.vue')
  }
]
