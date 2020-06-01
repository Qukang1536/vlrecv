$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/sendAgent/list',
        datatype: "json",
        colModel: [
			{ label: '显示名', name: 'displayName', index: 'displayName', width: 80 },
			{ label: '主机名', name: 'computerName', index: 'computerName', width: 80 },
			{ label: '主机ip', name: 'ip', index: 'ip', width: 80 },
			{ label: '主机mac地址', name: 'mac', index: 'mac', width: 80 },
			{ label: '操作系统类型', name: 'operatingSystem', index: 'operatingSystem', width: 80 },
			{ label: '添加时间', name: 'regTime', index: 'regTime', width: 80 },
			{ label: '最新活跃时间', name: 'activeTime', index: 'activeTime', width: 80 },
			{ label: '客户端版本', name: 'agentVersion', index: 'agentVersion', width: 80 }
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
            name: null
        },
		showList: true,
		title: null,
		sendAgent: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.sendAgent = {};
		},
		update: function (event) {
			var id = getSelectedRow();
			if(id == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(id)
		},
		saveOrUpdate: function (event) {
			var url = vm.sendAgent.id == null ? "sys/sendAgent/save" : "sys/sendAgent/update";
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.sendAgent),
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
		del: function (event) {
			var ids = getSelectedRows();
			if(ids == null){
				return ;
			}
			
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url: baseURL + "sys/sendAgent/delete",
                    contentType: "application/json",
				    data: JSON.stringify(ids),
				    success: function(r){
						if(r.code == 0){
							alert('操作成功', function(index){
								$("#jqGrid").trigger("reloadGrid");
							});
						}else{
							alert(r.msg);
						}
					}
				});
			});
		},
		getInfo: function(id){
			$.get(baseURL + "sys/sendAgent/info/"+id, function(r){
                vm.sendAgent = r.sendAgent;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{
                postData:{'name': vm.q.name},
                page:page
            }).trigger("reloadGrid");
		}
	}
});