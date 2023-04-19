import { defineConfig } from 'vitepress';

/**
 * @type {import('vitepress').UserConfig}
 */
export default defineConfig({
  title: 'Interview-Docs',
  base: '/interview-docs/',
  lang: 'zh-CN',
  description: '复习前端基础知识，已经应对面试网站！',
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
        'https://github.com/peng-xiao-shuai/interview-docs/edit/main/:path',
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

    nav: [
      { text: '八股文', link: '/zh-CN/guide/' },
      {
        text: '基础算法',
        link: '/zh-CN/guide/arithmetic.md',
      },
    ],
    sidebar: {},
  },
  markdown: {
    theme: { light: 'dark-plus', dark: 'dark-plus' },
  },
});
