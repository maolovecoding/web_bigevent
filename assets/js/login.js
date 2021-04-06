$(function () {
  // 登录表单和注册表单的相互切换
  // 前往注册表单的事件
  $("#link_reg").on("click", function () {
    // 当前元素的父亲盒子隐藏
    $(this).parent().parent().parent().hide()
      // 其父盒子的下一个名叫 .reg-box 的东西显示
      .siblings(".reg-box").show();
  });
  // 前往登录表单的事件
  $("#link_login").on("click", function () {
    $(this).parent().parent().parent().hide()
      .siblings(".login-box").show();
  });


  // 自定义表单的验证规则
  // 从layui 中获取form对象
  const form = layui.form;
  // 通过form.verify() 函数自定义校验规则
  // 参是是一个对象
  form.verify({
    // 自定义了一个 pwd 的校验规则 用来验证密码是否符合要求
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    "pwd": [
      // pwd 这种写法 这个规则以数组的形式进行书写
      // 数组的第一个位置是 规则 正则表达式
      /^[\S]{6,12}$/,
      // 第二个位置的值就是验证失败以后要弹出警示框的文字消息
      "密码必须在6到12位，且不能出现空格"
    ],
    // 定义 username 规则 用来验证用户名是否符合要求
    //value：表单的值、item：表单的DOM对象
    "username": function (value, item) {
      // 暂时保留 还未设置
    },
    // 校验两次密码是否一致的规则
    repwd(value, item) {
      // 通过形参拿到的是确认密码框中的值
      // 还需要拿到密码框的值
      // item 是当前要验证表单项的dom对象
      const reval = $(item).parent().prev().children("input[type=password]").val();
      // 然后进行比较判断  如果判断失败 则表示值不同
      // 值不同时返回必要的提示消息
      if (value !== reval) {
        return "两次输入的密码不一致！";
      }
    }
  });
  

  // 从layui中导出 layer对象
  const layer = layui.layer;


  //  以下是注册表单的的事件


  // 监听注册表单的提交事件
  $("#form_reg").on("submit", function (event) {
    // 阻止表单的默认提交行为
    event.preventDefault();
    // 获取表单数据
    const formDataStr = $(this).serialize().split("&");
    // 发起ajax的post请求
    $.post("/api/reguser",
      {
        username: formDataStr[0].split("=")[1],
        password: formDataStr[1].split("=")[1]
      },
      function (res) {
        // 请求成功返回响应数据
        if (res.status !== 0) {
          // 使用layer对象优化提示信息
          return layer.msg(res.message);
        }
        // layer.msg("注册成功！可以登录了！");
        layer.msg('注册成功！可以登录了！', {
          icon: 1,
          time: 2000 //2秒关闭（如果不配置，默认是3秒）
        },
          // 这个回调函数 是执行完msg这个提示框以后，也就是说提示框消失以后
          // 会执行这个回调函数里面的代码
          function () {
            //do something
          });
        // 跳转回登录的表单
        $("#link_login").click(); // 模拟点击 进行跳转
      });
  });


  // 以下是登录表单的事件

  $("#form_login").on("submit", function (event) {
    // 阻止表单默认提交行为
    event.preventDefault();
    // 获取表单数据
    // const formData = $(this).serialize().split("&");
    const formData = $(this).serialize();
    // 发起ajax的post请求 验证用户名和密码是否正确
    $.ajax({
      type: "POST",
      url: "/api/login",
      /* data: {
        username: formData[0].split("=")[1],
        password: formData[1].split("=")[1]
      }, */
      data: formData,
      success(res) {
        // 登录失败 用户名或者密码不对
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        // 验证成功 
        layer.msg(res.message, { icon: 1, time: 2000 });
        // 需要保存 reg.token的值 保存到本地存储
        localStorage.setItem("token", res.token);
        // 跳转到 后台主页
        location.href = "./index.html";
      }
    })
  })
});