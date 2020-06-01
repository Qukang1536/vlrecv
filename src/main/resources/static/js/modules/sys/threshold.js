$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/threshold/list',
        datatype: "json",
        colModel: [			
			{ label: 'ID', name: 'id', width: 30, key: true },
			{ label: 'CPU阈值', name: 'cpu', sortable: false, width: 60 },
			{ label: '内存阈值', name: 'memory', width: 30 },
			{ label: '磁盘阈值', name: 'disk', width: 80},
			{ label: '创建日期', name: 'createTime', width: 80 }
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
		threshold: {},
		options:[]
	},
	methods: {
		query: function () {
			vm.reload();
		},

		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.threshold = {};
		},
		update: function () {
			var id = getSelectedRow();
			if(id == null){
				return ;
			}

			$.get(baseURL + "sys/threshold/info/"+id, function(r){
				vm.showList = false;
				vm.title = "修改";
				vm.threshold = r.threshold;
				console.log(r.threshold);
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
					url: baseURL + "sys/threshold/delete",
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
			var url = vm.threshold.id == null ? "sys/threshold/save" : "sys/threshold/update";
			$.ajax({
				type: "POST",
				url: baseURL + url,
				contentType: "application/json",
				data: JSON.stringify(vm.threshold),
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