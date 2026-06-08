# Heading Splitter 插件安装与使用说明

`Heading Splitter` 是一个为 Obsidian 编写的极简插件，用来把当前笔记按 H1、H2 或 H3 标题拆分成多个新笔记。

## 功能说明

该插件当前只保留 3 个命令：`Split note by headings - H1`、`Split note by headings - H2`、`Split note by headings - H3`，对应按一级、二级或三级标题拆分当前活动笔记。[cite:44]

拆分后的行为如下：
- 原笔记保持不变。
- 每个标题块会生成一篇新笔记，并保留原标题行。
- 输出位置为“原笔记所在目录下，以原笔记标题命名的子文件夹”。
- 新笔记文件名默认使用对应标题；如果重名，则自动追加 `-2`、`-3` 等后缀。

## 安装到 Obsidian

手动安装本地插件时，通常只需要把 `main.js` 和 `manifest.json` 放进 vault 的插件目录即可。

目标目录结构如下：

```text
你的Vault/
  .obsidian/
    plugins/
      heading-splitter/
        main.js
        manifest.json
```

安装步骤：
1. 找到当前 Obsidian vault 根目录下的 `.obsidian/plugins/` 文件夹；如果没有 `plugins` 目录，可以手动创建。
2. 在 `plugins` 下新建一个文件夹，名称建议与 `manifest.json` 中的 `id` 一致，即 `heading-splitter`。[cite:157]
3. 将 `main.js` 与 `manifest.json` 复制到该文件夹中。

## 启用插件

打开 Obsidian 后，进入 `Settings -> Community plugins`，确保社区插件功能已启用。

然后在 `Installed plugins` 列表中找到 `Heading Splitter` 并启用它。

如果插件没有立刻出现，可以尝试以下操作：
- 关闭并重新打开 Obsidian。
- 进入插件页面后重新刷新列表。
- 确认插件目录中确实存在 `main.js` 和 `manifest.json`。

## 使用方法

启用插件后，先打开一篇需要拆分的笔记，再按 `Ctrl + P`（macOS 为 `Cmd + P`）打开命令面板。

输入 `Split note by headings`，会看到以下命令：
- `Split note by headings - H1`
- `Split note by headings - H2`
- `Split note by headings - H3` 

选择其中一个命令后，插件会按对应层级标题拆分当前笔记。

例如，如果当前笔记按 `##` 组织内容，执行 `Split note by headings - H2` 后：
- 原笔记不变。
- 会在原笔记所在目录下创建一个与原笔记同名的子文件夹。
- 每个 H2 标题及其后续内容会生成一篇新笔记。
- 新笔记会保留该 H2 标题这一行作为正文第一行。

## 快捷键设置

如果需要更高频地使用某个命令，可以到 `Settings -> Hotkeys` 中搜索对应命令名称，并为它绑定快捷键。

例如，可以给 `Split note by headings - H2` 绑定一个自定义快捷键，以便在日常整理长笔记时更快执行。

## 常见问题

### 1. 在命令面板里找不到插件命令

先确认插件已在 `Community plugins` 中启用，并确认插件目录下包含 `main.js` 与 `manifest.json`。





