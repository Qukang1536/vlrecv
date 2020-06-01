$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/planClient/list',
        datatype: "json",
        colModel: [			
			{ label: '计划名称', name: 'planName', index: 'planName', width: 80 },
			{ label: '设备名称', name: 'agentDisplayName', index: 'agentDisplayName', width: 80 },
			{ label: '添加时间', name: 'addtime', index: 'addtime', width: 80 },
			{ label: '修改时间', name: 'updatetime', index: 'updatetime', width: 80 },
			{ label: '路径', name: 'path', index: 'path', width: 80 },
			{ label: '是否读已存在的', name: 'downExist', index: 'downExist', width: 80, formatter: function(value, options, row){
				return value === false?
					'<span class="label label-danger">否</span>' :
					'<span class="label label-success">是</span>';
			}},
			{ label: '详情', name: 'planId', index: 'planId', width: 80 , formatter: function(value, options, row){
				return '<input type="button" value="查看" onclick="buttonClick(\''+row.planId+'\',\''+row.agentId+'\');"/>';
			}}
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
        	$("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "scroll" });
        }
    });

	$("#jqGrid2").jqGrid({
		url: baseURL + 'sys/planClientFile/list',
		datatype: "json",
		colModel: [
			{ label: '任务编号', name: 'taskId', index: 'taskId', width: 80 },
			{ label: '计划接收客户端名称', name: 'agentDisplayname', index: 'agentDisplayname', width: 150 },
			{ label: '计划名称', name: 'planName', index: 'planName', width: 70 },
			{ label: '文件名称', name: 'filepath', index: 'filepath', width: 150 },
			{ label: '文件大小', name: 'filesizeDesc', index: 'filesizeDesc', width: 80 },
			{ label: '新增时间', name: 'addtime', index: 'addtime', width: 150 },
			{ label: '结束时间', name: 'endtime', index: 'path', width: 80 },
			{ label: '状态', name: 'statusDesc', index: 'statusDesc', width: 80 },
			{ label: '描述信息', name: 'desc', index: 'desc', width: 80 }
		],
		viewrecords: true,
		height: 385,
		autowidth: true,
		rowNum: 10,
		rowList : [10,30,50],
		rownumbers: true,
		rownumWidth: 25,
		multiselect: true,
		autoScroll: true,
		pager: "#jqGridPager2",
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
			$("#jqGrid2").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "scroll" });
		}
	});
});
function buttonClick(planid,recvClientId){
	vm.showList = false;
	vm.showList1 = false;
	vm.showList2 = true;
	var page = $("#jqGrid2").jqGrid('getGridParam','page');
	$("#jqGrid2").jqGrid('setGridParam',{
		postData:{'planid': planid,'recvClientId': recvClientId},
		page:page
	}).trigger("reloadGrid");
}

