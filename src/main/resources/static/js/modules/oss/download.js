$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/oss/list',
        datatype: "json",
        colModel: [			
			{ label: 'id', name: 'id', width: 10, key: true },
            { label: '文件路径', name: 'fileName', width: 50 },
            { label: '请求IP', name: 'ip', width: 30 },
            { label: '下载uri', name: 'download_uri', width: 30 ,formatter: download_uri},
            { label: '上传用户', name: 'userName', width: 30 },
			{ label: '上传时间', name: 'createTime', width: 40 },
            { label: '更新时间', name: 'updateTime', width: 40 },
            {
                label: '优先级状态', name: 'priority', width: 20, formatter: function (value) {
                    return value === 0 ?
                        '<span class="label label-success">正常</span>' :
                        '<span class="label label-danger">紧急</span>';
                }
            },
            {
                label: '摆渡状态', name: 'status', width: 20, formatter: function (value) {
                    return value === 0 ?
                        '<span class="label label-danger">等待</span>' :
                        '<span class="label label-success">成功</span>';
                }
            }
        ],
		viewrecords: true,
        height: 600,
        rowNum: 16,
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

    new AjaxUpload('#upload', {
        action: baseURL + "sys/oss/upload",
        name: 'file',
        autoSubmit:true,
        responseType:"json",
        onSubmit:function(file, extension){
            if (!(extension && /^(jpg|jpeg|png|gif|txt|doc|xsl|zip|jar)$/.test(extension.toLowerCase()))){
                alert('只支持jpg|jpeg|png|gif|txt|doc|xsl|zip|jar格式的文件！');
                return false;
            }
        },
        onComplete : function(file, r){
            if(r.code==0){
                vm.reload();
            }else{
                alert(r.msg);
            }
        }
    });

});
function download_uri(cellvalue, options, rowObject) {
    return "<a href='"+rowObject.downloadUrl+"'><input type='button' value='文件下载'/></a>";
}
var vm = new Vue({
	el:'#rrapp',
	data:{
        q:{
            paramKey: null
        },
        showList: true,
        title: null,
        oss: {}
	},
    
	methods: {
		query: function () {
            $("#jqGrid").jqGrid("setGridParam",{page:1});
			vm.reload();
		},
        update: function () {
            var id = getSelectedRow();
            if(id == null){
                return ;
            }

            $.get(baseURL + "sys/oss/info/"+id, function(r){
                vm.showList = false;
                vm.title = "修改";
                vm.oss = r.oss;
            });
        },
		
        del: function () {
            var ossIds = getSelectedRows();
            if(ossIds == null){
                return ;
            }

            confirm('确定要删除选中的记录？', function(){
                $.ajax({
                    type: "POST",
                    url: baseURL + "sys/oss/delete",
                    contentType: "application/json",
                    data: JSON.stringify(ossIds),
                    success: function(r){
                        if(r.code === 0){
                            alert('操作成功', function(){
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
            var url = vm.oss.id == null ? "sys/oss/update" : "sys/oss/update";
            $.ajax({
                type: "POST",
                url: baseURL + url,
                contentType: "application/json",
                data: JSON.stringify(vm.oss),
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
		reload: function () {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
                page:page
            }).trigger("reloadGrid");
		}
	}
});