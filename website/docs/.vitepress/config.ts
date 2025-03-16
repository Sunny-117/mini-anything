import { resolve } from 'path'
import type { DefaultTheme } from 'vitepress'
import { defineConfig } from 'vitepress'
import { generateFileSidebar } from './file-sidebar'

const r = (p: string) => resolve(__dirname, p)

// generateFileSidebar(r('../useForm'))
import { defaultSidebar } from './defaultSidebar'


export default defineConfig({
  base: '/tiny-anything/',
  title: 'tiny-anything',
  description: '',
  // appearance: false,
  lastUpdated: true,
  themeConfig: {
    outline: [1, 3],
    sidebar: defaultSidebar,
    nav: [
      {
        text: 'Playground',
        link: 'https://tiny-anything-play.netlify.app/',
      },
      ...defaultSidebar,
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/sunny-117/tiny-anything' },
    ],
    footer: {
      copyright: 'Copyright © 2022-present sunny-117',
    },
    editLink: {
      pattern: 'https://github.com/sunny-117/tiny-anything',
      text: 'Edit this page on Gitlab',
    },
    lastUpdatedText: 'Last Updated',
    localeLinks: {
      text: 'English',
      items: [
        { text: '简体中文', link: 'https://netlify.app' },
      ],
    },
  },
})
