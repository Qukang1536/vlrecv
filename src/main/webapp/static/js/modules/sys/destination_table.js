$(function () {
  $("#jqGrid").jqGrid({
    url: baseURL + 'sys/destination/list',
    datatype: "json",
    colModel: [{
        label: 'ID',
        name: 'id',
        width: 10,
        key: true
      },
      {
        label: 'DB',
        name: 'dataBaseId',
        width: 8
      },
      {
        label: '源表名',
        name: 'originTable',
        sortable: false,
        width: 25
      },
      {
        label: '目标表',
        name: 'destinationTable',
        sortable: false,
        width: 25
      },
      {
        label: '优先级',
        name: 'order',
        sortable: false,
        width: 10
      },
      {
        label: '创建日期',
        name: 'createTime',
        width: 25
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

var search_data = window.location.search
var i = 0;
var vm = new Vue({
  el: '#rrapp',
  data: {
    q: {
      paramKey: null
    },
    showList: true,
    // 默认值
    title: null,
    table: {},
    options: [],
    dataBaseSelected: '',
    originTable: '',
    destinationTable: '',
    btnValue: ''
  },
  created() {
    if (search_data.length > 0) {
      this.showList = false;
      this.btnValue = "下一步";
      // 判断传递的参数
      var theRequest = new Object();
      if (search_data.indexOf("?") != -1) {
        var str = search_data.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
          theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
        this.getdb(theRequest.alias);
      }
    } else {
      this.getdb()
      this.showList = true;
    }
  },
  watch: {
    originTable: {
      handler: function (val, oldVal) {
        if (val != null) {
          if (i == 0 && val.length > 1) {} else if (i == 0 && val.length == "") {
            vm.tableName = '';
          } else {
            vm.tableName = val + "_temp";
            vm.destinationTable = val;
          }
          i++;
        }
      },
    }
  },
  methods: {
    query: function () {
      vm.reload();
    },
    getdb: function (data) {
      $.get(baseURL + "sys/destination/getDataBase", function (r) {
        vm.options = r.databases;
        if (data != undefined || data != null) {
          for (var i = 0; i < r.databases.length; i++) {
            if (r.databases[i].alias == data) {
              vm.dataBaseSelected = r.databases[i].id
            }
          }
        } else {
          vm.dataBaseSelected = vm.options[0].id;
        }
      });
    },
    add: function () {
      vm.showList = false;
      vm.btnValue = "下一步";
      vm.title = "新增";
      vm.table = {};
      vm.tableName = '';
      vm.originTable = '';
      vm.destinationTable = '';
    },
    update: function () {
      var id = getSelectedRow();
      vm.btnValue = "确定";
      if (id == null) {
        return;
      }
      $.get(baseURL + "sys/destination/info/" + id, function (r) {
        vm.showList = false;
        vm.title = "修改";
        vm.table = r.table;
        vm.tableName = r.table.tableName;
        vm.originTable = r.table.originTable;
        vm.destinationTable = r.table.destinationTable;
        vm.dataBaseSelected = r.table.dataBaseId;
        vm.records = r.table.records;
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
          url: baseURL + "sys/destination/delete",
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
      vm.table.tableName = vm.tableName;
      vm.table.originTable = vm.originTable;
      vm.table.destinationTable = vm.destinationTable;
      vm.table.dataBaseId = vm.dataBaseSelected;
      var url = vm.table.id == null ? "sys/destination/save" : "sys/destination/update";
      $.ajax({
        type: "POST",
        url: baseURL + url,
        contentType: "application/json",
        data: JSON.stringify(vm.table),
        success: function (r) {
          if (r.code === 0) {
            // location.reload()
            alert('源表配置成功', function () {
              if (vm.table.id == null) {
                const url = 'modules/job/schedule_destination.html?showList=false&dataBaseId=' + vm.table.dataBaseId + '&tableName=' + vm.originTable
                window.location.href = (url)
              } else {
                vm.reload();
              }
            });
          } else {
            alert(r.msg);
          }
        }
      })
    },
    reload: function (event) {
      if (search_data.length == 0) {
        i = 0;
        vm.showList = true;
        var page = $("#jqGrid").jqGrid('getGridParam', 'page');
        $("#jqGrid").jqGrid('setGridParam', {
          postData: {
            'paramKey': vm.q.paramKey
          },
          page: page
        }).trigger("reloadGrid");
      } else {
        top.location.reload()
      }
    }
  }
});