$(function () {

  // 自定义校检规则
  form.verify({
    pwd: [/^[\S]{6,12}$/, "密码必须在6-12位之间 且不能出现空格"],
    // 新旧密码不能相同 
    samePwd: function (value) {// value 就是校检规则的那个文本框的值
      if($("[name=oldPwd]").val() === value){
        return "新旧密码不能相同";
      }
    },
    // 新密码和确认密码的值要相同
    rePwd(value){
      if(value !== $("[name=newPwd]").val()){
        return "两次输入的密码不一致！";
      }
    }
  });


  // 监听表单的提交事件
  $(".layui-form").submit(function(event){
    // 阻止默认提交行为
    event.preventDefault();
    $.ajax({
      type:"POST",
      url:"/my/updatepwd",
      data:$(this).serialize(),
      success(res){
        if(res.status !== 0){
          // 修改密码失败
          return layer.msg(res.message);
        }
        // 修改密码成功
        layer.msg(res.message,{icon:1,time:2000});
        // 清空表单数据 相当于重置表单
        $(".layui-form")[0].reset();
      }
    });
  });
});

/* 导出表单对象 */
const form = layui.form;
const layer = layui.layer;
