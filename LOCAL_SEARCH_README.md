# 本地搜索功能说明 / Local Search Setup

## 快速开始 / Quick Start

### 中文说明
本主题已经默认启用了本地搜索功能，替换了原有的搜索2. Add search configuration to your site's `_config.yml`:
```yaml
search:
  path: search.json
  field: post
  content: true
  format: html
```

1. 安装搜索插件：`npm install hexo-generator-searchdb --save`
2. 在 Hexo 站点根目录的 `_config.yml` 中添加搜索配置
3. 重新生成站点：`hexo clean && hexo generate`

### English
The local search feature is enabled by default and replaces the original search button. Just:

1. Install the search plugin: `npm install hexo-generator-searchdb --save`
2. Add search configuration to your site's `_config.yml`
3. Regenerate the site: `hexo clean && hexo generate`

---

## 详细配置 / Detailed Configuration

### 功能特性
- 支持本地搜索，无需依赖外部服务
- 快速搜索文章标题和内容
- 支持关键词高亮显示
- 响应式设计，支持移动端
- 支持键盘快捷键 (Ctrl/Cmd + K)
- **已替换原有搜索功能**

### 安装配置

#### 1. 安装依赖插件
```bash
npm install hexo-generator-searchdb --save
```

#### 2. 配置 Hexo 站点 (_config.yml)
在 Hexo 站点根目录的 `_config.yml` 文件中添加：
```yaml
search:
  path: search.json
  field: post
  content: true
  format: html
```

#### 3. 主题配置
主题中的本地搜索默认已启用。如需修改配置，编辑主题的 `_config.yml`：
```yaml
local_search:
  enable: true          # 启用本地搜索
  trigger: auto         # auto: 自动搜索, manual: 手动搜索
  top_n_per_article: 1  # 每篇文章最多显示结果数
  unescape: false       # 是否转义HTML
  preload: false        # 是否预加载搜索数据
```

#### 4. 重新生成站点
```bash
hexo clean
hexo generate
hexo server
```

### 使用方法
1. 点击导航栏中的搜索图标
2. 在弹出的搜索框中输入关键词
3. 实时显示搜索结果
4. 点击结果项跳转到对应文章
5. 按 ESC 键或点击遮罩层关闭搜索弹窗

### 键盘快捷键
- `Ctrl + K` (Windows/Linux) 或 `Cmd + K` (Mac): 打开搜索弹窗
- `ESC`: 关闭搜索弹窗

---

## English

### Features
- Local search without external services
- Fast search through article titles and content
- Keyword highlighting
- Responsive design for mobile devices
- Keyboard shortcuts support (Ctrl/Cmd + K)

### Installation & Configuration

#### 1. Install Dependencies
```bash
npm install hexo-generator-searchdb --save
```

#### 2. Configure Hexo Site (_config.yml)
Add the following to your site's `_config.yml`:
```yaml
search:
  path: search.xml
  field: post
  content: true
  format: html
```

#### 3. Configure Theme (_config.yml)
Enable local search in theme configuration:
```yaml
local_search:
  enable: true
  trigger: auto
  top_n_per_article: 1
  unescape: false
  preload: false
```

#### 4. Regenerate Site
```bash
hexo clean
hexo generate
hexo server
```

### Usage
1. Click the search icon in the navigation bar
2. Type keywords in the search popup
3. View real-time search results
4. Click on results to navigate to articles
5. Press ESC or click overlay to close search popup

### Keyboard Shortcuts
- `Ctrl + K` (Windows/Linux) or `Cmd + K` (Mac): Open search popup
- `ESC`: Close search popup

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| enable | Boolean | false | Enable/disable local search |
| trigger | String | auto | Search trigger mode: 'auto' or 'manual' |
| top_n_per_article | Number | 1 | Max results per article (-1 for all) |
| unescape | Boolean | false | Unescape HTML in search results |
| preload | Boolean | false | Preload search data on page load |
