# 项目简介
该项目是一个基于Elemnt Plus进行二次封装的组件库，在保留Element Plus原有API的同时对一些业务场景进行封装和功能扩展。

## 仓库地址
https://github.com/xiyure/k-component-lib.git

## 运行项目
1. npm i  ---安装项目依赖
2. npm run dev  ---运行项目

## 检查
代码提交前先执行npm run lint检查代码，如有问题代码，可通过npm run fix修复，无法修复的则需要手动消除错误，请确保提交的代码没有问题，否则无法合入。

## 提交规范

### 概括

> 常规提交规范是在提交信息之上的一个轻量级约定。它提供了一套易于遵循的规则，用于创建明确的提交历史；这使得在上面编写自动化工具变得更加容易。这个约定与 SemVer 相契合，通过描述提交信息中提到的特性、修复和破坏性变更。

提交包含以下结构元素，以向您的库的使用者者传达意图：

1. **fix:** 类型为 `fix` 的提交表示修复了代码库中的错误（这与语义化版本中的 [`PATCH`](http://semver.org/#summary) 版本相关）。

2. **feat:** 类型为 `feat` 的提交表示向代码库引入了新功能（这与语义化版本中的 [`MINOR`](http://semver.org/#summary) 版本相关）。

3. **BREAKING CHANGE:** 如果提交信息中包含脚注 `BREAKING CHANGE:`，或者在类型/作用域后附加了 `!`，则表示引入了破坏性的 API 变更（与语义化版本中的 [`MAJOR`](http://semver.org/#summary) 版本相关）。`BREAKING CHANGE` 可以出现在任何**类型**的提交中。

4. 除了 `fix:` 和 `feat:` 之外，还允许其他类型的提交信息，例如 [@commitlint/config-conventional](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional)（基于 [Angular 规范](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines)）推荐使用 `build:`、`chore:`、`ci:`、`docs:`、`style:`、`refactor:`、`perf:`、`test:` 等类型。

5. 除了 `BREAKING CHANGE: <描述>` 之外，还可以提供其他**脚注**，并遵循类似于 [git trailer 格式](https://git-scm.com/docs/git-interpret-trailers) 的约定。

Conventional Commits 规范并未强制要求使用其他类型，这些类型在语义化版本控制中也没有隐含的影响（除非它们包含 BREAKING CHANGE）。  

可以为提交类型提供一个**作用域**，以提供额外的上下文信息，作用域包含在括号内，例如：`feat(parser): add ability to parse arrays`。

## 示例

### 常规

#### 无正文的提交信息

```plaintext
docs: 更正 CHANGELOG 的拼写
```

输出:

```
更正 CHANGELOG 的拼写 - (feef1b4)
```

#### 包含作用域的提交信息

```plaintext
feat(lang): 添加波兰语支持
```

输出:

```
(lang) 添加波兰语支持 - (feef1b4)
```

### 重大变化

#### 使用 `!` 强调破坏性变更的提交信息

```plaintext
feat!: 产品发货时向客户发送邮件
```

输出:

```
[重大变更] 产品发货时向客户发送邮件 - (b2ea094)
```

#### 包含描述和破坏性变更脚注的提交信息

```plaintext
feat: 允许提供的配置对象扩展其他配置

CHANGE: 配置文件中的 `extends` 键现在用于扩展其他配置文件
```

输出:

```
[重大变更] 允许提供的配置对象扩展其他配置 - (cfe9f23)
```

#### 包含作用域并使用 `!` 强调破坏性变更的提交信息

```plaintext
feat(api)!: 产品发货时向客户发送邮件
```

输出:

```
(api) [重大变更] 产品发货时向客户发送邮件 - (0080264)
```

### 同时使用 `!` 和 BREAKING CHANGE 脚注的提交信息

```plaintext
chore!: 放弃对 Node 6 的支持

BREAKING CHANGE: 使用了 Node 6 中不可用的 JavaScript 特性。
```

### 提交元素中英文对照表

以下是一个提交信息中英文对照表，基于 `commit_parsers` 配置进行了整理：

| **英文前缀** | **中文前缀** | **分组标识**         |
|--------------|--------------|--------------------|
| `feat`       | `特性`, `新增`       | 🚀 特性              |
| `fix`        | `Bug`, `修复`| 🐛 Bug 修复          |
| `doc`        | `文档`       | 📚 文档              |
| `perf`       | `性能`       | ⚡ 性能              |
| `refactor`   | `重构`       | 🚜 重构              |
| `style`      | `css`, `样式`| 🎨 样式              |
| `test`       | `测试`       | 🧪 测试              |
| `chore`      | `ci`         | ⚙️ 杂项任务          |
| `security`   | -            | 🛡️ 安全              |
| `revert`     | -            | ◀️ 退回              |
| `.*`         | -            | 💼 修改              | 


### 示例：
- `feat: 添加新功能` 或 `特性: 添加新功能` 会被归类为 `🚀 特性`。
- `fix: 修复登录问题` 或 `修复: 修复登录问题` 会被归类为 `🐛 Bug 修复`。
- `doc: 更新 README` 或 `文档: 更新 README` 会被归类为 `📚 文档`。