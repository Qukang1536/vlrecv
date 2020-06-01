<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>中辰信可见光数据系统</title>
    <link rel="stylesheet" href="../layui/css/layui.css" media="all">
    <script src="../libs/jquery.min.js"></script>
</head>
<body class="layui-layout-body">
<div class="layui-btn-group demoTable">
    <button class="layui-btn" data-type="getCheckData" ><i class=" layui-icon layui-icon-add-1"></i>新增</button>
</div>
<table class="layui-hide" id="test" lay-filter="test"></table>

<script src="../layui/layui.js"></script>

<div class="site-text" style="margin: 5%; display: none" id="management"  target="test123">
    <form class="layui-form"  id="customer">

        <div class="layui-form-item">
            <label class="layui-form-label">计划名称</label>
            <div class="layui-input-block">
                <input type="text" name="planname" id="planname" lay-verify="title" autocomplete="off"  class="layui-input">
            </div>
        </div>

        <div class="layui-form-item">
            <label class="layui-form-label">客户端名称</label>
            <div class="layui-input-block">
                <input type="text" name="displayname" id="displayname" lay-verify="title" autocomplete="off"  class="layui-input">
            </div>
        </div>

        <div class="layui-form-item">
            <label class="layui-form-label">路径</label>
            <div class="layui-input-block">
                <input type="text" name="path" id="path" lay-verify="title" autocomplete="off"  class="layui-input">
            </div>
        </div>

        <div class="layui-form-item">
            <div class="layui-form-item">
                <label class="layui-form-label">是否读取已存在</label>
                <div class="layui-input-block" id="cust_send_existed">
                    <input type="radio" value="是" title="是" name="send_existed"  lay-verify="title" autocomplete="off"  class="layui-input" >
                    <input type="radio" value="否" title="否" name="send_existed"  lay-verify="title" autocomplete="off"  class="layui-input" >
                </div>
            </div>
        </div>

    </form>
</div>

<script>
    layui.use('table', function(){
        var table = layui.table
        //温馨提示：默认由前端自动合计当前行数据。从 layui 2.5.6 开始： 若接口直接返回了合计行数据，则优先读取接口合计行数据。
        //详见：https://www.layui.com/doc/modules/table.html#totalRow
        table.render({
            elem: '#test'
            ,url:'/planManage/list'
            ,title: '计划接收客户端管理'
            ,id:'planManageTable'
            ,page:true
            ,cols: [[
                {type:'checkbox',fixed: 'left'}
                ,{field:'planname', title:'计划名称', width:170, fixed: 'left', sort: true}
                ,{field:'displayname', title:'设备名称', width:170, sort: true}
                ,{field:'addtime', title:'添加时间', width:170, sort: true,templet : function(value){
                        return layui.util.toDateString(value.addtime);
                    }}
                ,{field:'updatetime', title:'修改时间', width:170, sort: true, totalRow: true,templet : function(value){
                        return layui.util.toDateString(value.updatetime);
                    }}
                ,{field:'centent', title:'路径', width:220, sort: true,templet: function (d) {
                        var q=JSON.parse(d.content);
                        return q.path;
                    }}
                ,{field:'centent', title:'是否读已存在的', width:150, align:'center', sort: true, templet: function (d) {
                        var q=JSON.parse(d.content);
                        if(q.send_existed==true){
                            return '<span class="layui-badge layui-bg-green">是</span>';
                        }else{
                            return '<span class="layui-badge">否</span>';
                        }
                    }}
            ]]
            ,height:700,width:1106,
        });

        var $ = layui.$, form = layui.form,active = {
            getCheckData: function(){ //获取选中数据
                //var  checkStatus= table.checkStatus('planManageTable')
                //var data = checkStatus.data;
                //if(data[0]!=undefined){
                    //if(checkStatus.data.length==1){
                        layer.open({
                            type: 1
                            ,title: '新增'
                            ,maxmin: false
                            ,shadeClose: true//点击遮罩关闭层
                            ,content:$('#management')
                            ,area: ['450px', '380px']
                            ,btn: ['确定', '取消']
                            ,success:function(layero,index){
                                //var role_id=data[0].id;
                                $.ajax({
                                    url:'/planManage/getinfo',//?id='+role_id,
                                    dataType: 'json',
                                    type: 'get',
                                    success: function (data) {

                                        var list = data[0].attList;
                                        for ( var k in list) {
                                            alert(list[k]);
                                        }

                                        alert(data.data.sendPlans);
                                        alert(data.data.sendPlans.name);
                                        //var q=JSON.parse(data.data.content)
                                        //$('#path').val(q.path);
                                        //$("input[name=send_existed][value=是]").attr("checked", q.send_existed == false ? true : false);
                                        //$("input[name=send_existed][value=否]").attr("checked", q.send_existed == true ? true : false);
                                        //重新渲染 固定写法
                                        layui.form.render();
                                    }
                                })
                                $("#customer")[0].reset()//重置form
                            },yes: function(index, layero){
                                $.getJSON('/planManage/bb',{
                                    id:data[0].id,
                                    display_name:$('#display_name').val(),
                                    computer_name:$('#computer_name').val(),
                                },function(data){
                                    //根据后台返回的参数，来进行判断s
                                    if(data.data==1){
                                        layer.alert('编辑成功',{icon:1,title:'提示'},function(i){
                                            layer.close(i);
                                            layer.close(index);//关闭弹出层
                                            $("#customer")[0].reset()//重置form
                                        })
                                        table.reload('RecaAgentTable',{//重载表格
                                            page:{
                                                curr:1
                                            }
                                        })
                                    }
                                });
                            },btn2: function(){
                                var index = layer.open();
                                layer.close(index);//关闭当前弹窗
                            }
                        });
                    //}else{
                    //    layer.alert('只可查一条数据详情');
                    //}
                //}else{
                //    layer.alert('请选择一条数据');
                //}

            }
        };
        $('.demoTable .layui-btn').on('click', function(){
            var type = $(this).data('type');
            active[type] ? active[type].call(this) : '';
        });

    });
</script>
</body>
</html>