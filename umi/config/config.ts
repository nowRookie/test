// umi的配置可以写在此处，但是需要注意
// 若要config文件夹中的配置生效，必须删除.umirc.ts，否则始终会引用.umirc.ts中的默认配置
// 即使.umirc.ts返回的空对象，此处的配置也无法生效
import { defineConfig } from 'umi';
import routes from "./router"

export default defineConfig({
    routes,
    hash: true
});