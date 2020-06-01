package com.zvx.vlrecv.vlrecv.entity.file;

import java.io.Serializable;
import java.util.Date;

public class SendPlan implements Serializable {
    private static final long serialVersionUID = -2416824001939564684L;

    private Integer id;

    private String name;


    private Date addtime;

    private Date updatetime;

    private String content;

    public SendPlan(Integer id, String name, Date addtime, Date updatetime, String content) {
        this.id = id;
        this.name = name;
        this.addtime = addtime;
        this.updatetime = updatetime;
        this.content = content;
    }

    public SendPlan() {
        super();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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

    @Override
    public String toString() {
        return "SendPlan{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", addtime=" + addtime +
                ", updatetime=" + updatetime +
                ", content='" + content + '\'' +
                '}';
    }
}