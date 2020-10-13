export default [
  {
    path: '/userAction',
    component: '@/layouts/loginLayout',
    routes: [
      { path: '/userAction', redirect: '/userAction/login' },
      {
        path: '/userAction/login',
        component: '@/pages/user/login',
      },
      {
        path: '/userAction/register',
        component: '@/pages/user/register',
      },
    ],
  },
  {
    path: '/',
    component: '@/layouts/basicLayout',
    wrappers: ['@/wrappers/BasicLayoutAuth'],
    routes: [
      { path: '/', redirect: '/message' },
      {
        path: '/message',
        component: '@/pages/message',
      },
    ],
  },
];
