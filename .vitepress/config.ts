import { defineConfig } from 'vitepress';
import fs from 'fs';
import path from 'path';
import markdownIt from 'markdown-it';
import mdContainer from 'markdown-it-container';

const docRoot = path.resolve(process.cwd() + '/');

/**
 * @type {import('vitepress').UserConfig & DocsGitInfo}
 */
export default defineConfig({
  title: 'Vite-Vue-Admin',
  base: '/Interview-docs/',
  lang: 'zh-CN',
  description: '基于Vite.js & Vue.js的管理网站',
  head: [['link', { rel: 'icon', href: '/logo.svg' }]],
  // 最近更新时间
  lastUpdated: true,
  themeConfig: {
    outline: [2, 3],
    // repo: pkg.repository,
    logo: '/logo.svg',
    // docsBranch: 'main',
    editLink: {
      pattern:
        'https://github.com/peng-xiao-shuai/vite-vue-admin-docs/edit/main/:path',
      text: '帮助我们改善此页面！',
    },
    lastUpdatedText: '最后更新时间',
    // 社交链接
    socialLinks: [
      // { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    // 页脚配置
    footer: {
      message: 'Released under the MIT License.',
    },
    //     algolia: {
    //       apiKey: 'b573aa848fd57fb47d693b531297403c',
    //       indexName: 'vitejs',
    //       searchParameters: {
    //         facetFilters: ['tags:cn']
    //       }
    //     },

    // carbonAds: {
    //   carbon: 'CEBIEK3N',
    //   placement: 'vitejsdev'
    // },

    nav: [
      { text: '八股文', link: '/zh-CN/guide/' },
      {
        text: '基础算法',
        link: '/zh-CN/guide/arithmetic.md',
      },
      // {
      //   text: '相关链接',
      //   items: [
      //     {
      //       text: '更新日志',
      //       link: 'https://github.com/vitejs/vite/blob/main/packages/vite/CHANGELOG.md',
      //     },
      //   ],
      // },
    ],

    sidebar: {
      // '/config/': 'auto',
      // '/plugins': 'auto',
      // catch-all fallback,
      // '/zh-CN/guide/': [
      //   {
      //     text: '指引',
      //     items: [
      //       {
      //         text: '介绍',
      //         link: '/guide/',
      //       },
      //       {
      //         text: '为什么使用 Vite',
      //         link: '/guide/why',
      //       },
      //       {
      //         text: '开始',
      //         link: '/guide/start',
      //       },
      //       {
      //         text: '使用插件',
      //         link: '/guide/using-plugins',
      //       },
      //     ],
      //   },
      // {
      //   text: 'API',
      //   items: [
      //     {
      //       text: '插件 API',
      //       link: '/guide/api-plugin',
      //     },
      //     {
      //       text: 'HMR API',
      //       link: '/guide/api-hmr',
      //     },
      //     {
      //       text: 'JavaScript API',
      //       link: '/guide/api-javascript',
      //     },
      //     {
      //       text: '配置参考',
      //       link: '/config/',
      //     },
      //   ],
      // },
      // ],
      // '/zh-CN/component/': [
      //   {
      //     text: '组件',
      //     items: [
      //       {
      //         text: '表格-文档',
      //         link: '/zh-CN/component/powerful-table-doc',
      //       },
      //       {
      //         text: '表格-示例',
      //         link: '/zh-CN/component/powerful-table-demo',
      //       },
      //     ],
      //   },
      //   {
      //     text: '指令',
      //     items: [],
      //   },
      // ],
    },
  },
  markdown: {
    theme: { light: 'dark-plus', dark: 'dark-plus' },
  },
});
