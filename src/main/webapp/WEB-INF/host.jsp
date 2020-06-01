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
    <button class="layui-btn" data-type="getCheckData" ><i class=" layui-icon layui-icon-edit"></i>修改</button>
</div>
<table class="layui-hide" id="test" lay-filter="test"></table>
</div>
<script src="../layui/layui.js"></script>
<div class="site-text" style="margin: 5%; display: none" id="host"  target="test123">
    <form class="layui-form"  id="customer">

        <div class="layui-form-item">
            <label class="layui-form-label">显示名</label>
            <div class="layui-input-block">
                <input type="text" name="display_name" id="display_name" lay-verify="title" autocomplete="off"  class="layui-input">
            </div>
        </div>
        <div class="layui-form-item">
            <div class="layui-form-item">
                <label class="layui-form-label">主机名</label>
                <div class="layui-input-block">
                    <input type="text" name="computer_name" id="computer_name" lay-verify="title" autocomplete="off"  class="layui-input">
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">主机ip</label>
                <div class="layui-input-block">
                    <input type="text" name="ip" id="ip" lay-verify="title" autocomplete="off"  class="layui-input" disabled="disabled">
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">主机mac地址</label>
                <div class="layui-input-block">
                    <input type="text" name="mac" id="mac" lay-verify="title" autocomplete="off"  class="layui-input" disabled="disabled">
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">操作系统类型</label>
                <div class="layui-input-block">
                    <input type="text" name="operating_system" id="operating_system" lay-verify="title" autocomplete="off"  class="layui-input" disabled="disabled">
                </div>
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">客户端版本</label>
            <div class="layui-input-block">
                <input type="text" name="agent_version" id="agent_version" lay-verify="required"  autocomplete="off" class="layui-input" disabled="disabled">
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
            ,url:'/RecvAgent/RecvAll'
            ,title: '计划接受客户端主机'
            ,id:'RecaAgentTable'
            // ,page:true
            ,cols: [[
                {type:'checkbox',fixed: 'left'}
                ,{field:'id', title:'编号', width:80, fixed: 'left', sort: true}
                ,{field:'displayName', title:'显示名', width:170, fixed: 'left', sort: true}
                ,{field:'computerName', title:'主机名', width:170, sort: true}
                ,{field:'ip', title:'主机ip', width:190, sort: true}
                ,{field:'mac', title:'主机mac地址', width:200, sort: true}
                ,{field:'operatingSystem', title:'操作系统类型', width:150, sort: true}
                ,{field:'regTime', title:'添加时间', width:170, sort: true,templet : function(value){
                        return layui.util.toDateString(value.regTime);
                    }}
                ,{field:'activeTime', title:'最新活跃时间', width:170, sort: true,templet : function(value){
                        return layui.util.toDateString(value.activeTime);
                    }}
                ,{field:'agentVersion', title:'客户端版本', width:150, sort: true}
            ]]
            ,height:700,width:1510,
        });

        var $ = layui.$, form = layui.form,active = {
            getCheckData: function(){ //获取选中数据
                var  checkStatus= table.checkStatus('RecaAgentTable')
                var data = checkStatus.data;
                if(data[0]!=undefined){
                    if(checkStatus.data.length==1){
                        layer.open({
                            type: 1
                            ,title: '修改内容'
                            ,maxmin: true
                            ,shadeClose: true//点击遮罩关闭层
                            ,content:$('#host')
                            ,area: ['550px', '520px']
                            ,btn: ['提交', '取消']
                            ,success:function(layero,index){
                                var role_id=data[0].id;
                                $.ajax({
                                    url:'/RecvAgent/Recv?id='+role_id,
                                    dataType: 'json',
                                    type: 'get',
                                    success: function (data) {
                                        var cmit=data.data
                                        $('#display_name').val(cmit.displayName);
                                        $('#computer_name').val(cmit.computerName);
                                        $('#ip').val(cmit.ip);
                                        $('#mac').val(cmit.mac);
                                        $('#operating_system').val(cmit.operatingSystem);
                                        $('#agent_version').val(cmit.agentVersion);
                                        //重新渲染 固定写法
                                        layui.form.render();
                                    }
                                })
                                $("#customer")[0].reset()//重置form
                            },yes: function(index, layero){
                                $.getJSON('/RecvAgent/edit',{
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
                        }
                        });
                    }else{
                        layer.alert('只可修改一条数据详情');
                    }
                }else{
                    layer.alert('请选择一条数据');
                }

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