package com.zvx.vlrecv.vlrecv.controller.file;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.zvx.vlrecv.vlrecv.entity.file.SendPlan;
import com.zvx.vlrecv.vlrecv.service.file.SendPlanService;
import com.zvx.vlrecv.vlrecv.util.JsonData;
import com.zvx.vlrecv.vlrecv.util.PageBean;
import com.zvx.vlrecv.vlrecv.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * @author 屈康
 * @company 中辰信
 * @Functional interpretation
 * @create  2020-05-27 16:46
 */
@Controller
@RequestMapping("/sendplan")
public class SendPlanController {
    @Autowired
    private  SendPlanService sendPlanService;

    @RequestMapping("/sendplanAll")
    public String sendplanAll(HttpServletResponse response, HttpServletRequest req){
        PageBean pageBean=new PageBean();
        pageBean.setRequest(req);
        ObjectMapper om=new ObjectMapper();
        List<SendPlan> sendPlans =this.sendPlanService.SendPlanAll();
        try {
         JsonData jsonData=new JsonData(0,"操作成功",sendPlans);
         jsonData.put("count",pageBean.getTotal());
         jsonData.put("pageBean",pageBean);
         ResponseUtil.write(response,om.writeValueAsString(jsonData));
         return "receiving";
        }catch (Exception e){
            e.printStackTrace();
        }
        return  null;
    }

    @RequestMapping("/sendplan")
    public String sendplan(HttpServletResponse response, HttpServletRequest req){
        PageBean pageBean=new PageBean();
        ObjectMapper om=new ObjectMapper();
        SendPlan sendplan= sendPlanService.selectByPrimaryKey(Integer.valueOf(req.getParameter("id")));
        try {
            JsonData jsonData=new JsonData(0,"操作成功",sendplan);
            ResponseUtil.write(response,om.writeValueAsString(jsonData));
        }catch (Exception e){
            e.printStackTrace();
        }
        return  null;
    }
}
