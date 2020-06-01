$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/security/list',
        datatype: "json",
        colModel: [			
			{ label: 'ID', name: 'id', width: 30, key: true },
			{ label: '安全类型', name: 'filter', sortable: false, width: 30,formatter:securitytype },
			{ label: '关键词', name: 'keyword', sortable: false, width: 80 },
			{ label: '文件格式', name: 'suffix', sortable: false, width: 80 },
			{ label: '创建日期', name: 'createdate', index: "create_time", width: 50 }
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

function securitytype(cellvalue, options, rowObject)
{
   if (cellvalue == "blak")
    return "黑名单";
   else if (cellvalue == "white")
    return "白名单";
}

var vm = new Vue({
	el:'#rrapp',
	data:{
		q:{
            paramKey: null
		},
		showList: true,
		title: null,
		security: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.security = {};
		},
		update: function () {
			var id = getSelectedRow();
			if(id == null){
				return ;
			}
			
			$.get(baseURL + "sys/security/info/"+id, function(r){
                vm.showList = false;
                vm.title = "修改";
                vm.security = r.security;
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
				    url: baseURL + "sys/security/delete",
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
			var url = vm.security.id == null ? "sys/security/save" : "sys/security/update";
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.security),
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