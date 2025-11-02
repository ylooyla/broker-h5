import { defaultTheme, defineUserConfig } from 'vuepress'

export default defineUserConfig({
  base: '/usmart-h5/',
  title: 'usmart h5',
  lang: 'zh-CN',
  description: 'resource library of usmart h5',
  dest: 'docs/.vuepress/usmart-h5',
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: ' https://www.usmart.hk/favicon.ico',
      },
    ],
  ],
  theme: defaultTheme({
    sidebar: [
      {
        text: 'Introduction',
        link: '/',
      },
      {
        text: 'icon for react',
        link: '/icon/',
      },
      {
        text: 'Plugins',
        children: [
          {
            text: 'smartSkin',
            link: '/plugins/smart-skin/',
          },
          {
            text: 'jsBridge',
            link: '/plugins/js-bridge/',
          },
        ],
      },
      {
        text: 'utils',
        children: [
          {
            text: 'domain',
            link: '/utils/domain/',
          },
        ],
      },
      {
        text: 'ENUM',
        children: [
          {
            text: 'global enum',
            link: '/enum/',
          },
        ],
      },
    ],
    navbar: [],
  }),
})
