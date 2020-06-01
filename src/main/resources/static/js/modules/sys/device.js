$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/dev/list',
        datatype: "json",
        colModel: [			
			{ label: 'ID', name: 'id', width: 15, key: true },
			{ label: '设备名', name: 'name', sortable: false, width: 30 },
			{ label: '第几代摆渡机', name: 'generation', sortable: false, width: 30 },
			{ label: '摆渡机IP地址', name: 'host', width: 30 },
			{ label: 'SSH用户名', name: 'user', width: 15 },
			{ label: 'SSH密码', name: 'password', width: 15 },
			{ label: 'SSH端口', name: 'port', width: 15 },
			{ label: 'DB用户名', name: 'dbUser', width: 15 },
			{ label: 'DB密码', name: 'dbPassword', width: 15 },
			{ label: 'DB端口', name: 'dbPort', width: 15 },
			{ label: '创建日期', name: 'createTime', width: 35 }
        ],
		viewrecords: true,
        height: 385,
        rowNum: 10,
		rowList : [10,30,50],
        rownumbers: true, 
        rownumWidth: 25, 
        autowidth:true,
        multiselect: true,
        pager: "#jqGridPager",
        jsonReader : {
            root: "page.list",
            page: "page.currPage",
            total: "page.totalPage",
            records: "page.totalCount"
        },
        prmNames : {
            page:"page", 
            rows:"limit", 
            order: "order"
        },
        gridComplete:function(){
        	//隐藏grid底部滚动条
        	$("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
        }
    });
});

var vm = new Vue({
	el:'#rrapp',
	data:{
		q:{
            paramKey: null
		},
		showList: true,
		title: null,
		device: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.device = {};
		},
		update: function () {
			var id = getSelectedRow();
			if(id == null){
				return ;
			}
			
			$.get(baseURL + "sys/dev/info/"+id, function(r){
                vm.showList = false;
                vm.title = "修改";
                vm.device = r.device;
            });
		},
		del: function (event) {
			var ids = getSelectedRows();
			if(ids == null){
				return ;
			}
			
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url: baseURL + "sys/dev/delete",
                    contentType: "application/json",
				    data: JSON.stringify(ids),
				    success: function(r){
						if(r.code == 0){
							alert('操作成功', function(index){
								vm.reload();
							});
						}else{
							alert(r.msg);
						}
					}
				});
			});
		},
		saveOrUpdate: function (event) {
			var url = vm.device.id == null ? "sys/dev/save" : "sys/dev/update";
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.device),
			    success: function(r){
			    	if(r.code === 0){
						alert('操作成功', function(index){
							vm.reload();
						});
					}else{
						alert(r.msg);
					}
				}
			});
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
                postData:{'paramKey': vm.q.paramKey},
                page:page
            }).trigger("reloadGrid");
		}
	}
});