package com.zvx.vlrecv.vlrecv.controller.file;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.zvx.vlrecv.vlrecv.entity.file.RecvAgent;
import com.zvx.vlrecv.vlrecv.service.file.RecvAgentService;
import com.zvx.vlrecv.vlrecv.util.JsonData;
import com.zvx.vlrecv.vlrecv.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * @author 屈康
 * @company 中辰信
 * @Functional interpretation
 * @create  2020-05-29 9:55
 */
@Controller
@RequestMapping("/RecvAgent")
public class RecvAgentController {
    @Autowired
    private RecvAgentService recvAgentService;
    @RequestMapping("/RecvAll")
    public String recvAll(HttpServletResponse response, HttpServletRequest request){
        ObjectMapper om=new ObjectMapper();
        List<RecvAgent> recvAgents = recvAgentService.RecvAll();
        try {
            JsonData jsonData=new JsonData(0,"操作成功",recvAgents);
            ResponseUtil.write(response,om.writeValueAsString(jsonData));
        }catch (Exception e){
            e.printStackTrace();
        }
        return  null;
    }

    @RequestMapping("/Recv")
    public String recv(HttpServletResponse response, HttpServletRequest request){
        ObjectMapper om=new ObjectMapper();
        RecvAgent RecvAgent = recvAgentService.selectByPrimaryKey(Integer.valueOf(request.getParameter("id")));
        try {
            JsonData jsonData=new JsonData(0,"操作成功",RecvAgent);
            ResponseUtil.write(response,om.writeValueAsString(jsonData));
        }catch (Exception e){
            e.printStackTrace();
        }
        return  null;
    }

    @RequestMapping("/edit")
    public String edit(HttpServletResponse response, HttpServletRequest request){
        ObjectMapper om=new ObjectMapper();
        String id = request.getParameter("id");
        String display_name = request.getParameter("display_name");
        String computer_name = request.getParameter("computer_name");
        RecvAgent recvAgent=new RecvAgent();
        recvAgent.setId(Integer.valueOf(id));
        recvAgent.setDisplayName(display_name);
        recvAgent.setComputerName(computer_name);
        int r= recvAgentService.updateByPrimaryKeySelective(recvAgent);
        try {
            JsonData jsonData=new JsonData(1,"操作成功",r);
            ResponseUtil.write(response,om.writeValueAsString(jsonData));
        }catch (Exception e){
            e.printStackTrace();
        }
        return  null;
    }

}
