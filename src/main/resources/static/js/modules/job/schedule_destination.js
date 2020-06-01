$(function () {
  $("#jqGrid").jqGrid({
    url: baseURL + 'sys/schedule/list',
    datatype: "json",
    colModel: [{
        label: '任务ID',
        name: 'jobId',
        width: 10,
        key: true
      },
      {
        label: '任务配置',
        name: 'beanName',
        width: 20
      },
      {
        label: '方法名称',
        name: 'methodName',
        width: 20
      },
      {
        label: '数据库',
        name: 'dataBaseId',
        width: 10
      },
      {
        label: '数据库表',
        name: 'table',
        width: 40
      },
      {
        label: 'cron表达式 ',
        name: 'cronExpression',
        width: 30
      },
      {
        label: '状态',
        name: 'status',
        width: 15,
        formatter: function (value, options, row) {
          return value === 0 ?
            '<span class="label label-success">正常</span>' :
            '<span class="label label-danger">暂停</span>';
        }
      },
      {
        label: '备注 ',
        name: 'remark',
        width: 30
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
var vm = new Vue({
  el: '#rrapp',
  data: {
    q: {
      beanName: null
    },
    database: {},
    table: {},
    // 默认显示
    showList: true,
    showAddList: false,
    showDbList: false,
    showTabList: false,
    selectSchedule: true,
    title: null,
    schedule: {},
    // 选择器值
    dbOptions: {},
    tbOptions: {},
    // 源表默认数据
    dataBaseSelected: '',
    originTable: '',
    tableName: '',
    destinationTable: '',

  },
  created: function () {
    if (search_data.length > 0) {
      this.showList = false;
      this.showAddList = true;
      this.title = "新增";
      var theRequest = new Object();
      if (search_data.indexOf("?") != -1) {
        var str = search_data.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
          theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
        this.schedule = {
          "beanName": "destDataBaseTask",
          "methodName": "mysql",
          "cronExpression": "*/3 * * * * ?",
          "dataBaseId": Number(theRequest.dataBaseId)
        };
        this.getdb();
        this.reloadonChange(theRequest.dataBaseId, theRequest.tableName);
        console.log(theRequest)
      }
    } else {
      this.getdb(theRequest);
      this.showList = true;
      this.showAddList = false;
    }
  },
  mounted: function () {
    this.getdb();
  },
  // 监听事件
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
    schedule: { //深度监听
      handler: function (val, oldVal) {
        if (val.beanName == "deleteTask") {
          this.selectSchedule = false;
          // 防止用户勾选清理任务后提交数据
          this.schedule.dataBaseId = null;
          this.schedule.table = null;
        } else {
          this.selectSchedule = true;
        }
      },
      deep: true
    }
  },
  methods: {
    query: function () {
      vm.reload();
    },
    add: function () {
      vm.showList = false;
      vm.showAddList = true;
      vm.title = "新增";
      vm.schedule = {
        "beanName": "dataBaseTask",
        "methodName": "mysql",
        "cronExpression": "*/3 * * * * ?"
      };
    },
    addDb: function () {
      vm.showAddList = false;
      vm.showDbList = true;
      vm.title = "新增";
      vm.database = {};
    },
    addTab: function () {
      vm.showAddList = false;
      vm.showTabList = true;
      vm.title = "新增";
      vm.table = {};
      vm.tableName = '';
      vm.originTable = '';
      vm.destinationTable = '';
    },
    update: function () {
      var jobId = getSelectedRow();
      if (jobId == null) {
        return;
      }

      $.get(baseURL + "sys/schedule/info/" + jobId, function (r) {
        vm.showList = false;
        vm.showAddList = true;
        vm.title = "修改";
        vm.schedule = r.schedule;
      });
    },
    getdb: function () {
      $.get(baseURL + "sys/destination/getDataBase", function (r) {
        vm.dbOptions = r.databases;
      });
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
    onChange: function (event) {
      $.get(baseURL + "sys/destination/getTablesByDataBaseId/" + event.target.value, function (r) {
        vm.tbOptions = r.tableList;
      });
    },
    reloadonChange: function (id, data) {
      $.get(baseURL + "sys/destination/getTablesByDataBaseId/" + id, function (r) {
        if (r.tableList) {
          vm.tbOptions = r.tableList;
        };
        if (data != undefined || data != null) {
          for (var i = 0; i < r.tableList.length; i++) {
            if (r.tableList[i].originTable == data) {
              console.log(vm.schedule)
              vm.schedule.table = r.tableList[i].destinationTable
              console.log(r.tableList[i].destinationTable)
            }
          }
        }
      });
    },
    saveOrUpdate: function (event) {
      var url = vm.schedule.jobId == null ? "sys/schedule/save" : "sys/schedule/update";
      confirm('请确认信息是否填写正确？', function () {
        $.ajax({
          type: "POST",
          url: baseURL + url,
          contentType: "application/json",
          data: JSON.stringify(vm.schedule),
          success: function (r) {
            if (r.code === 0) {
              alert('操作成功', function (index) {
                console.log(search_data)
                if (search_data.length > 0) {
                  // 防止iframe中的样式出错
                  top.location.reload()
                } else {
                  vm.reload()
                }
              });
            } else {
              alert(r.msg);
            }
          }
        });
      })
    },
    // 新增数据库配置
    saveDatabase: function (event) {
      var url = "sys/database/save";
      $.ajax({
        type: "POST",
        url: baseURL + url,
        contentType: "application/json",
        data: JSON.stringify(vm.database),
        success: function (r) {
          if (r.code === 0) {
            alert('操作成功', function (index) {
              // 重新get一次DB
              vm.getdb()
              vm.addDbreload();
            });
          } else {
            alert(r.msg);
          }
        }
      });
    },
    // 新增源表配置
    saveTable: function (event) {
      vm.table.tableName = vm.tableName;
      vm.table.originTable = vm.originTable;
      vm.table.destinationTable = vm.destinationTable;
      vm.table.dataBaseId = vm.dataBaseSelected;
      var url = "sys/destination/save";
      $.ajax({
        type: "POST",
        url: baseURL + url,
        contentType: "application/json",
        data: JSON.stringify(vm.table),
        success: function (r) {
          if (r.code === 0) {
            alert('操作成功', function (index) {
              // 重新get一次table
              vm.reloadonChange(vm.table.dataBaseId)
              vm.addTabreload();
            });
          } else {
            alert(r.msg);
          }
        }
      });

    },
    del: function (event) {
      var jobIds = getSelectedRows();
      if (jobIds == null) {
        return;
      }

      confirm('确定要删除选中的记录？', function () {
        $.ajax({
          type: "POST",
          url: baseURL + "sys/schedule/delete",
          contentType: "application/json",
          data: JSON.stringify(jobIds),
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
    pause: function (event) {
      var jobIds = getSelectedRows();
      if (jobIds == null) {
        return;
      }

      confirm('确定要暂停选中的记录？', function () {
        $.ajax({
          type: "POST",
          url: baseURL + "sys/schedule/pause",
          contentType: "application/json",
          data: JSON.stringify(jobIds),
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
    resume: function (event) {
      var jobIds = getSelectedRows();
      if (jobIds == null) {
        return;
      }

      confirm('确定要恢复选中的记录？', function () {
        $.ajax({
          type: "POST",
          url: baseURL + "sys/schedule/resume",
          contentType: "application/json",
          data: JSON.stringify(jobIds),
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
    runOnce: function (event) {
      var jobIds = getSelectedRows();
      if (jobIds == null) {
        return;
      }

      confirm('确定要立即执行选中的记录？', function () {
        $.ajax({
          type: "POST",
          url: baseURL + "sys/schedule/run",
          contentType: "application/json",
          data: JSON.stringify(jobIds),
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
    reload: function (event) {
      if (search_data.length == 0) {
        vm.showList = true;
        vm.showAddList = false;
        var page = $("#jqGrid").jqGrid('getGridParam', 'page');
        $("#jqGrid").jqGrid('setGridParam', {
          postData: {
            'beanName': vm.q.beanName
          },
          page: page
        }).trigger("reloadGrid");
      } else {
        top.location.reload()
      }
    },
    addDbreload: function (event) {
      vm.showAddList = true;
      vm.showDbList = false;
    },
    addTabreload: function (event) {
      vm.showAddList = true;
      vm.showTabList = false;
    },
  }
});