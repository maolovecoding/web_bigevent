$(function () {
  // 初始化文章分类
  initCate();
  // 初始化富文本编辑器
  initEditor();



  const layer = layui.layer;
  const form = layui.form;

  // 定义加载文章分类的方法
  function initCate() {
    $.ajax({
      method: "GET",
      url: "/my/article/cates",
      success(res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        // 初始化成功
        // 调用模板引擎渲染分类的下拉菜单
        const str = template("tpl-cate", res);
        $("[name=cate_id]").html(str);
        // 一定要调用form.render()方法 重新渲染表单区域
        form.render();
      }
    });
  }


  // cropper初始化
  // 1. 初始化图片裁剪器
  var $image = $('#image');

  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
  }

  // 3. 初始化裁剪区域
  $image.cropper(options);


  // 为选中封面的按钮绑定点击事件
  $("#btnChooseImage").on("click", function () {
    // 模拟点击选择文件上传框
    $("#coverFile").click();
  });
  // 监听隐藏的文件框是否选择了新的文件
  $("#coverFile").on("change", function (event) {
    // 获取文件的列表数组
    const files = event.target.files;
    // 判断用户是否选择了文件
    if (files.length === 0) {
      return;
    }
    const file = files[0];
    const newImgURL = URL.createObjectURL(file);
    // 为裁剪区域重新设置图片
    $image
      .cropper('destroy')      // 销毁旧的裁剪区域
      .attr('src', newImgURL)  // 重新设置图片路径
      .cropper(options);        // 重新初始化裁剪区域
  });

  // 定义文章的发布状态
  let art_state = '已发布';
  // 为存为草稿按钮绑定点击事件处理函数
  $("#btnSave2").on("click", function () {
    art_state = "草稿";
  });
  // 监听表单的submit事件
  $("#form-pub").submit(function (event) {
    event.preventDefault();
    // 基于form表单 快速创建一个fromData对象
    const fd = new FormData($(this)[0]);
    // 文章发布状态也存到表单数据对象中
    fd.append("state", art_state);
    // 将封面裁减过后的图片 输出为一个文件
    $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 400,
        height: 280
      })
      .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
        // 得到文件对象后，进行后续的操作
        // 将文件对象存到表单对象中
        fd.append("cover_img", blob);

        // 发起ajax请求
        publishArticle(fd);
      });

  });
  // 发布文章的方法
  function publishArticle(fd){
    $.ajax({
      method:"POST",
      url:"/my/article/add",
      data:fd,
      // 注意  如果向服务器提交的是 FormData格式的数据
      // 必须添加 两个属性
      contentType:false,
      processData:false,
      success(res){
        if(res.status!==0){
          return layer.msg(res.message);
        }
        // 发布文章成功
        layer.msg(res.message);
        // 发布完文章后 跳回到文章列表页面
        location.href = "./art_list.html";
      }
    });
    
  }
})