import { defineConfig } from 'umi';

export default defineConfig({
  // layout: {},//是否开启ant-design-pro风格
  nodeModulesTransform: {
    type: 'none',
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
});
