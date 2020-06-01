$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/hotbackup/list',
        datatype: "json",
        colModel: [			
			{ label: 'ID', name: 'id', width: 30, key: true },
			{ label: '类型', name: 'type', sortable: false, width: 60 },
			{ label: '源地址', name: 'masterip', width: 80 },
			{ label: '目地址', name: 'slaveip', width: 80 },
			{ label: '用户名', name: 'username', width: 80 },
			{ label: '密码', name: 'passwd', width: 80 }
			 
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
		hotbackup: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.hotbackup = {};
		},
		update: function () {
			var id = getSelectedRow();
			if(id == null){
				return ;
			}
			
			$.get(baseURL + "sys/hotbackup/info/"+id, function(r){
                vm.showList = false;
                vm.title = "修改";
                vm.hotbackup = r.hotbackup;
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
				    url: baseURL + "sys/hotbackup/delete",
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
			var url = vm.hotbackup.id == null ? "sys/hotbackup/save" : "sys/hotbackup/update";
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.hotbackup),
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