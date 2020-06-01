package com.zvx.vlrecv.vlrecv.controller.file;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.zvx.vlrecv.vlrecv.entity.file.PlanAndHost;
import com.zvx.vlrecv.vlrecv.entity.file.RecvAgent;
import com.zvx.vlrecv.vlrecv.entity.file.RecvClient;
import com.zvx.vlrecv.vlrecv.entity.file.SendPlan;
import com.zvx.vlrecv.vlrecv.service.file.RecvAgentService;
import com.zvx.vlrecv.vlrecv.service.file.RecvClientService;
import com.zvx.vlrecv.vlrecv.service.file.SendPlanService;
import com.zvx.vlrecv.vlrecv.util.JsonData;
import com.zvx.vlrecv.vlrecv.util.PageBean;
import com.zvx.vlrecv.vlrecv.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * 客户端管理
 * @auther 吴赏
 * @date 2020-5-31 14:10:05
 */
@Controller
@RequestMapping("/planManage")
public class PlanManageController {

    @Autowired
    private RecvClientService recvClientService;
    @Autowired
    private SendPlanService sendPlanService;
    @Autowired
    private RecvAgentService recvAgentService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    public String list(HttpServletResponse response, HttpServletRequest request) {
        ObjectMapper om=new ObjectMapper();
        /**
         * 查询所有客户端管理
         */
        List<RecvClient> recvClientList =  recvClientService.findAll();

        try {
            JsonData jsonData=new JsonData(0,"操作成功",recvClientList);
            ResponseUtil.write(response,om.writeValueAsString(jsonData));
        }catch (Exception e){
            e.printStackTrace();
        }
        return  null;
    }

    /**
     * 查询计划和主机
     */
    @RequestMapping("/getinfo")
    public String sendplanAll(HttpServletResponse response, HttpServletRequest req){
        ObjectMapper om = new ObjectMapper();
        //计划和主机 数组对象
        PlanAndHost planAndHost = new PlanAndHost();

        //查询所有计划
        List<SendPlan> sendPlans =this.sendPlanService.SendPlanAll();
        planAndHost.setSendPlans(sendPlans);

        //查询所有主机
        List<RecvAgent> recvAgents = recvAgentService.RecvAll();
        planAndHost.setRecvAgents(recvAgents);

        try {
            JsonData jsonData=new JsonData(0,"操作成功",planAndHost);
            ResponseUtil.write(response,om.writeValueAsString(jsonData));
            return "management";
        }catch (Exception e){
            e.printStackTrace();
        }
        return  null;
    }


}
