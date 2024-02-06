import { DefaultTheme } from "vitepress";

export const defaultSidebar: DefaultTheme.Sidebar = [
  {
    text: "Introduction",
    collapsible: true,
    items: [
      {
        text: "Getting Started",
        link: "/getting-started",
      },
      {
        text: "文档进度",
        link: "/doc-process",
      },
    ],
  },

  {
    text: "NodeJS 工具",
    items: [
      {
        text: "自动重启node应用的工具 nodemon",
        link: "/nodemon/",
      },
    ],
  },
  {
    text: "Vue.js 生态",
    collapsible: true,
    items: [
      {
        text: "目录大纲",
        link: "/vue-ecology/index",
      },
      {
        text: "create-vue 源码解析",
        link: "/vue-ecology/create-vue",
      },
      {
        text: "vuex 4",
        link: "/vue-ecology/vuex4",
      },
      {
        text: "100 行写一个 vuex",
        link: "/vue-ecology/vuex3-100",
      },
      {
        text: "pinia",
        link: "/vue-ecology/pinia",
      },

      {
        text: "40 行写一个 pinia",
        link: "/vue-ecology/pinia-100",
      },
    ],
  },
  {
    text: "vue3",
    collapsible: true,
    items: [
      {
        text: "vuejs-core",
        link: "/vue3/index",
      },
      {
        text: "reactivity",
        link: "/vue3/reactivity",
      },
    ],
  },
  {
    text: "React",
    items: [
      {
        text: "React",
        link: "/react/",
      },
    ],
  },
];
