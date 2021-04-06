$(function () {

  // 获取用户信息
  getUserInfo();

  // 退出功能的实现
  // 为退出按钮绑定单击事件
  $("#btnLogout").on("click", function () {
    // layer的confirm方法  
    // 第一个参数 提示消息
    // 第二个参数 弹出框的图标以及标题
    // 第三个参数 回调函数 如果用户点击了提示框的确认按钮就会调用
    layer.confirm('确定退出登录吗?', { icon: 3, title: '提示' }, function (index) {
      //do something
      // 退出时，清除本地的localStorage的数据，并返回登录页面
      localStorage.removeItem("token");
      location.href = "./login.html";

      // 关闭提示框
      layer.close(index);
    });
  })
});

// 导出全局的layer对象
const layer = layui.layer;

// 获取用户基本信息的函数
function getUserInfo() {
  // 发起ajax请求 回调函数 有三种
  // 请求成功 调用 success函数
  // 请求失败 调用 error函数
  // 无论成功或者失败 都会调用 complete函数

  

  $.ajax({
    method: "GET",
    url: "/my/userinfo",
    // 请求头配置对象
    /* headers: {
      Authorization: localStorage.getItem("token") || '',
    }, */
    success(res) {
      if (res.status !== 0) {
        // 请求失败
        return layer.msg(res.message);
      }
      // 验证成功 获取到了用户信息
      // 渲染头像
      renderAvatar(res.data);
    },
    // 无论成功或者失败 都会调用 complete函数
    /* complete(res){
      // 在这个回调函数中 可以通过 res.responseJSON 
      // 拿到服务器响应回来的数据
      if(res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！"){
        // 1  强制清空token
        // 2  强制跳转页面到登录页面
        location.href = "./login.html";
      }
    } */
  });

// 渲染头像的函数
function renderAvatar(user) {
  // 显示欢迎 xxx  如果用户有昵称  就优先渲染昵称
  // 没有昵称 就渲染名字
  // 渲染欢迎文本
  const name = user.nickname || user.username;
  /* if (user.nickname) {
    $("#welcome").html(`欢迎&nbsp;&nbsp;${user.nickname}`);
  } else {
    $("#welcome").html(`欢迎&nbsp;&nbsp;${user.username}`);
  } */
  $("#welcome").html(`欢迎&nbsp;&nbsp;${name}`);
  // 渲染用户头像
  // 如果用户具有头像 也就是 user_pic 那么就显示用户的头像
  // 如果没有设置头像  比如刚刚注册好账号 
  // 没有头像就渲染用户名或者昵称的第一个字符为头像
  if (user.user_pic) {
    // 设置了用户头像
    $(".userinfo").children("img").prop("src", user.user_pic).show();
    // 隐藏文字元素头像
    $(".userinfo").children("span").eq(0).hide();
  } else {
    // 么有设置头像 渲染文本头像
    $(".userinfo").children("img").hide();
    $(".userinfo").children(".text-avatar").html(name[0].toUpperCase()).show();
  }

}