$(function () {
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options);

  // 点击上传按钮 选择图片
  $("#btnChooseImage").on("click", () => {
    // 模拟用户点击文件选择框
    $("#file").click();
  });


  // 为文件选择框 绑定 change 事件  文件发生改变时触发
  $("#file").change((event) => {
    // event.target.files 可以获取用户选中的文件
    const files = event.target.files;
    if (files.length === 0) {
      return layer.msg("请选择照片");
    }
    // 拿到用户选中的文件
    const file = files[0];
    // 根据选中的文件 创建对应的URL地址
    const newImgURL = URL.createObjectURL(file);
    // 销毁旧的裁减区域  再重新设置图片路径  之后在创建新的裁减区域
    $image
      .cropper("destroy")// 销毁旧的裁减区域
      .prop("src", newImgURL)//重新设置图片路径
      .cropper(options)// 重新初始化裁减区域
  });


  // 确定更换头像事件
  $("#btnUpload").click(() => {
    // 1. 拿到用户裁减之后的头像
    var dataURL = $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
      // 调用接口  把头像上传到服务器
      $.ajax({
        type:"POST",
        url:"/my/update/avatar",
        data:{
          // 图片
          avatar:dataURL
        },
        success(res){
          if(res.status !== 0){
            return layer.msg(res.message);
          }
          // 更换头像成功
          layer.msg(res.message,{icon:1,time:1000});
          // 重新获取用户数据
          window.parent.getUserInfo();
        }
      })
  });
});

const layer = layui.layer;