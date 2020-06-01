$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/snort/list',
        datatype: "json",
        colModel: [			
			{ label: 'ID', name: 'id', width: 15, key: true },
			{ label: '攻击IP和端口', name: 'fromAddress', sortable: false, width: 50 },
			{ label: '被攻击IP和端口', name: 'toAddress', sortable: false, width: 50 },
			{ label: '攻击类型', name: 'attackType', width: 25 },
			{ label: '攻击时间', name: 'createDate', width: 35,sortable: false },
			{ label: '完整日志', name: 'msg', width: 150 }
			// { label: '是否开启病毒查杀', name: 'openVirusKill', width: 30,formatter: function(value, options, row){
			// 	return value === 1 ?
			// 		'<span class="label label-success">开启</span>' :
			// 		'<span class="label label-danger">关闭</span>';
			// }}
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
        },

	});

	$.ajax({
		type: "POST",
		url: baseURL + "sys/snort/getInfo",
		contentType: "application/json",
		success: function(r){
			if(r.code === 0){
				if(r.viruskill.virusFlag ===1 ){
					$(".switch-wrap").addClass("active");
				}else{
					$(".switch-wrap").removeClass("active");
				}
			}
		}
	});
});

$.ajax({
	type: "POST",
	url: baseURL + "sys/dict/info/4",
	contentType: "application/json",
	success: function(r){
		if(r.code === 0){
			if(r.dict.code == 'on'){
				$(".switch-snort").addClass("active");
			}else{
				$(".switch-snort").removeClass("active");
			}
		}
	}
});

// window.setTimeout( refreshGrid, 5000);
//     function refreshGrid()
// 	{
// 		var grid = $("#jqGrid");
// 		grid.trigger("reloadGrid");
// 		window.setTimeout(refreshGrid, 5000);
//
// 	}

var vm = new Vue({
	el:'#rrapp',
	data:{
		q:{
            paramKey: null
		},
		showList: true,
		title: null,
		snort: {}
	},
	methods: {
		update: function () {
			var id = getSelectedRow();
			if(id == null){
				return ;
			}
			$.get(baseURL + "sys/snort/info/"+id, function(r){
                vm.showList = true;
				if (!r.download) {
					return
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
				    url: baseURL + "sys/snort/delete",
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
		openVirusKill: function () {
			confirm('因为病毒查杀需要对数据进行扫描，开启病毒查杀功能将影响摆渡效率，确定要开启吗？', function(){
				var virusFlag;
				if($(".switch-wrap").hasClass("active")){
					virusFlag = 0;
				}else{
					virusFlag = 1;
				}
				$.ajax({
					type: "POST",
					url: baseURL + "sys/snort/updateVirusKillStatus",
					contentType: "application/json",
					data: JSON.stringify(virusFlag),
					success: function(r){
						if(r.code == 0){
							alert(r.msg, function(index){
								if($(".switch-wrap").hasClass("active")){
									$(".switch-wrap").removeClass("active");
								}else{
									$(".switch-wrap").addClass("active");
								}
							});
						}else{
							alert(r.msg);
						}
					}
				});
			});
		},
		openOrCloseSnort: function () {
			confirm('开启DDOS抗攻击会影响摆渡性能，确定要开启吗？', function(){
				var snortFlag;
				if($(".switch-snort").hasClass("active")){
					snortFlag = 0;
				}else{
					snortFlag = 1;
				}
				$.ajax({
					type: "POST",
					url: baseURL + "sys/snort/openOrCloseSnort",
					contentType: "application/json",
					data: JSON.stringify(snortFlag),
					success: function(r){
						if(r.code == 0 && !r.msg.startsWith("py")){
							alert(r.msg, function(index){
								if($(".switch-snort").hasClass("active")){
									$(".switch-snort").removeClass("active");
								}else{
									$(".switch-snort").addClass("active");
								}
							});
						}else{
							alert(r.msg);
						}
					}
				});
			});
		},
		saveOrUpdate: function (event) {
			var url = vm.download.id == null ? "sys/snort/save" : "sys/snort/update";
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.download),
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