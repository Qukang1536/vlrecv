package com.zvx.vlrecv.vlrecv.entity.file;

import java.util.Date;

public class RecvClient {
    private Integer id;

    private Integer planId;

    private String agentId;

    private Date addtime;

    private Date updatetime;

    private String content;

    //计划名称
    private String planname;
    //设备名称
    private String displayname;

    public RecvClient(Integer id, Integer planId, String agentId, Date addtime, Date updatetime, String content, String planname, String displayname) {
        this.id = id;
        this.planId = planId;
        this.agentId = agentId;
        this.addtime = addtime;
        this.updatetime = updatetime;
        this.content = content;
        this.planname = planname;
        this.displayname = displayname;
    }

    public RecvClient() {
        super();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getPlanId() {
        return planId;
    }

    public void setPlanId(Integer planId) {
        this.planId = planId;
    }

    public String getAgentId() {
        return agentId;
    }

    public void setAgentId(String agentId) {
        this.agentId = agentId;
    }

    public Date getAddtime() {
        return addtime;
    }

    public void setAddtime(Date addtime) {
        this.addtime = addtime;
    }

    public Date getUpdatetime() {
        return updatetime;
    }

    public void setUpdatetime(Date updatetime) {
        this.updatetime = updatetime;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getPlanname() {
        return planname;
    }

    public void setPlanname(String planname) {
        this.planname = planname;
    }

    public String getDisplayname() {
        return displayname;
    }

    public void setDisplayname(String displayname) {
        this.displayname = displayname;
    }
}