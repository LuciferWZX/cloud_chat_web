export default [
  {
    path: '/userAction',
    component: '@/layouts/loginLayout',
    wrappers: ['@/wrappers/LoginLayoutAuth'],
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
      {
        path: '/file',
        component: '@/pages/file',
      },
      {
        path: '/notification',
        component: '@/pages/notification',
      },
      { component: '@/pages/404' },
    ],
  },
  { component: '@/pages/404' },
];
