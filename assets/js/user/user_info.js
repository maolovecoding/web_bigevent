$(function () {
  /* 指定form表单的验证规则 */
  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return "昵称长度必须在1-6之间！";
      }
    }
  });

  // 获取用户信息 并渲染
  initUserInfo();

  // 重置表单数据的方法  将属性还原为原来的信息
  $("#btnReset").on("click",function(event){
    // 阻止默认重置行为
    event.preventDefault();
    // 重新获取一下用户信息
    initUserInfo();
  });

  // 监听表单的提交事件
  $(".layui-form").on("submit",function(event){
    // 阻止表单是默认提交行为
    event.preventDefault();
    // 请求数据
    $.ajax({
      method:"POST",
      url:"/my/userinfo",
      data:$(this).serialize(),
      success(res){
        if(res.status !== 0){
          return layer.msg("修改用户信息失败！");
        }
        // 更新用户信息成功
        layer.msg(res.message,{icon:1,time:2000});
        // 重新获取用户信息并渲染
        // 调用父页面中的方法 重新渲染用户的头像和用户信息
        // window 表示当前的iframe框架 调用其父元素的方法重新渲染数据
        window.parent.getUserInfo();
      }
    })
  })
});

/* 导出layui的form对象 layer 对象*/
const form = layui.form;
const layer = layui.layer;


// 初始化用户基本信息的方法
function initUserInfo() {
  // 发起get请求
  $.ajax({
    type: "GET",
    url: "/my/userinfo",
    success(res) {
      if (res.status !== 0) {
        return layer.msg("获取用户信息失败！");
      }
      /* {id: 39971, username: "826106", nickname: "", email: "", user_pic: null} */
      // 调用 form.val()方法 快速为表单赋值
      // 第一个参数的值就是 这个表单上 lay-filter 属性的值 必须要有该属性
      // 第二个值就是要赋值给表单相应的值
      form.val("formUserInfo", res.data);
    }
  });
}


