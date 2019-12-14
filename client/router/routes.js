// import Todo from './views/todo/todo.vue'
// import Login from './views/login/login.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app',
    // path: '/app/:id', // /app/xxx
    props: true, // 将id作为props传入组件（解耦）
    // component: Todo,
    component: () => import('../views/todo/todo.vue'), // 动态加载
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
    // component: Login,
    component: () => import('../views/login/login.vue')
  }
]
