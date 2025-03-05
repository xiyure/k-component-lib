# Changelog

All notable changes to this project will be documented in this file.

## [1.1.16](https://github.com/xiyure/k-component-lib/compare/v1.1.14..v1.1.16) - 2025-03-05

### 🐛 Bug 修复

- *(ScriptInput)* 修复输入<xxx>格式文本时输入框内容消失问题； - ([547e2e8](https://github.com/xiyure/k-component-lib/commit/547e2e82fbf40e34d084b698de729a29f9568960))
- *(ScriptInput)* 修复脚本输入框在密码状态下无法解析脚本标签问题； - ([3faf098](https://github.com/xiyure/k-component-lib/commit/3faf0984af4aac4b2803700315c8b3452fdd37ac))

## [1.1.14](https://github.com/xiyure/k-component-lib/compare/v1.1.0..v1.1.14) - 2025-02-28

### 🚀 特性

- *(KGlobalProvider)* 新增KGlobalProvider组件，用于全局共享数据； - ([abf42f7](https://github.com/xiyure/k-component-lib/commit/abf42f72819b093f81fb83a5bb231dc9f785b569))
- *(KTreeTable)* 搜索功能支持拼音搜索； - ([d513fe3](https://github.com/xiyure/k-component-lib/commit/d513fe3dc14ae84d4166cdbb3d3ae5c324b5a1e1))
- *(script_input)* 新增参数 max, min 用于校验字符串长度 or number 最大值 - ([0513b09](https://github.com/xiyure/k-component-lib/commit/0513b09dde02b182d3ea1972634a95a89b773670))
- *(script_input)* 增加 maxHeight - ([9f05d55](https://github.com/xiyure/k-component-lib/commit/9f05d55b6a193800c412c925994532292fd842bf))
- *(tree_table)* 增加可编辑单元格 hover 指针状态 - ([55f77e2](https://github.com/xiyure/k-component-lib/commit/55f77e2a0cc1332ee6d93506c559cbb12a0800a4))

### 🐛 Bug 修复

- *(all)* 修复所有组件ssr渲染不一致问题 - ([99e1af4](https://github.com/xiyure/k-component-lib/commit/99e1af45e6ce1acaa10efd4ede7639e2865491e0))
- *(button)* Text 兼容 el type - ([d2cda5e](https://github.com/xiyure/k-component-lib/commit/d2cda5e752851fea8e03d5d2bb70921f252b4211))
- *(details)* 优化样式 - ([a1d00c0](https://github.com/xiyure/k-component-lib/commit/a1d00c085365f3cab17d30a0667237794bbe5a54))
- *(i18n)* 更换i18n挂载方式 - ([ef39884](https://github.com/xiyure/k-component-lib/commit/ef39884a9369143761a0015a9d81a122d62884a2))
- *(input)* 使用 clearable , 在某些情况下出现两个清除按钮 - ([42c87d8](https://github.com/xiyure/k-component-lib/commit/42c87d8cef6620a6982077dcc66c9b9b583448d9))
- *(messageBox)* 修复多层弹窗层级冲突问题 - ([66395aa](https://github.com/xiyure/k-component-lib/commit/66395aaccda52e3080149b644caa7d9bd7e4a331))
- *(script_input)* 修复密码框形态时密码返显失效 - ([21f8fb4](https://github.com/xiyure/k-component-lib/commit/21f8fb4761d7e970a3ca2dece308167eddd3a81a))
- *(script_input)* 校验信息定位 bug - ([0c33089](https://github.com/xiyure/k-component-lib/commit/0c33089e9a4beaf021fa9bf7801d3d2505315351))
- *(script_input)* 优化类型校验提示 - ([fb0cbcf](https://github.com/xiyure/k-component-lib/commit/fb0cbcf42cee9bfe3cf781ec7b15f93055e77a81))
- *(sliderButton)* 修复无法监听自身宽度bug - ([423c652](https://github.com/xiyure/k-component-lib/commit/423c65246769c35e62faa3007547498dedf92829))
- *(tag)* Tag tooltip 改为默认不触发 - ([b89ff30](https://github.com/xiyure/k-component-lib/commit/b89ff30191b94d2ce669303be26c3b46f9e48587))
- *(tour)* K-button样式覆盖 el-button 样式 - ([bdf489a](https://github.com/xiyure/k-component-lib/commit/bdf489aa5640591306459dc5934749b203f8aedd))
- *(transfer)* 修复箭头icon 指向错误 - ([47f1d08](https://github.com/xiyure/k-component-lib/commit/47f1d08b709a8bdfe04e9742fe3083ebce54d07c))
- *(tree_table)* 修复单元格自适应内容高度 - ([8cf0239](https://github.com/xiyure/k-component-lib/commit/8cf02392b6e3d63fd81293c4f956a17fd0a84d27))
- *(tree_table)* 修复混动功能失效,  但是滚动条依然不可见 - ([02aa99c](https://github.com/xiyure/k-component-lib/commit/02aa99c4cb19094240292a00801d51a5d4cf5c2a))
- *(tree_table)* 修复分页切换影响到已选数据bug - ([3d9e832](https://github.com/xiyure/k-component-lib/commit/3d9e832afbd92b9f9965ff4402cb4bde349d0207))
- *(v-ksw_tooltip)* 修复同一组件时, 只生效一次, 优化 dialog 样式 - ([eb77244](https://github.com/xiyure/k-component-lib/commit/eb772445560f0b06d0ec6c7c9fdcb2192ac193f4))
- *(导航栏)* 修复导航栏样式问题 - ([5313818](https://github.com/xiyure/k-component-lib/commit/5313818e487f5718204c32173de41266d1286e14))
- 修复TreeTable组件getCheckboxRecords方法在树形数据中获取已选中数据时无法无法返回父级选中的数据； - ([4019744](https://github.com/xiyure/k-component-lib/commit/401974490cabba7c6244b519f5ee8590baa31a56))
- V-ksw_tooltip响应式丢失问题； - ([952b66b](https://github.com/xiyure/k-component-lib/commit/952b66b702fb92f62b1929a560cce8ca0beb1c20))

### 📚 文档

- *(主页)* 添加组件展示图片 - ([bea71a7](https://github.com/xiyure/k-component-lib/commit/bea71a78bbbe33719f059213331a1419fad4aa35))
- *(主页)* 适配黑暗模式 - ([c259e03](https://github.com/xiyure/k-component-lib/commit/c259e03156f6882e8f3cc06c66b6ac009a1bade8))
- *(首页)* 添加首页动画 - ([74144cb](https://github.com/xiyure/k-component-lib/commit/74144cb275face8a051cac9c525cd5e9bad811e6))
- 首页新增滚动动画 - ([1d5b049](https://github.com/xiyure/k-component-lib/commit/1d5b0492e936e64aee0e2ae535339e005933b059))
- 新增调色板 - ([f9f74d1](https://github.com/xiyure/k-component-lib/commit/f9f74d11f7c8b65d1264d0ec7b108a4a5df3562a))
- I18n 支持 - ([87ed211](https://github.com/xiyure/k-component-lib/commit/87ed21153317f017ecf8dd585f16157b94e8205f))
- 优化 build chunks 分包, 组件库 css 使用 cdn 导入 - ([8dd8853](https://github.com/xiyure/k-component-lib/commit/8dd8853de10997ca6c985660737738f8cefa3bec))
- 合并分支 'dev-docs' 到 dev, 使用动态组件优化 demo 加载 - ([3407e27](https://github.com/xiyure/k-component-lib/commit/3407e27f128dccf0e2a966d46b76f14a1e345820))
- 优化 build Chunks - ([16e008d](https://github.com/xiyure/k-component-lib/commit/16e008d6cd8cab01509df5deb65c1fee1faa6678))
- Demo-shiki 组件语法高亮使用 shiki 实现, 性能消耗比 highlight.js 多,但是支持精准语法高亮和丰富主题 - ([14ab427](https://github.com/xiyure/k-component-lib/commit/14ab4278baa97f509db12c1eace0d7fe8ec01d58))
- Demo 组件新增高亮语言支持, 优化黑暗模式高亮主题 - ([b2c99e6](https://github.com/xiyure/k-component-lib/commit/b2c99e6eb486aa60bef8f9f3be3ef760f71b0af9))
- 优化首页 - ([e848e2b](https://github.com/xiyure/k-component-lib/commit/e848e2bf4bd4924f32f3da2b73bd575ec60e7146))
- 更新首页 - ([2dce8fd](https://github.com/xiyure/k-component-lib/commit/2dce8fd0b663de929590a9ab1aaea65a6987b787))

### 🎨 样式

- *(slider_button)* 优化样式 - ([6ee2c2a](https://github.com/xiyure/k-component-lib/commit/6ee2c2ac4bdadbffb760b50a201b6c36c74cf281))

### 🧪 测试

- *(tree-table)* 尝试修复显示不全的问题 - ([a5a06a1](https://github.com/xiyure/k-component-lib/commit/a5a06a1eaf0a5b52f4faf5a131d065472cf5096b))

## [1.1.0](https://github.com/xiyure/k-component-lib/compare/v1.0.6..v1.1.0) - 2025-01-16

### 🚀 特性

- *(script_input)* 新增 valueType, 用于正则校验是否为 数字 或 布尔值 - ([a69568c](https://github.com/xiyure/k-component-lib/commit/a69568c26631be2ad37f0e5decd2e26d6b8b4ba8))
- *(tag)* 新增 showOverflow 来控制最大宽度, 建议比table 单元格预留 140px - ([2d377b7](https://github.com/xiyure/k-component-lib/commit/2d377b73f5c19cb1c6cc21292723672834ed0bf3))

### 🐛 Bug 修复

- *(ButtonContainer)* 修复隐藏按钮点击事件失效问题； - ([77e2d50](https://github.com/xiyure/k-component-lib/commit/77e2d50353f2125c2c2ff4b89c6eb6edc43c56fb))
- *(script_input)* 优化节点判断 - ([791b16a](https://github.com/xiyure/k-component-lib/commit/791b16a6efa4d8eb942dcb4f7ae751173f772943))
- *(script_input)* 修改提示文字 - ([bc9a08f](https://github.com/xiyure/k-component-lib/commit/bc9a08f3e7a00e9c0588df02032c6dbb085a6034))
- *(script_input)* 优化中英文混合输入导致换行的 bug - ([5e208b2](https://github.com/xiyure/k-component-lib/commit/5e208b25707f65d7378e74c6bac3a061ee34ae1f))
- Upload组件使用trigger插槽时before-upload事件不触发的问题； - ([44e988c](https://github.com/xiyure/k-component-lib/commit/44e988c6f6094dc74793cea199e5e7c5669fa986))

### 🚜 重构

- Element-plus 降低版本至 2.9.0 并锁定 - ([7e3b632](https://github.com/xiyure/k-component-lib/commit/7e3b6324af8e79bb1b1e6d59dd939faedfe03a95))

### 📚 文档

- *(carousel)* 补充Function提示 - ([67487a1](https://github.com/xiyure/k-component-lib/commit/67487a1e0d41b438cec0b8dd0d314ca16985e936))
- *(collapse)* 补充API描述 - ([e8631a0](https://github.com/xiyure/k-component-lib/commit/e8631a0bdc3fe64eb21023fb90972b4cc2250101))
- *(descriptions)* 补充API提示 - ([e456a47](https://github.com/xiyure/k-component-lib/commit/e456a474a4809c0096b9724d36c4c97521e132a5))
- *(image)* ImageViewer扩充API - ([d14b84d](https://github.com/xiyure/k-component-lib/commit/d14b84def3e9e5b7ed9ac4cf8289766c3fdf0990))
- *(scriptInput)* 完成文档以及API编写 - ([b2dc9b4](https://github.com/xiyure/k-component-lib/commit/b2dc9b4d278a51d1cea1fd845d78e0a5b8d6b7a3))
- 贡献者添加数据映射 - ([0d909d2](https://github.com/xiyure/k-component-lib/commit/0d909d21b519230f272d8b4de3d2e15973d1e99f))

### 🎨 样式

- *(script_input)* 增加 disabled 样式 - ([3826277](https://github.com/xiyure/k-component-lib/commit/3826277c04ff992d1b9ab9826d3cdcd15ed03fea))
- *(script_input)* 增加字间距, 规避英文符号',光标问题 - ([917510e](https://github.com/xiyure/k-component-lib/commit/917510ee5fc194d2757f34f3e52f3890c56ccf53))

## 新贡献者 ❤️

* @sengoku-f 做出了他们的第一次贡献
* @ 做出了他们的第一次贡献
* @baobaomi900901 做出了他们的第一次贡献
* @github-actions[bot] 做出了他们的第一次贡献
## [1.0.6](https://github.com/xiyure/k-component-lib/compare/v1.0.0..v1.0.6) - 2025-01-08

### 💼 修改

- 优化 提示位置 - ([eb37361](https://github.com/xiyure/k-component-lib/commit/eb3736142d0fb88ee642e892ae9f714dc187d22d))
- Add focus, blur - ([ed7fb78](https://github.com/xiyure/k-component-lib/commit/ed7fb78a999761b499551fc8a6c2f838b46d6c1c))
- 优化气泡窗滚动条 - ([cdc1dc7](https://github.com/xiyure/k-component-lib/commit/cdc1dc7b95bb1aa240ba390a9564cccdf550cbe4))
- 优化校验判断 - ([49e2376](https://github.com/xiyure/k-component-lib/commit/49e23760fd73cd9fc1cf1900e71c1d0c6086c54b))
- 优化校验边框样式 - ([feffc58](https://github.com/xiyure/k-component-lib/commit/feffc58a3e6f31d9a8fc684c08e7754ed7372cd7))
- 增加checkVariableName, 校验变量名是否合规 - ([21a1b54](https://github.com/xiyure/k-component-lib/commit/21a1b54d215b0ff08a9abd4c4c8521457f49a824))

## [1.0.0](https://github.com/xiyure/k-component-lib/compare/v0.0.123..v1.0.0) - 2025-01-07

### 🐛 Bug 修复

- ScriptInput组件密码框/文本框切换选择脚本标签时内容丢失问题； - ([6712892](https://github.com/xiyure/k-component-lib/commit/671289204d7341f3653dc3142d3b20c6c0557233))

### 📚 文档

- 添加 color.md - ([f912d5f](https://github.com/xiyure/k-component-lib/commit/f912d5fe58f0be5cb1b035a9157989a5c9d542b5))
- 添加团队页和变更页面 - ([f61d99b](https://github.com/xiyure/k-component-lib/commit/f61d99bea95e0bf20dbcbeadd52cc68829c90247))
- 新增提交规范 - ([4b29f83](https://github.com/xiyure/k-component-lib/commit/4b29f83c5b0d9d0a5000e5c35c77049707402812))

## 新贡献者 ❤️

* @github-actions[bot] 做出了他们的第一次贡献
## [0.0.120] - 2024-12-25

### 🚀 特性

- 折叠面板, 多选框, 表单 - ([ec2c16c](https://github.com/xiyure/k-component-lib/commit/ec2c16c5ff67b90d33308b6c3b26ce035a91819a))

### 🐛 Bug 修复

- 表头控制器拖拽排序后，onTransferChange事件数据回显错误问题； - ([77127b6](https://github.com/xiyure/k-component-lib/commit/77127b649915ef9f035556566f2a3ed0addc3ce4))
- 表格checkboxConfig设置checkRowKeys时异常报错； - ([95a53ee](https://github.com/xiyure/k-component-lib/commit/95a53ee386ae6eeff6a74fc2ccdfef8d1a24fb27))
- ScriptInput换行时选择脚本标签光标异常问题； - ([1d8fc37](https://github.com/xiyure/k-component-lib/commit/1d8fc3743c45eadce4001d03193d2fbea48284a5))
- Tree-transfer点击文字区域无法返回更新后的数据； - ([30549d1](https://github.com/xiyure/k-component-lib/commit/30549d1b7e319bab696b6ded2caebb74feab7ca4))
- Step组件变量名与外部冲突问题； - ([be2b59f](https://github.com/xiyure/k-component-lib/commit/be2b59f3f5dc21115873ee22f2dda7db8845c738))
- 页面存在多个ScriptInput组件时焦点异常问题； - ([65cb8fb](https://github.com/xiyure/k-component-lib/commit/65cb8fbd0348f156a9774d8c4fae403872859bc8))
- ScriptInput组件换行后乱码问题； - ([51b3f2b](https://github.com/xiyure/k-component-lib/commit/51b3f2b6bd378fcef868336c734f1edec5b5ee1a))
- ScriptInput双向绑定失效问题； - ([728337a](https://github.com/xiyure/k-component-lib/commit/728337a1f392d4a0a39ddd17d3305aa822c00892))
- 项目样式切换无效问题； - ([cbdd65b](https://github.com/xiyure/k-component-lib/commit/cbdd65b4490556e32b436345b478229b0e35216a))
- Tab组件在tsx文件中使用时异常警告问题； - ([ce8ffde](https://github.com/xiyure/k-component-lib/commit/ce8ffdee325b04cd4f88fd68d61a102659fe0dfd))
- 日历组件高度异常； - ([a82a7ed](https://github.com/xiyure/k-component-lib/commit/a82a7ed883c4ec8ed529d3ae23f91500e8feae07))
- 修复组件库build时index.d.ts文件丢失问题； - ([8ae82cc](https://github.com/xiyure/k-component-lib/commit/8ae82ccce8ced7ee9e73d7f87046cb81947ee828))
- 修复树形表格关闭高级筛选时报错问题； - ([ea7d911](https://github.com/xiyure/k-component-lib/commit/ea7d9119b9a017c5bdfb7785b3486d504bf7e19b))
- 修复表格单元格高亮偶现异常问题； - ([709bf3e](https://github.com/xiyure/k-component-lib/commit/709bf3e2e60e16503ebdf02fe2b532904effe295))

### 💼 修改

- 修复adaptive - ([f2dd38c](https://github.com/xiyure/k-component-lib/commit/f2dd38c281fe449907ec9e79f1e1c5ada8e6ebda))
- 1.添加 onlyOneInput 只选一个值;  2. 返回对象添加 isStringMode - ([a749228](https://github.com/xiyure/k-component-lib/commit/a7492287d2febbcb7a512b0b943095daec73ceb9))
- 搜索功能保持数据状态搜索前后的一致性； - ([61089dd](https://github.com/xiyure/k-component-lib/commit/61089dda2dcd3fb01b601722d273d82d3a1c5123))
- 滑块按钮, KSliderButton - ([100001e](https://github.com/xiyure/k-component-lib/commit/100001e4d42af6a16b4c64902de33dcc7c7ddfb6))
- 步骤条, 添加 useAntStyle:? boolean - ([782f58c](https://github.com/xiyure/k-component-lib/commit/782f58c7a0efa1ddc4b7567f295544168dc6aa46))
- 支持默认表头控制器数据通过参数进行设置； - ([6cd042f](https://github.com/xiyure/k-component-lib/commit/6cd042f94d72f7a62720dc7cd83da73bc57e24fc))
- Null, 提交人: MT, 内容: docs:修改 radio 示例 - ([9b6bac3](https://github.com/xiyure/k-component-lib/commit/9b6bac35893866e7657332d27b19d1e26a86f1f4))
- Null, 提交人: MT, 内容: 修改版本号至0.0.53 - ([904e6ce](https://github.com/xiyure/k-component-lib/commit/904e6ce833d021288c573bce5ff974eb3349947e))
- 微前端国金项目, 提交人: MT, 内容: 模板组件样式优化 - ([fbbe75e](https://github.com/xiyure/k-component-lib/commit/fbbe75e9eaf9ff5b3771ed62e3fd498b3d6394f7))
- Null, 提交人: MT, 内容: 移除 example 文件夹 - ([0dd240a](https://github.com/xiyure/k-component-lib/commit/0dd240ace090cce8a534b8b58be04bd28c5dd98d))
- Null, 提交人: MT, 内容: - ([f92545f](https://github.com/xiyure/k-component-lib/commit/f92545feab1c5406d5d4e6dd68080ba9841ccd52))
- Null, 提交人: MT, 内容: 修复穿梭框样式冲突 - ([52fa2ff](https://github.com/xiyure/k-component-lib/commit/52fa2ffd7452f64605d28f165b95c8f70ce67cdc))
- Null, 提交人: MT, 内容: 更新详情页示例 - ([8a3f5ed](https://github.com/xiyure/k-component-lib/commit/8a3f5edd44a198974adac0c7a46f31a4849225cc))
- Null, 提交人: MT, 内容: 组件库更新至 0.0.51 - ([ede9bc7](https://github.com/xiyure/k-component-lib/commit/ede9bc74c263f51f00f4ae4777df2cdfe7e0b1c4))
- Null, 提交人: MT, 内容: 规范详情页模板api - ([ecf8857](https://github.com/xiyure/k-component-lib/commit/ecf88574466f7f95f9be6700c2fbe17fceb2b05c))
- Null, 提交人: MT, 内容: 添加详情页模板 - ([63d278f](https://github.com/xiyure/k-component-lib/commit/63d278ff705b4b1f5188bfad8a477d8dd76542d2))
- Null, 提交人: MT, 内容: 修复模板show-aside默认值bug - ([e98c8b5](https://github.com/xiyure/k-component-lib/commit/e98c8b5694048563f8a1ee57c1051242f652a311))
- Null, 提交人: MT, 内容: 修复知识库文章中资源无效链接 - ([187bb86](https://github.com/xiyure/k-component-lib/commit/187bb864e83a16fb678b87924b54ec5c0ef2d29b))
- Null, 提交人: MT, 内容: 修改docs包引入方式 - ([a5f7727](https://github.com/xiyure/k-component-lib/commit/a5f772773bd2008eeebe3c50fda9d48b57698c9d))
- 添加doc, 提交人: MT, 内容: 示例 - ([f409cbe](https://github.com/xiyure/k-component-lib/commit/f409cbef6c5f4b8c1572b0bdb1d43b47b1b82e58))
- Null, 提交人: MT, 内容: 修复 input placeholder 的样式差异 - ([41b601f](https://github.com/xiyure/k-component-lib/commit/41b601fce2e52390fb7202e419e1c102a1127ad0))
- Null, 提交人: MT, 内容: 添加示例 - ([7ab7470](https://github.com/xiyure/k-component-lib/commit/7ab7470858e3423f55d84ef1dbc94a17431ddde6))
- 组件库样式动态导入； - ([899ef7c](https://github.com/xiyure/k-component-lib/commit/899ef7cff802d81214cdf0aa6a639809c7839719))
- Null修复联金radioGroup--button样式, 提交人: MT, 内容: - ([bd62687](https://github.com/xiyure/k-component-lib/commit/bd62687eba202407690fdb9884078758804cb489))
- 更改文档的组件引用路径, 提交人: MT, 内容: - ([ed0dab4](https://github.com/xiyure/k-component-lib/commit/ed0dab4e701fcadce2a870b1e749dfad78817240))
- 修改模板参数示例, 提交人: MT, 内容: - ([7cc1a17](https://github.com/xiyure/k-component-lib/commit/7cc1a17e8fd4e2558baa756259e5ca430354ed02))
- Lg样式 - ([c3e4e7a](https://github.com/xiyure/k-component-lib/commit/c3e4e7aede1d5ccc16316d1cf8426f1fe3c4efd5))
- Null, 提交人: MT, 内容: 重构checkbox-group - ([598920d](https://github.com/xiyure/k-component-lib/commit/598920d24311a19ca94d8d3195ee1cf85f259152))
- Null, 提交人: MT, 内容: 重构 checkbox - ([3907b56](https://github.com/xiyure/k-component-lib/commit/3907b56d6f6274bdcd95a0c435ef5e02fd98a62a))
- Null, 提交人: MT, 内容: 修改了 radio 控制方向的 api: row(def) colum - ([82cd171](https://github.com/xiyure/k-component-lib/commit/82cd17111b26e2ac2a11fbf0dfcfce5d4ac16985))
- Null, 提交人: MT, 内容: 重构 button 与 radio的组件样式 - ([52df96c](https://github.com/xiyure/k-component-lib/commit/52df96c379f5ce4c7701790d2a6fe8df5f3a3bb8))
- Null, 提交人: MT, 内容: utils 添加自定义颜色hook - ([9944433](https://github.com/xiyure/k-component-lib/commit/9944433052d688a9aa8fea29e0fef4b51031906f))
- Null, 提交人: MT, 内容: ant分之变量文件合并到dev分支 - ([b3fa28e](https://github.com/xiyure/k-component-lib/commit/b3fa28e03a553f06f51ad1bba17b0354ac0aa780))
- Null, 提交人: MT, 内容: docs 添加按钮示例 - ([a9ae24d](https://github.com/xiyure/k-component-lib/commit/a9ae24d2d9b4bd775dc7fdd1dd4d4577553dc294))
- Null, 提交人: MT, 内容: doc修改button - ([2fcda80](https://github.com/xiyure/k-component-lib/commit/2fcda800e005f8e919dd0786b9dcac21160f7cda))
- Null, 提交人: MT, 内容: button支持 link 属性 - ([1ccef4c](https://github.com/xiyure/k-component-lib/commit/1ccef4cbdf4db3978ff9f0adecae5b68c21d9078))
- 组件库支持按需引入； - ([ebb43a6](https://github.com/xiyure/k-component-lib/commit/ebb43a6042e7c499785474b9922e7e26acfad1de))
- Null, 提交人: MT, 内容: 修复 tailwind 收系统风格影响 - ([f3506ee](https://github.com/xiyure/k-component-lib/commit/f3506ee7ea477177a1b70f68973a7ea741886f59))
- Null, 提交人: MT, 内容: 修改pageTableView 视图插槽名称 - ([59091f1](https://github.com/xiyure/k-component-lib/commit/59091f1b41869b35b02084c609df211e389bb3ba))
- Null, 提交人: MT, 内容: 添加模板:表格页面,详情页面,视图 - ([9ecfefd](https://github.com/xiyure/k-component-lib/commit/9ecfefd4a3409c4d963209856e668fd2d63e4dd7))
- Null, 提交人: MT, 内容: 删除 result props 中的 icon - ([c8750a7](https://github.com/xiyure/k-component-lib/commit/c8750a70c769e9aafae3eeccefd2b8743433bb96))
- Null, 提交人: MT, 内容: 添加 tailwindcss - ([72df54e](https://github.com/xiyure/k-component-lib/commit/72df54e67f1b64fae0af70686d2183b9bcf873c9))
- Null, 提交人: MT, 内容: 添加第一个模板组件 KPageHead - ([63ac16b](https://github.com/xiyure/k-component-lib/commit/63ac16b65ead877c8ea54fee2f31f37b914ab8cf))
- Null, 提交人: MT, 内容: result 添加媒体查询, 控制默认文字大小 - ([261edb7](https://github.com/xiyure/k-component-lib/commit/261edb7e15bdabef3541351cc5dc140d616fbbc8))
- Null, 提交人: MT, 内容: 重构 KResult 组件 - ([289970c](https://github.com/xiyure/k-component-lib/commit/289970c2d34779f71b6debf09313f1e1652b86dc))
- Null, 提交人: MT, 内容: 修改按钮样式的选择器,至不影响项目组样式 - ([6c90b4b](https://github.com/xiyure/k-component-lib/commit/6c90b4bdb93fcea830888aed96a097f8a0d25fea))
- 根据业务场景进行分离； - ([9533421](https://github.com/xiyure/k-component-lib/commit/9533421dd789a8652b6d8b69f3cb635a24f75ffa))
- Null, 提交人: MT, 内容: 修复btn-Group中的按钮间隙 - ([33b3e18](https://github.com/xiyure/k-component-lib/commit/33b3e18beb520b382dcffbc4f52d2669c7ea7572))
- AP499, 提交人: MT, 内容: 1.优化按钮focus样式 - ([ef0a036](https://github.com/xiyure/k-component-lib/commit/ef0a03688be14e2a7d0dab332dcf1612d168481b))
- Null, 提交人: MT, 内容: 修改input插槽中按钮的默认margin:-20px - ([2b69d52](https://github.com/xiyure/k-component-lib/commit/2b69d52dce34e8b798a26dc858a9ce676ae15418))
- Null, 提交人: MT, 内容: 优化button-baseclass逻辑 - ([8d0cc01](https://github.com/xiyure/k-component-lib/commit/8d0cc01e6d2bfc2ba58b0b0f9a1551fc00de7528))
- Null, 提交人: MT, 内容: treeSelect添加一个empty具名插槽 - ([8fa2a17](https://github.com/xiyure/k-component-lib/commit/8fa2a17562a57ac0c6da80caa094087599b328ca))
- Null, 提交人:MT, 内容:max仅针对tooltips - ([612f216](https://github.com/xiyure/k-component-lib/commit/612f2165d4dac3a484f8e0952075457fe8465b40))
- Null, 提交人:MT, 内容:修复tag字体大小 - ([5e20048](https://github.com/xiyure/k-component-lib/commit/5e20048a887abc5944ab75a6672ed7cc6f62c22c))
- Null, 提交人:MT, 内容:优化tag样式 - ([f051010](https://github.com/xiyure/k-component-lib/commit/f05101022ab8f30065801d0e935fdf536dab86f0))
- Null, 提交人:MT, 内容:优化tooltip默认样式 - ([7d3fbd8](https://github.com/xiyure/k-component-lib/commit/7d3fbd807494ba263da49e8b23d4595c82fd0a22))
- Button-group样式, input 插槽样式 - ([824f6b9](https://github.com/xiyure/k-component-lib/commit/824f6b92ad69db12c386817572922ddc7fd47769))
- Tree-table head内容 宽度适配 - ([1007a5d](https://github.com/xiyure/k-component-lib/commit/1007a5d6da7d31d8090dd39c210efab2b448deb6))
- Tab 下划线长度优化 - ([eadffb3](https://github.com/xiyure/k-component-lib/commit/eadffb3358ee8c014d535bf41e1abc125a9dacd9))
- Css变量 - ([6b76a83](https://github.com/xiyure/k-component-lib/commit/6b76a838a61dd18fa925471093598a9eb4b8736e))
- Tab 长度自适应 - ([56e58ac](https://github.com/xiyure/k-component-lib/commit/56e58ac7d6f09f4c1d301078f4a36ec1f7b09423))
- Tabs 添加 maxWidth 属性 - ([10beb29](https://github.com/xiyure/k-component-lib/commit/10beb299deb517afb3f0a8e6b244a074246a7c58))
- Tab样式优化 - ([547b023](https://github.com/xiyure/k-component-lib/commit/547b0236f8fd85a6751e803ea1599c04d4b0f86c))
- Tabs 样式优化 - ([80bd7e9](https://github.com/xiyure/k-component-lib/commit/80bd7e961e2a59ce2bc5763bf765f0f84ad62923))
- 修改 tabs--more 样式 - ([5366e1c](https://github.com/xiyure/k-component-lib/commit/5366e1c668862ffbc4bb451cefe77d761aed0d07))
- 优化 tag 样式 - ([431f484](https://github.com/xiyure/k-component-lib/commit/431f48461ccfe0ec39bbf75eac0043cab14fb8ea))
- Tag 与 tooltip 的一些 ui 细节 - ([0f4f0a7](https://github.com/xiyure/k-component-lib/commit/0f4f0a7ef48a4cb7c7dd5e4ef95fc63fcd1f83bd))
- 批量操作样式, 添加圆角 - ([5229541](https://github.com/xiyure/k-component-lib/commit/522954113365f97353c2606fd9c72757c9892890))
- 批量操作样式 - ([f08bc8a](https://github.com/xiyure/k-component-lib/commit/f08bc8a709adf23cb772a2d8cbd37371164ff804))
- Tag, 添加 text 属性 - ([c2c88dd](https://github.com/xiyure/k-component-lib/commit/c2c88dd5b1733a0193417c4432416399cc40d75b))
- 修改 checkbox 样式冲突, 导致勾选偏移的问题 - ([7b578ed](https://github.com/xiyure/k-component-lib/commit/7b578ed22a834cb7c9a79fa46e3e898a164b032e))
- Checkgroup gap; 添加css 样式字符串枚举 - ([f9f5dea](https://github.com/xiyure/k-component-lib/commit/f9f5dea1f171bd1e0b5b12bc474f7eef2258f15a))
- 1.KSelect-支持禁用样式; 2.KInput, 修复'禁用时插槽中的图标点击事件应禁用'; 3.重写 checkbox 样式; - ([4650928](https://github.com/xiyure/k-component-lib/commit/46509286fd68a3884ea8b5fdf2b055d8a19fafee))
- Select, size:sm - ([c8252cd](https://github.com/xiyure/k-component-lib/commit/c8252cd0d886cf96b40d88e9a6e0c53669b273fe))
- 优化 input 插槽中按钮样式 - ([2498503](https://github.com/xiyure/k-component-lib/commit/249850329e0ea38ae36afb122b3892b8638dfd6c))
- Tree_select 文件夹显示问题 - ([aa1c889](https://github.com/xiyure/k-component-lib/commit/aa1c889c47844c2f7143971bc18b6c7bc073e2af))
- Comp.d.ts总是多出 RouterLink&RouterView - ([2ec1795](https://github.com/xiyure/k-component-lib/commit/2ec1795562169a563bd993e406706812029f87ab))
- 修复input 内部插槽 prefix-icon, suffix-icon, prefix, suffix - ([c2c94f5](https://github.com/xiyure/k-component-lib/commit/c2c94f5c808f721f5e15e9efa925005ccb5cb697))
- 覆写el-input 插槽 button margin -20px - ([07ad874](https://github.com/xiyure/k-component-lib/commit/07ad874218c5726dc109d996f6ec37cded9cb72c))
- Input 插槽css选择器优化 - ([afdad2f](https://github.com/xiyure/k-component-lib/commit/afdad2f2d583eac7ae0aa854a71c4bfb8ac523fc))
- 修复 input 插槽 边缘重叠 bug - ([a15b56e](https://github.com/xiyure/k-component-lib/commit/a15b56e21385688459a10c13073d23bc25128f47))
- Input 前后插槽样式已修复 - ([8ae1282](https://github.com/xiyure/k-component-lib/commit/8ae12820df31842d6c083682d5ce5a493f1aade3))
- 输入框插槽样式 - ([c3cd09b](https://github.com/xiyure/k-component-lib/commit/c3cd09b224d4629d30bca32c8e1ec77491fcb3d3))
- Button--icon 颜色 - ([a1f56c3](https://github.com/xiyure/k-component-lib/commit/a1f56c33990df892d25866b1936f57cd356d773d))
- 公共class 中字体相关 - ([405964e](https://github.com/xiyure/k-component-lib/commit/405964e3a2278e0fd8881982f0878a845ff667b9))
- 冗余公共样式; change: input 插槽 - ([8d5329e](https://github.com/xiyure/k-component-lib/commit/8d5329ed127912649a1a700cc6cf61d9c698e85a))
- Prettierrc 格式化插件 - ([6f29432](https://github.com/xiyure/k-component-lib/commit/6f2943201c2eef09ffc951b9e71d6dac825fbc26))
- Tabs hover 样式, 公共变量中添加 --k-rounded-full - ([8119c3d](https://github.com/xiyure/k-component-lib/commit/8119c3da03a7c11296a3b3533e42080955747cb5))
- Tabs 样式, 类选择器方案 - ([af3edb7](https://github.com/xiyure/k-component-lib/commit/af3edb77e650f928196ad5a5db1c0d2f112cac3c))
- Tabs 样式 :has() 方案 - ([1e0304e](https://github.com/xiyure/k-component-lib/commit/1e0304e950728ca62b55ac401f1aa3b0e52606f3))
- Tabs closable 按钮样式偏移 - ([b9b43e0](https://github.com/xiyure/k-component-lib/commit/b9b43e08f2ac37fcc4c31c15659ce1d2d92c628a))
- 按钮 padding 微调, 输入框 插槽样式微调 - ([ca3ed62](https://github.com/xiyure/k-component-lib/commit/ca3ed6230bbea13e8f615cc30ea800f58f8205c5))
- Input 以及插槽样式 - ([9eb9c0d](https://github.com/xiyure/k-component-lib/commit/9eb9c0d24a06b73badad857f32f0e8e0473238cc))
- 优化 button icon style - ([5ac4b98](https://github.com/xiyure/k-component-lib/commit/5ac4b981a373419ebfb2c49850add4055239d17c))
- Button disable 点击事件 - ([0a5bf04](https://github.com/xiyure/k-component-lib/commit/0a5bf048676deb2be12a56b90b6018b219f33974))
- 图标库全局引入, 添加 TreeSelect 组件, 修改 Tree 样式 - ([70057f3](https://github.com/xiyure/k-component-lib/commit/70057f33eb22de755824eae1e6d97cf606fef105))
- 新组件 inputGroup - ([ec2368d](https://github.com/xiyure/k-component-lib/commit/ec2368dc8f0066bb2e14eb5df002ef21881d3b19))
- 修改 tabs 中的 样式污染 - ([f42e238](https://github.com/xiyure/k-component-lib/commit/f42e2389ad46afefb6909af826b5ac45a018a8be))
- Radio 样式与type.d 描述 - ([04ee113](https://github.com/xiyure/k-component-lib/commit/04ee113c42d3ad867e08d17adecc56633ea6fe5e))
- 公共样式字体引入 - ([6eec7bd](https://github.com/xiyure/k-component-lib/commit/6eec7bda9768fabd840173523e790e8174da6c73))
- Button > type.d - ([47286e8](https://github.com/xiyure/k-component-lib/commit/47286e87707674cdff4d0d15d776aa3ce35e6188))
- Button radio 公共样式 - ([3e2aff4](https://github.com/xiyure/k-component-lib/commit/3e2aff4f6652ffb229abaf121684888d1aa73732))
- 单元格图标添加内置状态； - ([697be3c](https://github.com/xiyure/k-component-lib/commit/697be3cb20a5a4ad380944689cc42e89334e0036))
- K-button 自定义颜色函数名称; type.d 参数描述 - ([64870d6](https://github.com/xiyure/k-component-lib/commit/64870d68cc7a81c195d2d84809d44512db39b642))
- Button 支持el type, 自定义 color - ([14a6dd7](https://github.com/xiyure/k-component-lib/commit/14a6dd7181f0840979f8a5333afeb0b4a157a9f2))
- Button 中的打印 - ([0da7cdf](https://github.com/xiyure/k-component-lib/commit/0da7cdf2cac265552efa6314f0c4cee47bbb8025))
- Checkbox 名称恢复正常 - ([9fd0290](https://github.com/xiyure/k-component-lib/commit/9fd02902870fd1e444bb970325728a0216536f11))
- Checkbox 改名 - ([08217ba](https://github.com/xiyure/k-component-lib/commit/08217ba436d81cf0e90bdcd95608c927e2125831))
- Button type.ts - ([3a583cc](https://github.com/xiyure/k-component-lib/commit/3a583ccf807700df1598443476679e59c32b34a9))
- Button ts 添加注释 - ([9776731](https://github.com/xiyure/k-component-lib/commit/97767313fe64e3f48a8a9a15e05c5814a2d25c26))
- 按钮样式 - ([784d862](https://github.com/xiyure/k-component-lib/commit/784d862eaa02cf17faae6b8a60c7bd6372908353))
- Utils > GetColorLevel darkFactor 默认值 0.9 >> 0.8 - ([34de852](https://github.com/xiyure/k-component-lib/commit/34de852d93a17ce33dc1b20ef475ce0d9ba3ad14))
- 自定义颜色变量名称变更 - ([6f36a04](https://github.com/xiyure/k-component-lib/commit/6f36a043d877767473b55e4b600d210951196a4c))
- Button 自定义颜色 - ([1416bb8](https://github.com/xiyure/k-component-lib/commit/1416bb825b6c5934ccd1e6c53469bcd85758b915))
- Button style 去掉 外壳 - ([2088c93](https://github.com/xiyure/k-component-lib/commit/2088c93f6f276c329415499bddfbd87d2134ae0f))
- Button 样式 - ([de0489d](https://github.com/xiyure/k-component-lib/commit/de0489d506849e20b5d76ddda4c8ed5ea2f1df90))
- Less 变量添加 yellow - ([8595f49](https://github.com/xiyure/k-component-lib/commit/8595f497493139f22bc58e55ef5e45f5a184454b))
- Variable.less >> add color yellow - ([3b7b631](https://github.com/xiyure/k-component-lib/commit/3b7b6318749c560bc81773e5b8c5bbba0694acbf))
- RadioGroup 样式, 增加方向传参 - ([792a23d](https://github.com/xiyure/k-component-lib/commit/792a23d848dceb27751a1af5893a1c973f74d621))
- Radio, size:sm 样式 - ([1bc6304](https://github.com/xiyure/k-component-lib/commit/1bc630493f9f7a930eadc2f4a51fd47ec40c7f53))
- Radio, api-size, 重写样式 - ([33302de](https://github.com/xiyure/k-component-lib/commit/33302de95ef602072e3d518083bdbf12ce294715))
- Button type 警告 - ([e65a601](https://github.com/xiyure/k-component-lib/commit/e65a60156643b3e6087275d580ec8674b1c91192))
- Button icon传值样式bug - ([e062fa4](https://github.com/xiyure/k-component-lib/commit/e062fa4c9a489d983f1215c411819ed621fc8890))
- Button样式, loading自动旋转 - ([aa023d3](https://github.com/xiyure/k-component-lib/commit/aa023d3adb7bc9f40aa1c80d0600adeaa2d47c85))
- 1.button样式; 2.button添加具名插槽 - ([45ae58f](https://github.com/xiyure/k-component-lib/commit/45ae58fbeb488f8d7c47aeb7775a4a089342f68c))
- Less变量文件 - ([e1f7e2d](https://github.com/xiyure/k-component-lib/commit/e1f7e2df177b4c2fee97e156879f7282213be91c))
- Less变量文件 - ([1cd8e2f](https://github.com/xiyure/k-component-lib/commit/1cd8e2f9b5e43d2d9baddef5a47451fa647578ab))

### 📚 文档

- 删除 lock 文件 - ([15eab8b](https://github.com/xiyure/k-component-lib/commit/15eab8b0f216f448166d5addfb2d077d60a7ca97))
- 还原打包 - ([3291700](https://github.com/xiyure/k-component-lib/commit/3291700130e99a705031e779540ff77eb4c524e7))
- 还原 - ([388ab67](https://github.com/xiyure/k-component-lib/commit/388ab671d074ac5f0be4e1d7e8edd9d0b9d27bdc))
- 移除path 优化配置 - ([9e0e756](https://github.com/xiyure/k-component-lib/commit/9e0e756fdfffde88d9b106ef2536d5a2d4eea322))
- 重新移入知识库, 添加左侧链接 - ([7b8d9c6](https://github.com/xiyure/k-component-lib/commit/7b8d9c66cae56c68902a29c8b0beca8e34241e19))
- 重新移入知识库 - ([24a03d3](https://github.com/xiyure/k-component-lib/commit/24a03d3cc0b41a5ed066fbf589a284bce46a9395))
- 初始化框架 - ([8aea768](https://github.com/xiyure/k-component-lib/commit/8aea768869fd0148b8d9038d7d234139b7050e44))
- 改造homepage - ([8f47f4a](https://github.com/xiyure/k-component-lib/commit/8f47f4a195a7367cd66dd786cd6575c72f675e23))
- 添加 api 示例 - ([1eb6fcc](https://github.com/xiyure/k-component-lib/commit/1eb6fcc261e4edec8a2010ff9bfe70f3e9373acc))

## 新贡献者 ❤️

* @ 做出了他们的第一次贡献
* @QijianMo 做出了他们的第一次贡献
* @sengoku-f 做出了他们的第一次贡献
* @baobaomi900901 做出了他们的第一次贡献
