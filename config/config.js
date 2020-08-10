// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  history: { type: 'hash' }, // 默认是 browser
  base: '/dist/',
  publicPath: '/dist/',
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'home',
      component: './Home',
    },
    {
      path: '/pages',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/pages',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/pages',
              redirect: '/pages/mobile',
            },
            {
              path: '/home',
              name: 'home',
              icon: 'home',
              component: './Home',
            },
            {
              path: '/pages/mobile',
              name: 'mobile',
              icon: 'smile',
              component: './ListTableList',
            },
            {
              path: '/pages/iot',
              name: 'iot',
              icon: 'smile',
              component: './ListTableList',
            },
            {
              path: '/pages/navigation',
              name: 'navigation',
              icon: 'smile',
              component: './ListTableList',
            },
            {
              path: '/pages/airline',
              name: 'airline',
              icon: 'smile',
              component: './ListTableList',
            },
            {
              path: '/pages/ka',
              name: 'ka',
              icon: 'smile',
              component: './ListTableList',
            },
            {
              path: '/pages/admin',
              name: 'admin',
              icon: 'crown',
              component: './Admin',
              authority: ['admin'],
              // routes: [
              //   {
              //     path: '/pages/admin/sub-page',
              //     name: 'sub-page',
              //     icon: 'smile',
              //     component: './Welcome',
              //     authority: ['admin'],
              //   },
              // ],
            },
            // {
            //   name: 'list.table-list',
            //   icon: 'table',
            //   path: '/pages/list',
            //   component: './ListTableList',
            // },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