function filter(treeId, parentNode, data) {
	if (!data.page && !data.page.ret) return null;
	var childNodes = data.page.ret;
	for (var i=0, l=childNodes.length; i<l; i++) {
		if(childNodes[i].dir){
			childNodes[i].name = childNodes[i].name.replace(/\.n/g, '.');
			if(childNodes[i].path === "/"){
				childNodes[i].name = "/";
			}
		}
	}
	return childNodes;
}
function beforeClick(treeId, treeNode) {
	// if (!treeNode.isParent) {
	// 	alert("请选择父节点，此节点是根节点...");
	// 	return false;
	// } else {
	// 	return true;
	// }
	return true;
}
var ztree;
var vm = new Vue({
	el:'#rrapp',
	data:{
        q:{
            name: null
        },
		showList: true,
		showList1: false,
		showList2: false,
		title: null,
		planClient: {},
		index: null,
		recvAgentList: null,
		recvPlanList: null
	},
    created: function () {
		this.queryRecvAgentAll()
	},
	methods: {
		getMenu: function(menuId){
			//加载菜单树
//			$.get(baseURL + "sys/menu/select", function(r){
//				ztree = $.fn.zTree.init($("#menuTree"), setting);
//				var node = ztree.getNodeByParam("menuId", vm.menu.parentId);
//				ztree.selectNode(node);

//				vm.menu.parentName = node.name;
//			})
			var setting = {
				view: {
					selectedMulti: false
				},
				async: {
					enable: true,
					url: baseURL + "sys/planClient/root?id="+vm.planClient.agentId,
					autoParam:["parm"],
					dataFilter: filter
				},
				callback: {
					beforeClick: beforeClick,
					onClick : function(event, treeId, treeNode, clickFlag) {
						console.log("aaa",treeNode);
						$.ajax({
							url: baseURL + 'sys/planClient/root?parent='+encodeURI(treeNode.path)+"&id="+encodeURI(vm.planClient.agentId),//请求的action路径
							error: function () {//请求失败处理函数
								alert('请求失败');
							},
							success:function(data)
							{ //添加子节点到指定的父节点
								var jsondataData= eval(data);
								var jsondata;
								if(jsondataData.page && jsondataData.page.ret){
									jsondata = jsondataData.page.ret;
								}
								console.log(jsondata);
								if(jsondata == null || jsondata == ""|| jsondata.length == 0){
									//末节点的数据为空   所以不再添加节点  这里可以根据业务需求自己写
									//$("#treeFrame").attr("src",treeNode.url);
								}
								else{
									var treeObj = $.fn.zTree.getZTreeObj("menuTree");
									//treeNode.halfCheck = false;
									var parentZNode = treeObj.getNodeByParam("path", treeNode.path, null);//获取指定父节点
									treeObj.removeChildNodes(parentZNode);
									newNode = treeObj.addNodes(parentZNode,jsondata, false);
								}
							}
						});
					}
				}
			};
			ztree = $.fn.zTree.init($("#menuTree"), setting);
		},
		queryRecvAgentAll: function () {
			$.get(baseURL + "sys/recvAgent/listAll", function(r){
				vm.recvAgentList = r.list;
			});
			$.get(baseURL + "sys/recvPlan/listAll", function(r){
				vm.recvPlanList = r.list;
			});
		},
		query: function () {
			vm.reload();
		},
		add: function(){
			$("#saveOrUpdateButton").attr('disabled',false);
			vm.showList = false;
			vm.showList1 = true;
			vm.showList2 = false;
			vm.title = "新增";
			vm.planClient = {path:null};

		},
		update: function (event) {
			$("#saveOrUpdateButton").attr('disabled',false);
			var id = getSelectedRow();
			if(id == null){
				return ;
			}
			vm.showList = false;
			vm.showList1 = true;
			vm.showList2 = false;
            vm.title = "修改";
            
            vm.getInfo(id)
		},
		saveOrUpdate: function (event) {
			$("#saveOrUpdateButton").attr('disabled',true);
			var url = vm.planClient.id == null ? "sys/planClient/save" : "sys/planClient/update";
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.planClient),
			    success: function(r){
					$("#saveOrUpdateButton").attr('disabled',false);
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
				    url: baseURL + "sys/planClient/delete",
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
			$.get(baseURL + "sys/planClient/info/"+id, function(r){
                vm.planClient = r.planClient;
            });
		},
		reload: function (event) {
			vm.showList = true;
			vm.showList1 = false;
			vm.showList2 = false;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{
				postData:{'name': vm.q.name},
				page:page
			}).trigger("reloadGrid");
			layer.close(vm.index);
		},
		menuTree: function(){
			if(!vm.planClient.agentId){
				alert("请先选择设备");
				return;
			}
			vm.getMenu();
			vm.index = layer.open({
				type: 1,
				offset: '50px',
				skin: 'layui-layer-molv',
				title: "选择菜单",
				area: ['300px', '450px'],
				shade: 0,
				shadeClose: false,
				content: jQuery("#menuLayer"),
				btn: ['确定', '取消'],
				btn1: function (index) {
					var node = ztree.getSelectedNodes();
					//选择上级菜单
					vm.planClient.path = node[0].path;

					layer.close(index);
				}
			});
		},
		onChange: function(event) {
			vm.planClient.path = null;
		}
	}
});