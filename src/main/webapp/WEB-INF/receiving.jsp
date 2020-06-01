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
    <button class="layui-btn" data-type="getCheckData" ><i class=" layui-icon layui-icon-search"></i>查看</button>
</div>
<table class="layui-hide" id="test" lay-filter="test"></table>
</div>
<script src="../layui/layui.js"></script>
<div class="site-text" style="margin: 5%; display: none" id="receiving"  target="test123">
<form class="layui-form"  id="customer">

    <div class="layui-form-item">
        <label class="layui-form-label">路径</label>
        <div class="layui-input-block">
            <input type="text" name="path" id="path" lay-verify="title" autocomplete="off"  class="layui-input" disabled="disabled">
        </div>
    </div>
    <div class="layui-form-item">
        <div class="layui-form-item">
            <label class="layui-form-label">是否读取子目录</label>
                <div class="layui-input-block" id="subdir">
                    <input type="radio" value="是" title="是" name="subdir"  lay-verify="title" autocomplete="off"  class="layui-input" disabled>
                    <input type="radio" value="否" title="否" name="subdir"  lay-verify="title" autocomplete="off"  class="layui-input" disabled>
                </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">是否删除</label>
            <div class="layui-input-block" id="cust_deletefile">
                <input type="radio" value="是" title="是" name="deletefile"  lay-verify="title" autocomplete="off"  class="layui-input" disabled>
                <input type="radio" value="否" title="否" name="deletefile"  lay-verify="title" autocomplete="off"  class="layui-input" disabled>
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">是否读取已存在</label>
            <div class="layui-input-block" id="cust_send_existed">
                <input type="radio" value="是" title="是" name="send_existed"  lay-verify="title" autocomplete="off"  class="layui-input" disabled>
                <input type="radio" value="否" title="否" name="send_existed"  lay-verify="title" autocomplete="off"  class="layui-input" disabled>
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">是否读取现在的</label>
            <div class="layui-input-block" id="cust_send_now">
                <input type="radio" value="是" title="是" name="send_now"  lay-verify="title" autocomplete="off"  class="layui-input" disabled>
                <input type="radio" value="否" title="否" name="send_now"  lay-verify="title" autocomplete="off"  class="layui-input" disabled>
            </div>
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">等待时间</label>
            <div class="layui-input-block">
                <input type="text" name="sleep_time" id="sleep_time" lay-verify="required"  autocomplete="off" class="layui-input" disabled="disabled">
            </div>
        </div>
    <div class="layui-form-item">
        <label class="layui-form-label">等待数</label>
        <div class="layui-input-block">
            <input type="text" name="sleep_count" id="sleep_count" lay-verify="required"  autocomplete="off" class="layui-input" disabled="disabled">
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
            ,url:'/sendplan/sendplanAll'
            ,title: '接收端计划管理'
            ,id:'sendplanTable'
            ,page:true
            ,cols: [[
                {type:'checkbox',fixed: 'left'}
                ,{field:'id', title:'编号', width:80, fixed: 'left', sort: true}
                ,{field:'name', title:'计划名称', width:150, fixed: 'left', sort: true}
                ,{field:'centent', title:'路径', width:210, sort: true,templet: function (d) {
                    var q=JSON.parse(d.content);
                        return q.path;
                    }}
                ,{field:'centent', title:'是否读取子目录', width:150, sort: true,templet: function (d) {
                        var q=JSON.parse(d.content);
                        if(q.subdir==true){
                            return '<span class="layui-badge layui-bg-green">是</span>';
                        }else{
                            return '<span class="layui-badge">否</span>';
                        }

                    }}
                ,{field:'centent', title:'是否删除目录', width:140, sort: true,templet: function (d) {
                        var q=JSON.parse(d.content);
                        if(q.deletefile==true){
                            return '<span class="layui-badge layui-bg-green">是</span>';
                        }else{
                            return '<span class="layui-badge">否</span>';
                        }
                    }}
                ,{field:'centent', title:'是否传已存在的', width:150, sort: true,templet: function (d) {
                        var q=JSON.parse(d.content);
                        if(q.send_existed==true){
                            return '<span class="layui-badge layui-bg-green">是</span>';
                        }else{
                            return '<span class="layui-badge">否</span>';
                        }
                    }}
                ,{field:'centent', title:'是否传现在的', width:140, sort: true,templet: function (d) {
                        var q=JSON.parse(d.content);
                        if(q.send_now==true){
                            return '<span class="layui-badge layui-bg-green">是</span>';
                        }else{
                            return '<span class="layui-badge">否</span>';
                        }
                    }}
                ,{field:'centent', title:'等待时间', width:110, sort: true,templet: function (d) {
                        var q=JSON.parse(d.content);
                        return q.sleep_time;
                    }}
                ,{field:'centent', title:'等待数', width:90, sort: true,templet: function (d) {
                        var q=JSON.parse(d.content);
                        return q.sleep_count;
                    }}
                ,{field:'addtime', title:'添加时间', width:160, sort: true,templet : function(value){
                        return layui.util.toDateString(value.addtime);
                    }}
                ,{field:'updatetime', title:'最近活跃时间', width:160, sort: true, totalRow: true,templet : function(value){
                        return layui.util.toDateString(value.updatetime);
                    }}
            ]]
            ,height:700,width:1602,
        });

        var $ = layui.$, form = layui.form,active = {
            getCheckData: function(){ //获取选中数据
                var  checkStatus= table.checkStatus('sendplanTable')
                var data = checkStatus.data;
                if(data[0]!=undefined){
                    if(checkStatus.data.length==1){
                    layer.open({
                        type: 1
                        ,title: '详细信息'
                        ,maxmin: true
                        ,shadeClose: true//点击遮罩关闭层
                        ,content:$('#receiving')
                        ,area: ['600px', '600px']
                        ,btn: ['确定', '取消']
                        ,success:function(layero,index){
                            var role_id=data[0].id;
                            $.ajax({
                                url:'/sendplan/sendplan?id='+role_id,
                                dataType: 'json',
                                type: 'get',
                                success: function (data) {
                                    var q=JSON.parse(data.data.content)
                                    $('#path').val(q.path);
                                    $('#sleep_time').val(q.sleep_time);
                                    $('#sleep_count').val(q.sleep_count);
                                    $("input[name=subdir][value=是]").attr("checked", q.subdir == false ? true : false);
                                    $("input[name=subdir][value=否]").attr("checked", q.subdir == true ? true : false);
                                    $("input[name=deletefile][value=是]").attr("checked", q.deletefile == false ? true : false);
                                    $("input[name=deletefile][value=否]").attr("checked", q.deletefile == true ? true : false);
                                    $("input[name=send_now][value=是]").attr("checked", q.send_now == false ? true : false);
                                    $("input[name=send_now][value=否]").attr("checked", q.send_now == true ? true : false);
                                    $("input[name=send_existed][value=是]").attr("checked", q.send_existed == false ? true : false);
                                    $("input[name=send_existed][value=否]").attr("checked", q.send_existed == true ? true : false);
                                    //重新渲染 固定写法
                                    layui.form.render();
                                }
                            })
                            $("#customer")[0].reset()//重置form
                        }
                    });
                    }else{
                        layer.alert('只可查一条数据详情');
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