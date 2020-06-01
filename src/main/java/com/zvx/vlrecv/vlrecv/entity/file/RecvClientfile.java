package com.zvx.vlrecv.vlrecv.entity.file;

import java.util.Date;

public class RecvClientfile extends RecvClientfileKey {
    private Long filesize;

    private Date addtime;

    private Date endtime;

    private Integer status;

    private String desc;

    private Long lastmodified;

    private String absolutePath;

    public RecvClientfile(String recvClientId, String filepath, Integer planid, Integer taskId, Long filesize, Date addtime, Date endtime, Integer status, String desc, Long lastmodified, String absolutePath) {
        super(recvClientId, filepath, planid, taskId);
        this.filesize = filesize;
        this.addtime = addtime;
        this.endtime = endtime;
        this.status = status;
        this.desc = desc;
        this.lastmodified = lastmodified;
        this.absolutePath = absolutePath;
    }

    public RecvClientfile() {
        super();
    }

    public Long getFilesize() {
        return filesize;
    }

    public void setFilesize(Long filesize) {
        this.filesize = filesize;
    }

    public Date getAddtime() {
        return addtime;
    }

    public void setAddtime(Date addtime) {
        this.addtime = addtime;
    }

    public Date getEndtime() {
        return endtime;
    }

    public void setEndtime(Date endtime) {
        this.endtime = endtime;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public Long getLastmodified() {
        return lastmodified;
    }

    public void setLastmodified(Long lastmodified) {
        this.lastmodified = lastmodified;
    }

    public String getAbsolutePath() {
        return absolutePath;
    }

    public void setAbsolutePath(String absolutePath) {
        this.absolutePath = absolutePath;
    }
}