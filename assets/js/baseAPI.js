
// 每次发起ajax的异步请求的时候 不论是 post get 还是 ajax方法
// 都会在发起请求之前 
// 调用 jquery 的 ajaxPrefilter([dataType], handler(options,originalOptions,jqXHR))
// options 参数 就是发起请求时传递的那个配置对象
$.ajaxPrefilter(function (options) {
  // 拼接url地址 然后才会发起请求
  options.url = "http://ajax.frontend.itheima.net" + options.url;
});