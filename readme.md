<h1 align="center" style="color:red;">大事件项目</h1>

### 1 准备工作

#### 第一件事 初始化项目

在本地将这个项目交给 git 进行管理
并在 GitHub 上创建一个相应的仓库 将二者进行连接
然后将本地的项目代码推送到仓库上

1. 在 `code` 目录中运行 `git init` 命令
2. 在 `code` 目录中运行 `git add .` 命令
3. 在 `code` 目录下运行 `git commit -m "init project"` 命令
4. 新建 Github 仓库 `web_bigevent`
5. 将本地仓库和 Github 仓库建立关联关系
6. 将本地仓库的代码推送到 Github 仓库中
7. 运行 `git checkout -b login` 命令，创建并切换到 `login` 分支

##### 新建一个分支 login 并切换到分支上

使用命令

```shell
git checkout -b login
# 使用git branch 验证

git branch
```

**接下来基于分支 login 进行开发**。

安装一个 vscode 插件 辅助开发 使网页基于 http 协议打开
插件名为：**live Server**

### 2. 登录注册功能

**登录注册功能的完成**

#### 2.1 绘制登录页面

在 css 文件夹下新建 login.css 书写登录页面样式
实现 css 样式已经登录功能

#### 对已完成的登录注册功能 已经页面进行提交到 GitHub 上

当前处于 login 分支
将该分支的代码推送到云端上

#### 将 login 分支的代码合并到主分支 main 上

需要先切换到 main 分支，然后才能合并

```shell
# 查看当前处于什么分支
git branch
git checkout main
# 合并分支代码到主分支
git merge login
```

### 主页以及相关功能的开发
```shell
# 创建index分支并切换到 index分支
git checkout -b index
```
