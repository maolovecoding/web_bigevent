
// 每次发起ajax的异步请求的时候 不论是 post get 还是 ajax方法
// 都会在发起请求之前 
// 调用 jquery 的 ajaxPrefilter([dataType], handler(options,originalOptions,jqXHR))
// options 参数 就是发起请求时传递的那个配置对象
$.ajaxPrefilter(function (options) {
  // 拼接url地址 然后才会发起请求
  // options.url = "http://ajax.frontend.itheima.net" + options.url;
  options.url = "http://api-breakingnews-web.itheima.net" + options.url;
  
  // 统一为有权限的接口 设置headers请求头
  // 以 /my 开头的路径才加上这个请求头属性
  if(options.url.includes("/my/")){
      options.headers = {
    Authorization: localStorage.getItem("token") || '',
  };
  };
  // 全局统一挂载 complete 回调函数
  options.complete = function(res){
    // 在这个回调函数中 可以通过 res.responseJSON 
    // 拿到服务器响应回来的数据
    if(res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！"){
      // 1  强制清空token
      // 2  强制跳转页面到登录页面
      location.href = "./login.html";
    }
  }
});