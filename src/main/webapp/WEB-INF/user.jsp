<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>数据交换系统</title>
    <link rel="stylesheet" href="../layui/css/layui.css" media="all">
    <script src="../libs/jquery.min.js"></script>
</head>
<body class="layui-layout-body">
<div class="layui-btn-group demoTable">
    <button class="layui-btn" data-type="getCheckData" id="withExport"><i class=" layui-icon layui-icon-add-1"></i>新增</button>
</div>
<table class="layui-hide" id="test" lay-filter="demo"></table>
</div>
<script src="../layui/layui.js"></script>
<div class="site-text" style="margin: 5%; display: none" id="host"  target="test123">
    <form class="layui-form"  id="customer">

        <div class="layui-form-item">
            <label class="layui-form-label">用户名</label>
            <div class="layui-input-block">
                <input type="text" name="username" id="username" lay-verify="title" autocomplete="off"  class="layui-input">
            </div>
        </div>
            <div class="layui-form-item">
                <label class="layui-form-label">密码</label>
                <div class="layui-input-block">
                    <input type="text" name="password" id="password" lay-verify="title" autocomplete="off"  class="layui-input">
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">电子邮箱</label>
                <div class="layui-input-block">
                    <input type="text" name="email" id="email" lay-verify="title" autocomplete="off"  class="layui-input">
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">手机号码</label>
                <div class="layui-input-block">
                    <input type="text" name="mobile" id="mobile" lay-verify="title" autocomplete="off"  class="layui-input" >
                </div>
            </div>
    </form>
</div>
<script type="text/html" id="barDemo">
    <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del">删除</a>
</script>

</body>
<script>
    layui.use('table', function(){
        var table = layui.table
        //温馨提示：默认由前端自动合计当前行数据。从 layui 2.5.6 开始： 若接口直接返回了合计行数据，则优先读取接口合计行数据。
        //详见：https://www.layui.com/doc/modules/table.html#totalRow
        table.render({
            elem: '#test'
            ,url:'/recv/userAll'
            ,title: '用户管理'
            ,id:'UsertTable'
            // ,page:true
            ,cols: [[
                {field:'username', title:'用户名', width:220, align:'center', fixed: 'left', sort: true}
                ,{field:'email', title:'电子邮箱', width:220, sort: true}
                ,{field:'mobile', title:'手机号码', width:200, sort: true}
                ,{field:'status', title:'状态', width:130, align:'center', sort: true,templet :function(value){
                        if(value.status==0){
                            return '<span class="layui-badge">禁用</span>';
                        }else if(value.status==1){
                            return '<span class="layui-badge layui-bg-green">正常</span>';
                        }}}
                ,{field:'createTime', title:'创建时间', width:200, align:'center', sort: true,templet :function(value){
                        return layui.util.toDateString(value.createTime);
                    }}
                ,{fixed: 'right',title:'操作', width:150, align:'center', toolbar: '#barDemo'}
            ]]
            ,height:700,width:1128,
        });
        $("#withExport").click(function(){
            layer.open({
                type: 1
                ,title: '添加用户'
                ,maxmin: true
                ,shadeClose: true//点击遮罩关闭层
                ,content:$('#host')
                ,area: ['400px', '350px']
                ,btn: ['提交', '取消']
                ,success:function(layero,index){
                    $("#customer")[0].reset()//重置form
                }
                ,yes: function(index, layero){
                    $.getJSON('/recv/add',{
                        username:$('#username').val(),
                        password:$('#password').val(),
                        mobile:$('#mobile').val(),
                        email:$('#email').val(),
                    },function(data){
                        //根据后台返回的参数，来进行判断s
                        if(data.data==1){
                            layer.alert('增加成功',{icon:1,title:'提示'},function(i){
                                layer.close(i);
                                layer.close(index);//关闭弹出层
                                $("#customer")[0].reset()//重置form
                            })
                            table.reload('UsertTable',{//重载表格
                                page:{
                                    curr:1
                                }
                            })
                        }
                    });
                }

            });
        });
        table.on('tool(demo)', function(obj){
            var data = obj.data;
            if(obj.event === 'del'){
                layer.confirm('确定删除此用户吗?', function(index){
                    $.getJSON('/recv/del',{
                        id:data.userId,
                    },function(data){
                        //根据后台返回的参数，来进行判断s
                        if(data.data==1){
                            layer.alert('删除成功',{icon:1,title:'提示'},function(i){
                                layer.close(i);
                                $("#customer")[0].reset()//重置form
                            })
                            table.reload('UsertTable',{//重载表格
                                page:{
                                    curr:1
                                }
                            })
                        }
                    });
                });
            }
        });
    });
</script>
</html>