<!DOCTYPE html>
<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>中辰信可见光安全隔离与单向传输系统</title>
    <!-- Tell the browser to be responsive to screen width -->
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <link rel="stylesheet" href="../css/xcConfirm.css">
    <link rel="stylesheet" href="../css/bootstrap.min.css">
    <link rel="stylesheet" href="../css/font-awesome.min.css">
    <link rel="stylesheet" href="../css/AdminLTE.min.css">
<%--    <!-- AdminLTE Skins. Choose a skin from the css/skins--%>
<%--         folder instead of downloading all of them to reduce the load. -->--%>
<%--    <link rel="stylesheet" href="../css/all-skins.min.css">--%>
<%--    <link rel="stylesheet" href="../css/main.css">--%>
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>
<body class="hold-transition login-page">
<div class="login-box" id="rrapp" v-cloak>
    <div class="login-logo">

    </div>
    <!-- /.login-logo -->
    <div class="login-box-body">
        <p class="login-box-msg"><span style="font-size: 25px">中辰信可见光<br>安全隔离与单向传输系统</span> </p>
<%--        <form action="${pageContext.request.contextPath}/SysUser/login" method="post"  id="MethodFrom">--%>
        <div class="form-group has-feedback">
            <input type="text" class="form-control" name="username" id="username" placeholder="账号">
            <span class="glyphicon glyphicon-user form-control-feedback"></span>
        </div>
        <div class="form-group has-feedback">
            <input type="password" class="form-control" name="password" id="password" placeholder="密码">
            <span class="glyphicon glyphicon-lock form-control-feedback"></span>
        </div>
        <div class="form-group has-feedback">
<%--            <input type="text" class="form-control" v-model="captcha" @keyup.enter="login" placeholder="验证码">--%>
<%--            <span class="glyphicon glyphicon-warning-sign form-control-feedback"></span>--%>
        </div>
        <div class="form-group has-feedback">
<%--            <img alt="如果看不清楚，请单击图片刷新！" class="pointer" :src="src" @click="refreshCode">--%>
<%--            &nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:;" @click="refreshCode">点击刷新</a>--%>
        </div>


        <div class="row">
            <div class="col-xs-8">
                <div class="checkbox icheck">
                </div>
            </div>
            <!-- /.col -->
            <div class="col-xs-4">
                <button type="submit" class="btn btn-primary btn-block btn-flat" id="login">登录</button>
            </div>
            <!-- /.col -->
        </div>
        <!-- /.social-auth-links -->
<%--        </form>--%>
    </div>
    <!-- /.login-box-body -->
</div>
<!-- /.login-box -->
<script src="../libs/jquery.min.js"></script>
<script src="../libs/bootstrap.min.js"></script>
<script src="../libs/jquery.slimscroll.min.js"></script>
<script src="../libs/fastclick.min.js"></script>
<script src="../libs/jquery-1.9.1.js"></script>
<script src="../libs/xcConfirm.js"></script>
<style type="text/css">
    .sgBtn{width: 135px; height: 35px; line-height: 35px; margin-left: 10px; margin-top: 10px; text-align: center; background-color: #0095D9; color: #FFFFFF; float: left; border-radius: 5px;}
</style>
</body>
<script type="text/javascript">
    $("#login").click(function () {
        var data = "username="+$("#username").val()+"&password="+$("#password").val();
        $.ajax({
            url:"/recv/login",
            type:"post",
            data:data,
            dataType: "json",
            success: function(result){
                if(result.code==0){
                    window.location.href="${pageContext.request.contextPath}/index"
                }else{
                    alert('账号或密码错误或已被禁用');
                    window.location.href="${pageContext.request.contextPath}/recv/login"
                }
            }
    });
    })
</script>
</html>
