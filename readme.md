<h1 align="center" style="color:red;">大事件项目</h1>

### 1  准备工作

#### 第一件事 初始化项目
在本地将这个项目交给git进行管理
并在GitHub上创建一个相应的仓库 将二者进行连接
然后将本地的项目代码推送到仓库上

1. 在 `code` 目录中运行 `git init` 命令
2. 在 `code` 目录中运行 `git add .` 命令
3. 在 `code` 目录下运行 `git commit -m "init project"` 命令
4. 新建 Github 仓库 `web_bigevent`
5. 将本地仓库和Github仓库建立关联关系
6. 将本地仓库的代码推送到Github仓库中
7. 运行 `git checkout -b login` 命令，创建并切换到 `login` 分支

##### 新建一个分支login 并切换到分支上

使用命令
```shell
git checkout -b login
# 使用git branch 验证

git branch
```
**接下来基于分支login进行开发**。

安装一个vscode插件 辅助开发  使网页基于http协议打开
插件名为：**live Server**

### 2. 登录注册功能
**登录注册功能的完成**
#### 2.1 绘制登录页面
在css文件夹下新建login.css书写登录页面样式
实现css样式已经登录功能

#### 对已完成的登录注册功能 已经页面进行提交到GitHub上
当前处于login分支
将该分支的代码推送到云端上
