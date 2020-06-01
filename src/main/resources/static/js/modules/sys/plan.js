$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/plan/list',
        datatype: "json",
        colModel: [			
			{ label: '计划名称', name: 'name', index: 'name', width: 80 },
			{ label: '设备名称', name: 'displayName', index: 'displayName', width: 80 },
			{ label: '添加时间', name: 'addtime', index: 'addtime', width: 80 },
			{ label: '修改时间', name: 'updatetime', index: 'updatetime', width: 80 },
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
			{ label: '等待时间', name: 'sleepTime', index: 'sleepTime', width: 80 },
			{ label: '等待数', name: 'sleepCount', index: 'sleepCount', width: 80 },
			{ label: '详情', name: 'id', index: 'id', width: 80 , formatter: function(value, options, row){
				return '<input type="button" value="查看" onclick="buttonClick('+value+');"/>';
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
        	$("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
        }
    });

	$("#jqGrid2").jqGrid({
		url: baseURL + 'sys/planfile/list',
		datatype: "json",
		colModel: [
			{ label: '计划名称', name: 'planName', index: 'planName', width: 180 },
			{ label: '文件名称', name: 'filepath', index: 'filepath', width: 180 },
			{ label: '文件大小', name: 'filesizeDesc', index: 'filesizeDesc', width: 180 },
			{ label: '新增时间', name: 'addtime', index: 'addtime', width: 180 },
			{ label: '结束时间', name: 'endtime', index: 'endtime', width: 180 },
			{ label: '状态', name: 'statusDesc', index: 'statusDesc', width: 180 }
		],
		viewrecords: true,
		height: 385,
		rowNum: 10,
		rowList : [10,30,50],
		rownumbers: true,
		rownumWidth: 25,
		autowidth:true,
		multiselect: true,
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
			$("#jqGrid2").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" });
		}
	});
});
function buttonClick(value){
	vm.showList = false;
	vm.showList1 = false;
	vm.showList2 = true;
	var page = $("#jqGrid2").jqGrid('getGridParam','page');
	$("#jqGrid2").jqGrid('setGridParam',{
		postData:{'planid': value},
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
function up(){
	$.each($("#tableFilter input:checked"),function(){
		var onthis=$(this).parent().parent();
		var getUp=onthis.prev();

		if ($(getUp).has("input").size()==0)
		{
			alert("顶级元素不能上移");
			return;
		}
		$(onthis).after(getUp);
		if(onthis.length==1 && getUp.length==1){
			var num1 = onthis.find("td").eq(1).text();
			var num2 = getUp.find("td").eq(1).text();
			getUp.find("td").eq(1).text(num1);
			onthis.find("td").eq(1).text(num2);
		}
	});
}
function deleteFilter(thisD) {

	for (var flag = $(thisD).parent().parent().next() ;flag.length!=0;flag =$(flag).next()){
		var numStr = $(flag).find("td:nth-child(2)").text();
		console.log("----"+numStr+"----");
		var num = parseInt(numStr)-1;
		$($(flag)).find("td").eq(1).html(num);
	}


	// var numStr = $(thisD).parent().parent().next().find("td:nth-child(2)").text();
	// console.log("----"+numStr+"----");
	// var num = parseInt(numStr)-1;
	// $(thisD).parent().parent().next().find("td").eq(1).html(num);
	$(thisD).parent().parent().remove();
}
function down(){
	$.each($("#tableFilter input:checked"),function(){
		var onthis=$(this).parent().parent();
		var getdown=onthis.next();
		$(getdown).after(onthis);
		if(onthis.length==1 && getdown.length==1){
			var num1 = onthis.find("td").eq(1).text();
			var num2 = getdown.find("td").eq(1).text();
			getdown.find("td").eq(1).text(num1);
			onthis.find("td").eq(1).text(num2);
		}
	});
}
function add() {
	var sum = $("#tableFilter tr").length;
	$("#tableFilter tbody").append('<tr>\
		<td><input type="radio" name="radioFilter" id="c1"/></td>\
		<td>'+sum+'</td>\
		<td><input class="form-control" data-width="50px" placeholder="规则字符"/></td>\
		<td>\
		<select class="selectpicker show-tick form-control" data-width="50px" placeholder="规则">\
		<option value="true">\
		黑名单\
		</option>\
		<option value="false">\
		白名单\
		</option>\
		</select>\
		</td>\
		<td><input type="button" onclick="deleteFilter(this)" value=" 删除 "></td>\
		</tr>');
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
		plan: {},
		index: null,
		sendAgentList: null
	},
	created:function(){
		this.querySendAgentAll();
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
			console.log("vm.plan",vm.plan);
			var setting = {
				view: {
					selectedMulti: false
				},
				async: {
					enable: true,
					url: baseURL + "sys/plan/root?id="+vm.plan.agentid,
					autoParam:["parm"],
					dataFilter: filter
				},
				callback: {
					beforeClick: beforeClick,
					onClick : function(event, treeId, treeNode, clickFlag) {
						console.log("aaa",treeNode);
						$.ajax({
							url: baseURL + 'sys/plan/root?parent='+encodeURI(treeNode.path)+"&id="+encodeURI(vm.plan.agentid),//请求的action路径
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
		querySendAgentAll: function () {
			$.get(baseURL + "sys/sendAgent/listAll", function(r){
				vm.sendAgentList = r.list;
			});
		},
		query: function () {
			vm.reload();
		},
		add: function(event){
			$("#saveOrUpdateButton").attr('disabled',false);
			vm.title = "新增";
			vm.plan = {path:null};
			$("#tableFilter tbody").html("<tr><td></td><td>序号</td><td>规则字符</td><td>规则</td><td>操作</td></tr>");
			vm.showList = false;
			vm.showList1 = true;
			vm.showList2 = false;
		},
		update: function (event) {
			$("#saveOrUpdateButton").attr('disabled',true);
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
			var url = vm.plan.id == null ? "sys/plan/save" : "sys/plan/update";
			var myArray=new Array();
			var tableFilter = $("#tableFilter tr");
			var indexFilter = 0;
			for(var int = 1 ;int < tableFilter.length;int ++ ){

				var td2 = $(tableFilter[int]).find("td").eq(2).find("input").val();
				if(td2 == null ||td2 == ''){
					continue;
				}
				var td3 = $(tableFilter[int]).find("td").eq(3).find("select").val();
				var obj = {};
				obj.regex = td2;
				obj.exclude = td3;
				myArray[indexFilter] = obj;
				indexFilter++;
			}
			console.log("myArray",myArray);
			vm.plan.filter = myArray;
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.plan),
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
				    url: baseURL + "sys/plan/delete",
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

			$.get(baseURL + "sys/plan/info/"+id, function(r){
                vm.plan = r.plan;
				$("#tableFilter tbody").html("<tr><td></td><td>序号</td><td>规则字符</td><td>规则</td><td>操作</td></tr>");
				if(r.plan.filter && r.plan.filter.length > 0){
					for(var int = 1;int<=r.plan.filter.length;int++){
						var htmlStr = '<tr>\
					<td><input type="radio" name="radioFilter" id="c1"/></td>\
					<td>'+int+'</td>\
					<td><input class="form-control" value="'+vm.plan.filter[int-1].regex+'" data-width="50px" placeholder="规则字符"/></td>\
					<td>\
					<select class="selectpicker show-tick form-control" data-width="50px" placeholder="规则">';

						if(vm.plan.filter[int-1].exclude){
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
			if(!vm.plan.agentid){
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
					vm.plan.path = node[0].path;

					layer.close(index);
				}
			});
		},
		onChange: function(event) {
			vm.plan.path = null;
		}
	}
});