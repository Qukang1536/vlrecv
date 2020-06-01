$(function () {
  $("#jqGrid").jqGrid({
    url: baseURL + 'sys/origin/list',
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
        label: '临时表',
        name: 'tableName',
        sortable: false,
        width: 30
      },
      {
        label: '目标表',
        name: 'destinationTable',
        sortable: false,
        width: 25
      },
      {
        label: '源表主键',
        name: 'keyName',
        sortable: false,
        width: 20
      },
      {
        label: '主键类型',
        name: 'keyType',
        sortable: false,
        width: 15
      },
      {
        label: '单次条数',
        name: 'records',
        sortable: false,
        width: 15
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
      },
      {
        label: '生成临时表和触发器',
        name: 'generator_trigger',
        width: 30,
        formatter: generate_trigger
      },
      {
        label: '生成备份触发器',
        name: 'generator_backup_trigger',
        width: 25,
        formatter: generator_backup_trigger
      },
      {
        label: '删除临时表和触发器',
        name: 'delete_temp_tabel_trigger',
        width: 30,
        formatter: delete_temp_tabel_trigger
      },
      {
        label: '二进制大对象触发器',
        name: 'binary_trigger',
        width: 30,
        formatter: binary_trigger
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


function generate_trigger(cellvalue, options, rowObject) {
  // console.log("generator trigger alert:......" + rowObject.tableName, rowObject.dataBaseId);
  return "<a href='/send/sys/generate/trigger/" + rowObject.dataBaseId + "/" + rowObject.tableName + "/" + rowObject.keyType + "/" + rowObject.keyName + "' ><input type='button' value='生成临时表和触发器'/></a>";
}

function binary_trigger(cellvalue, options, rowObject) {
  // console.log("generator trigger alert:......" + rowObject.tableName, rowObject.dataBaseId);
  return "<a href='/send/sys/generate/binary_trigger/" + rowObject.dataBaseId + "/" + rowObject.tableName + "/" + rowObject.keyType + "/" + rowObject.keyName + "' ><input type='button' value='支持二进制大对象触发器'/></a>";
}

function generator_backup_trigger(cellvalue, options, rowObject) {
  // console.log("generator trigger alert:......" + rowObject.tableName, rowObject.dataBaseId);
  return "<a href='/send/sys/generate/backup_trigger/" + rowObject.dataBaseId + "/" + rowObject.tableName + "/" + rowObject.keyType + "/" + rowObject.keyName + "' ><input type='button' value='生成备份触发器'/></a>";
}

function delete_temp_tabel_trigger(cellvalue, options, rowObject) {
  // console.log("generator trigger alert:......" + rowObject.tableName, rowObject.dataBaseId);
  return "<a href='/send/sys/generate/delete_trigger/" + rowObject.dataBaseId + "/" + rowObject.tableName + "' ><input type='button' value='删除临时表和触发器'/></a>";
}
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
    tableName: '',
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
      }
    },
  },
  methods: {
    query: function () {
      vm.reload();
    },
    getdb: function (data) {
      $.get(baseURL + "sys/origin/getDataBase", function (r) {
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
      $.get(baseURL + "sys/origin/info/" + id, function (r) {
        vm.showList = false;
        vm.title = "修改";
        vm.table = r.table;
        vm.tableName = r.table.tableName;
        vm.originTable = r.table.originTable;
        vm.destinationTable = r.table.destinationTable;
        vm.dataBaseSelected = r.table.dataBaseId;
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
          url: baseURL + "sys/origin/delete",
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
      var url = vm.table.id == null ? "sys/origin/save" : "sys/origin/update";
      const addTriggerUrl = "/send/sys/generate/trigger/" + vm.table.dataBaseId + "/" + vm.table.tableName + "/" + vm.table.keyType + "/" + vm.table.keyName
      $.ajax({
        type: "POST",
        url: baseURL + url,
        contentType: "application/json",
        data: JSON.stringify(vm.table),
        success: function (r) {
          if (r.code === 0) {
            $.ajax({
              type: "GET",
              url: addTriggerUrl,
            });
            alert('源表配置成功', function (index) {
              if (vm.table.id == null) {
                const url = 'modules/job/schedule_origin.html?showList=false&dataBaseId=' + vm.table.dataBaseId + '&tableName=' + vm.table.tableName
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
      }else{
        top.location.reload()
      }
    }
  }
});