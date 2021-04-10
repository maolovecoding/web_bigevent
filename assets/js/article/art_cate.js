$(function () {
  // 获取文章分类列表
  initArtCateList();

  // 定义弹出层索引
  let indexAdd = null;
  let indexEdit = null;

  // 点击添加类别 触发弹出 弹出层事件
  $("#btnAddCate").on("click", () => {
    // 调用 layer的open函数  弹出层
    indexAdd = layer.open({
      // 弹出类类别
      type: 1,
      // 指定宽高 数组第一个参数是宽
      area: ["500px", "250px"],
      // 标题
      title: "添加文章分类",
      // 内容
      content: $("#dialog-add").html()
    });
  });

  // 通过代理的方式 给弹出层  form-add 监听它的 submit 事件
  $("body").on("submit", "#form-add", function (event) {
    event.preventDefault();
    $.ajax({
      type: "POST",
      url: "/my/article/addcates",
      data: $(this).serialize(),
      success(res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        // 重新渲染 获取分类数据
        initArtCateList();
        // 提示新增分类成功
        layer.msg(res.message);
        // 关闭弹出层
        layer.close(indexAdd);
      }
    })
  });


  // 给 编辑  按钮绑定点击事件 实现文章编辑功能
  // 通过代理的形式
  $("tbody").on("click", "#btn-edit", () => {
    // 调用 layer的open函数  弹出层
    indexEdit = layer.open({
      // 弹出类类别
      type: 1,
      // 指定宽高 数组第一个参数是宽
      area: ["500px", "250px"],
      // 标题
      title: "修改文章分类",
      // 内容
      content: $("#dialog-edit").html()
    });
    // 获取当前编辑的文章的Id
    const Id = $("#btn-edit").data("id"); // 使用 data()方法不需要包含前面的 data-
    $.ajax({
      method: "GET",
      url: "/my/article/cates/",
      // 将当前要修改的文章id传递给服务器
      data: { Id },
      success(res) {
        /* if (res.status !== 0) {
          return layer.msg(res.message);
        } */
        // 修改文章数据成功
        // 填充数据 调用表单的val方法快速填充数据
        // 这个表单需要具有 lay-filter属性 参数一的值就是这个属性的值
        form.val("form-edit", res.data);
      }

    });
  });

  // 通过代理的形式  为修改分类的表单绑定 submit 事件
  $("body").on("submit", "#form-edit", function (event) {
    event.preventDefault();
    $.ajax({
      method: "POST",
      url: "/my/article/updatecate",
      data: $(this).serialize(),
      success(res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg(res.message, { icon: 1, time: 1000 });
        // 重新渲染数据
        initArtCateList();
        // 关闭弹出层
        layer.close(indexEdit);
      }
    })
  })


  // 删除文章的事件
  // 通过代理的形式 绑定事件
  $("tbody").on("click","#btn-delete",()=>{
    // 获取Id的值
    const Id = $("#btn-delete").data("id");
    // 提示用户是否删除
    layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
      //do something
      // 用户点击确认后执行这个里面的代码
      $.ajax({
        method:"GET",
        url:"/my/article/deletecate/"+Id,
        success(res){
          if(res.status !== 0){
            return layer.msg(res.message);
          }
          // 删除成功
          layer.msg(res.message);
          // 关闭弹出层
          layer.close(index);
          // 刷新列表数据
          initArtCateList();
        }
      });
    });
  });
});

const layer = layui.layer;
const form = layui.form;

// 获取文章分类列表
function initArtCateList() {
  $.ajax({
    type: "GET",
    url: "/my/article/cates",
    success(res) {
      // 获取文章列表失败
      if (res.status !== 0) {
        return layer.msg(res.message);
      }
      // 获取文章列表成功
      // 调用模板引擎 渲染表格数据
      const str = template("tpl-table", res);
      $("tbody").html(str);
    }
  });
}