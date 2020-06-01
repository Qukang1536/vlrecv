package com.zvx.vlrecv.vlrecv.entity.file;

public class RecvClientfileKey {
    private String recvClientId;

    private String filepath;

    private Integer planid;

    private Integer taskId;

    public RecvClientfileKey(String recvClientId, String filepath, Integer planid, Integer taskId) {
        this.recvClientId = recvClientId;
        this.filepath = filepath;
        this.planid = planid;
        this.taskId = taskId;
    }

    public RecvClientfileKey() {
        super();
    }

    public String getRecvClientId() {
        return recvClientId;
    }

    public void setRecvClientId(String recvClientId) {
        this.recvClientId = recvClientId;
    }

    public String getFilepath() {
        return filepath;
    }

    public void setFilepath(String filepath) {
        this.filepath = filepath;
    }

    public Integer getPlanid() {
        return planid;
    }

    public void setPlanid(Integer planid) {
        this.planid = planid;
    }

    public Integer getTaskId() {
        return taskId;
    }

    public void setTaskId(Integer taskId) {
        this.taskId = taskId;
    }
}