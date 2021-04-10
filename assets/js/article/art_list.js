$(function () {

  // 定义美化时间的过滤器
  template.defaults.imports.dateFormat = function (date) {
    const dt = new Date(date);
    const y = dt.getFullYear();
    const m = padZero(dt.getMonth() + 1);
    const d = padZero(dt.getDate());
    const hh = padZero(dt.getHours());
    const mm = padZero(dt.getMinutes());
    const ss = padZero(dt.getSeconds());

    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
  }
  // 补零函数
  function padZero(n) {
    return n < 10 ? '0' + n : n;
  }


  // 定义一个查询的参数对象 将来请求数据的时候
  // 需要将请求参数对象提交到服务器
  let q = {
    pagenum: 1,// 默认请求第一页的数据
    pagesize: 2,// 每页显示多少条数据
    cate_id: '',// 文章分类id
    state: ''// 文章的发布状态
  };

  const layer = layui.layer;
  const form = layui.form;
  const laypage = layui.laypage;

  initTable();

  // 获取文章列表数据的方法
  function initTable() {
    $.ajax({
      method: "GET",
      url: "/my/article/list",
      data: q,
      success(res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        // 获取成功
        // 通过模板引擎渲染页面数据
        const str = template("tpl-table", res);
        $("tbody").html(str);
        // 调用分页的方法 渲染分页的方法
        renderPage(res.total);
      }
    });
  }


  initCate();

  // 初始化文章分类的方法
  function initCate() {
    $.ajax({
      type: "GET",
      url: "/my/article/cates",
      success(res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        // 调用模板引擎渲染分类的选项
        const str = template("tpl-cate", res);
        $("[name=cate_id]").html(str);
        // 调用form的render()方法 重新渲染表单区域
        form.render();
      }
    });
  }

  // 为筛选表单绑定 submit事件
  $("#form-search").on("submit", function (event) {
    event.preventDefault();
    // 获取表单中的选中项的值
    const cate_id = $("[name=cate_id").val();
    const state = $("[name=state").val();
    // 为查询参数对象的对应的属性赋值
    q.cate_id = cate_id;
    q.state = state;
    // 重新渲染数据
    initTable();
  });

  // 定义渲染分页的方法
  function renderPage(total) {
    // 调用 laypage.render()方法渲染分页的结构
    laypage.render({
      elem: "pageBox",// 分页容器id
      count: total,//总数据条数
      limit: q.pagesize,// 每页显示几条数据
      curr: q.pagenum,// 指定默认选中那一页
      layout: ["count", "limit", "prev", "page", "next", "skip"],
      limits: [2, 3, 5, 10],
      // 分页发生切换的时候 点击页码按钮  触发jump函数 这时候 first的值是undefined
      // 只要调用了laypage.render()方法  也会触发jump回调函数 这时候first的值是true
      jump: function (obj, first) {
        // 通过first的值来判断是何种方式触发的回调
        // 如果first的值是undefined 那就是第一种方式触发的
        // obj 包含当前分页的所有参数
        // 最新的页码值 obj.curr
        q.pagenum = obj.curr;
        // obj.limit 最新的条目数
        q.pagesize = obj.limit;
        // 根据最新的q获取对应的数据列表并渲染表格
        if (!first) {
          initTable();
        }

      }
    });
  }

  // 通过代理的形式给删除按钮绑定删除事件处理函数
  $("tbody").on("click", ".btn-delete", function () {
    // 弹出询问层 是否删除该文章
    layer.confirm("确认删除？", { icon: 3, title: "提示" }, function (index) {
      const id = $(this).data("id");
      $.ajax({
        method: "GET",
        url: "/my/article/delete/" + id,
        success(res) {
          if (res.status !== 0) {
            return layer.msg(res.message);
          }
          layer.msg(res.message);
          layer.close(index);
          // 当数据删除完成后 需要判断当前页是否还有剩余文章
          // 如果没有了  需要让页码值减一
          // 获取删除按钮的个数
          const len = $(".btn-delete").length;
          if (len === 1) {
            // 页码值的最小值是1
            q.pagenum === 1 ? 1 : q.pagenum = q.pagenum - 1;
          }
          initTable();
        }
      });
    });
  })
});