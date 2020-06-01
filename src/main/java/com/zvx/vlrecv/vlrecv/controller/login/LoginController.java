package com.zvx.vlrecv.vlrecv.controller.login;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.zvx.vlrecv.vlrecv.entity.file.SysUser;
import com.zvx.vlrecv.vlrecv.service.file.SysUserService;
import com.zvx.vlrecv.vlrecv.util.JsonData;
import com.zvx.vlrecv.vlrecv.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.List;

/**
 * @author 屈康
 * @company 中辰信
 * @Functional interpretation 中辰信可见光 安全隔离与单向传输系统 登录
 * @create  2020-05-27 9:33
 */
@Controller
@RequestMapping("/recv")
public class LoginController {
    @Autowired
    SysUserService sysUserService;

    @RequestMapping("/login")
    public String  login(HttpServletRequest request, HttpServletResponse response)  {
        ObjectMapper om=new ObjectMapper();
        JsonData jsonData;
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        SysUser user= sysUserService.SysUserLogin(username,password);
        if(username==null && password==null){
            return "login";
        }
        System.out.println("加油1111");
        System.out.println("舒服了111111");
        System.out.println("aaa");
        if(user!=null){
            jsonData = new JsonData(0, "登录成功", user);
        }else{
            jsonData = new JsonData(1, "登录失败", null);
        }
        try {
            ResponseUtil.write(response, om.writeValueAsString(jsonData));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
    @RequestMapping("/userAll")
    public String  UserAll(HttpServletRequest request, HttpServletResponse response)  {
        ObjectMapper om=new ObjectMapper();
        List<SysUser> user= sysUserService.UserAll();
        JsonData jsonData=new JsonData(0,"操作成功",user);
        try {
            ResponseUtil.write(response, om.writeValueAsString(jsonData));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @RequestMapping("/del")
    public String  del(HttpServletRequest request, HttpServletResponse response)  {
        ObjectMapper om=new ObjectMapper();
        int code = sysUserService.deleteByPrimaryKey(Long.valueOf(request.getParameter("id")));
        JsonData jsonData=new JsonData(0,"操作成功",code);
        try {
            ResponseUtil.write(response, om.writeValueAsString(jsonData));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @RequestMapping("/add")
    public String  add(HttpServletRequest request, HttpServletResponse response)  {
        ObjectMapper om=new ObjectMapper();
        SysUser sysUser=new SysUser();
        sysUser.setUsername(request.getParameter("username"));
        sysUser.setPassword(request.getParameter("password"));
        sysUser.setEmail(request.getParameter("email"));
        sysUser.setMobile(request.getParameter("mobile"));
        sysUser.setCreateTime(new Date());
        byte status=1;
        sysUser.setStatus(status);
        int code = sysUserService.insertSelective(sysUser);
        JsonData jsonData=new JsonData(0,"操作成功",code);
        try {
            ResponseUtil.write(response, om.writeValueAsString(jsonData));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

}
