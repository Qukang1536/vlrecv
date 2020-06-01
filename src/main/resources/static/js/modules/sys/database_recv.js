$(function () {
  $("#jqGrid").jqGrid({
    url: baseURL + 'sys/database/list',
    datatype: "json",
    colModel: [{
        label: 'ID',
        name: 'id',
        width: 30,
        key: true
      },
      {
        label: '数据库类型',
        name: 'dbtype',
        width: 30
      },
      {
        label: '服务器IP',
        name: 'host',
        sortable: false,
        width: 60
      },
      {
        label: '端口',
        name: 'port',
        width: 20
      },
      {
        label: '用户名',
        name: 'user',
        width: 30
      },
      {
        label: '密 码',
        name: 'password',
        width: 30
      },
      {
        label: '数据库名',
        name: 'database',
        width: 30
      },
      {
        label: '数据库别名',
        name: 'alias',
        width: 30
      },
      {
        label: '创建日期',
        name: 'createTime',
        width: 80
      }
    ],
    viewrecords: true,
    height: 385,
    rowNum: 10,
    rowList: [10, 30, 50],
    rownumbers: true,
    rownumWidth: 25,
    autowidth: true,
    multiselect: true,
    pager: "#jqGridPager",
    jsonReader: {
      root: "page.list",
      page: "page.currPage",
      total: "page.totalPage",
      records: "page.totalCount"
    },
    prmNames: {
      page: "page",
      rows: "limit",
      order: "order"
    },
    gridComplete: function () {
      //隐藏grid底部滚动条
      $("#jqGrid").closest(".ui-jqgrid-bdiv").css({
        "overflow-x": "hidden"
      });
    }
  });
});

var vm = new Vue({
  el: '#rrapp',
  data: {
    q: {
      paramKey: null
    },
    showList: true,
    // 默认值
    title: null,
    database: {},
    btnValue: ''
  },
  methods: {
    query: function () {
      vm.reload();
    },
    testConn: function () {
      var url = "sys/database/testConn";
      $.ajax({
        type: "POST",
        url: baseURL + url,
        contentType: "application/json",
        data: JSON.stringify(vm.database),
        success: function (r) {
          if (r.code === 0) {
            alert('测试链接成功');
          } else {
            alert(r.msg);
          }
        }
      });
    },
    add: function () {
      vm.showList = false;
      vm.btnValue = "下一步";
      vm.title = "新增";
      vm.database = {};
    },
    update: function () {
      var id = getSelectedRow();
      vm.btnValue = "确定";
      if (id == null) {
        return;
      }

      $.get(baseURL + "sys/database/info/" + id, function (r) {
        vm.showList = false;
        vm.title = "修改";
        vm.database = r.database;
      });
    },
    del: function (event) {
      var ids = getSelectedRows();
      if (ids == null) {
        return;
      }

      confirm('确定要删除选中的记录？', function () {
        $.ajax({
          type: "POST",
          url: baseURL + "sys/database/delete",
          contentType: "application/json",
          data: JSON.stringify(ids),
          success: function (r) {
            if (r.code == 0) {
              alert('操作成功', function (index) {
                vm.reload();
              });
            } else {
              alert(r.msg);
            }
          }
        });
      });
    },
    saveOrUpdate: function (event) {
      var url = vm.database.id == null ? "sys/database/save" : "sys/database/update";
      $.ajax({
        type: "POST",
        url: baseURL + url,
        contentType: "application/json",
        data: JSON.stringify(vm.database),
        success: function (r) {
          if (r.code === 0) {
            alert('数据库配置成功', function () {
              if (vm.database.id == null) {
                var herfUrl = 'modules/sys/destination_table.html?showList=false&alias=' + vm.database.alias
                window.location.href = (herfUrl)
              } else {
                vm.reload();
              }
            })
          } else {
            alert(r.msg);
          }
        }
      })

    },
    reload: function (event) {
      vm.showList = true;
      var page = $("#jqGrid").jqGrid('getGridParam', 'page');
      $("#jqGrid").jqGrid('setGridParam', {
        postData: {
          'paramKey': vm.q.paramKey
        },
        page: page
      }).trigger("reloadGrid");
    },

  }
});