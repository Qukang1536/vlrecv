package com.zvx.vlrecv.vlrecv.entity.file;

import java.io.Serializable;
import java.util.List;

/**
 * 计划和主机 数组对象
 * @auther 吴赏
 * @date 2020-5-31 17:10:12
 */
public class PlanAndHost implements Serializable  {
    private static final long serialVersionUID = -2416824001939564695L;

    List<RecvAgent> recvAgents;

    List<SendPlan> sendPlans;


    public List<RecvAgent> getRecvAgents() {
        return recvAgents;
    }

    public void setRecvAgents(List<RecvAgent> recvAgents) {
        this.recvAgents = recvAgents;
    }

    public List<SendPlan> getSendPlans() {
        return sendPlans;
    }

    public void setSendPlans(List<SendPlan> sendPlans) {
        this.sendPlans = sendPlans;
    }

}
