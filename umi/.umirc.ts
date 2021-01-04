import { defineConfig } from 'umi';

export default defineConfig({
  // layout: {},//是否开启ant-design-pro风格
  // node_modules下的文件不走babel编译
  nodeModulesTransform: {
    type: 'none',
  },
  // 整合 dva 数据流
  dva: {
    immer: true,//启用 immer 以方便修改 reducer
    hmr: false,//启用 dva model 的热更新
  },
  // 配置别名，对引用路径进行映射，例如import "components"
  alias: {
    "components": "./src/components",
    "pages": "./src/pages",
  },
  // 按需加载
  dynamicImport: {},
  // 静态化(每个页面单独生成html)
  // exportStatic: {
  //   htmlSuffix: true,//例如：list/index.html会直接生成list.html
  // },
  // 快速刷新
  // fastRefresh: {}
  // 忽略 moment 的 locale 文件，用于减少尺寸
  ignoreMomentLocale: true,

});
