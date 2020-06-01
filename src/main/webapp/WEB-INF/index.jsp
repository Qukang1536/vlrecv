<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>中辰信可见光数据系统</title>
    <link rel="stylesheet" href="../layui/css/layui.css">
    <script src="../libs/jquery.min.js"></script>
</head>
<body class="layui-layout-body">
<div class="layui-layout layui-layout-admin">
    <div class="layui-header">
        <div class="layui-logo">中辰信可见光数据系统</div>
        <!-- 头部区域（可配合layui已有的水平导航） -->
        <ul class="layui-nav layui-layout-right">
            <li class="layui-nav-item">
                <a href="javascript:;">
                    <img src="http://t.cn/RCzsdCq" class="layui-nav-img">
                </a>
            </li>
            <li class="layui-nav-item"><a href="../recv/login">退出登录</a></li>
        </ul>
    </div>

    <div class="layui-side layui-bg-black">
        <div class="layui-side-scroll">
            <!-- 左侧导航区域（可配合layui已有的垂直导航） -->
            <ul class="layui-nav layui-nav-tree"  lay-filter="test" id="leftNav">
                <li class="layui-nav-item layui-nav-itemed">
                    <a class="" href="javascript:;">文件摆渡</a>
                    <dl class="layui-nav-child">
                        <dd><a lay-href="../receiving">接收端计划管理</a></dd>
                        <dd><a lay-href="../host">计划接收客户端主机</a></dd>
                        <dd><a lay-href="../management">计划接收客户端管理</a></dd>
                    </dl>
                </li>
                <li class="layui-nav-item layui-nav-itemed">
                    <a class="" href="javascript:;">系统管理</a>
                    <dl class="layui-nav-child">
                        <dd><a lay-href="../user">用户管理</a></dd>
                    </dl>
                </li>
            </ul>
        </div>
    </div>

    <div class="layui-body">
        <!-- 内容主体区域 -->
        <div style="padding: 15px;">
            <div class="layui-tab" lay-filter="tabs" lay-allowClose="true">
                <ul class="layui-tab-title">
                </ul>
                <div class="layui-tab-content">
                </div>
            </div>
        </div>
    </div>
</div>
<script src="../layui/layui.js"></script>
<script>
    //JavaScript代码区域
    layui.use('element', function(){
        var element = layui.element;

    });
</script>
<script id="toolbarDemo" type="text/html">
    <button class="layui-btn-normal layui-btn-lg"><i class=" layui-icon layui-icon-search"></i>查看</button>
</script>
<script>
    layui.use('element', function(){
        var $ = layui.jquery
            ,element = layui.element //Tab的切换功能，切换事件监听等，需要依赖element模块
            ,iframesrc=null
            ,name=null
            ,iframecontext=null;
        //触发事件
        var active = {
            tabAdd: function(){
                //新增一个Tab项
                element.tabAdd('tabs', {
                    title: name
                    ,content:iframecontext
                    ,id: iframesrc //实际使用一般是规定好的id，这里以时间戳模拟下
                })
            }
            ,tabDelete: function(othis){
                //删除指定Tab项
                element.tabDelete('demo', '44'); //删除：“商品管理”


                othis.addClass('layui-btn-disabled');
            }
            ,tabChange: function(){
                //切换到指定Tab项
                element.tabChange('tabs',iframesrc); //切换到：用户管理
            }
        };
        $("#leftNav a").on('click',function () {
            var _this=$(this),isrepeat=0;
            iframesrc =_this.attr('lay-href');
            name=_this.html();
            $(".layui-tab-title li").each(function (k,val) {
            var layid=$(val).attr('lay-id');
            if(layid==iframesrc){
                $(val).addClass("layui-this").siblings().removeClass("layui-this")
                active.tabChange();
                isrepeat=1;
                return false;
            }
            })
            if(iframesrc&&!isrepeat){
                iframecontext='<iframe name="iframeurl" frameborder="no" height=900px width=1980px src="'+iframesrc+'"></iframe>'
                active.tabAdd.call(this,_this)
                active.tabChange();
            }
        })

        $('.site-demo-active').on('click', function(){
            var othis = $(this), type = othis.data('type');
            active[type] ? active[type].call(this, othis) : '';
        });

        //Hash地址的定位
        var layid = location.hash.replace(/^#test=/, '');
        element.tabChange('test', layid);

        element.on('tab(test)', function(elem){
            location.hash = 'test='+ $(this).attr('lay-id');
        });

    });
</script>

</body>
</html>