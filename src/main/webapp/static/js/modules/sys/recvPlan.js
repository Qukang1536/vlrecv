$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/recvPlan/list',
        datatype: "json",
        colModel: [
			{ label: '计划名称', name: 'name', index: 'name', width: 80 },
			{ label: '路径', name: 'path', index: 'path', width: 80 },
			{ label: '是否读取子目录', name: 'subdir', index: 'subdir', width: 80, formatter: function(value, options, row){
				return value === false?
					'<span class="label label-danger">否</span>' :
					'<span class="label label-success">是</span>';
			}},
			{ label: '是否删除目录', name: 'deletefile', index: 'deletefile', width: 80 , formatter: function(value, options, row){
				return value === false?
					'<span class="label label-danger">否</span>' :
					'<span class="label label-success">是</span>';
			}},
			{ label: '是否传已存在的', name: 'sendExisted', index: 'sendExisted', width: 80 , formatter: function(value, options, row){
				return value === false?
					'<span class="label label-danger">否</span>' :
					'<span class="label label-success">是</span>';
			}},
			{ label: '是否传现在的', name: 'sendNow', index: 'sendNow', width: 80 , formatter: function(value, options, row){
				return value === false?
					'<span class="label label-danger">否</span>' :
					'<span class="label label-success">是</span>';
			}},
			{ label: '等待时间(毫秒)', name: 'sleepTime', index: 'sleepTime', width: 80 },
			{ label: '等待数', name: 'sleepCount', index: 'sleepCount', width: 80 },
			{ label: '添加时间', name: 'addtime', index: 'addtime', width: 80 },
			{ label: '最新活跃时间', name: 'updatetime', index: 'updatetime', width: 80 }
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
		recvPlan: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.recvPlan = {};
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
			var url = vm.recvPlan.id == null ? "sys/recvPlan/save" : "sys/recvPlan/update";
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.recvPlan),
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
				    url: baseURL + "sys/recvPlan/delete",
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
			$.get(baseURL + "sys/recvPlan/info/"+id, function(r){
                vm.recvPlan = r.recvPlan;
				$("#tableFilter tbody").html("<tr><td></td><td>序号</td><td>规则字符</td><td>规则</td><td>操作</td></tr>");
				if(r.recvPlan.filter && r.recvPlan.filter.length > 0){
					for(var int = 1;int<=r.recvPlan.filter.length;int++){
						var htmlStr = '<tr>\
					<td><input type="radio" name="radioFilter" id="c1"/></td>\
					<td>'+int+'</td>\
					<td><input class="form-control" value="'+vm.recvPlan.filter[int-1].regex+'" data-width="50px" placeholder="规则字符"/></td>\
					<td>\
					<select class="selectpicker show-tick form-control" data-width="50px" placeholder="规则">';

						if(vm.recvPlan.filter[int-1].exclude){
							htmlStr = htmlStr + '<option value="true" selected>黑名单</option><option value="false">白名单</option>'
						}else{
							htmlStr = htmlStr + '<option value="true">黑名单</option><option value="false" selected>白名单</option>'
						}
						htmlStr = htmlStr +'</select>\
					</td>\
					<td><input type="button" onclick="deleteFilter(this)" value=" 删除 "></td>\
					</tr>';

						$("#tableFilter tbody").append(htmlStr);
					}
				}
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