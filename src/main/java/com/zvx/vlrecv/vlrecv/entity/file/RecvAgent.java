package com.zvx.vlrecv.vlrecv.entity.file;

import java.util.Date;

public class RecvAgent {
    private Integer id;

    private String agentId;

    private String displayName;

    private String computerName;

    private String ip;

    private String mac;

    private String operatingSystem;

    private Date regTime;

    private Date activeTime;

    private String agentVersion;

    public RecvAgent(Integer id, String agentId, String displayName, String computerName, String ip, String mac, String operatingSystem, Date regTime, Date activeTime, String agentVersion) {
        this.id = id;
        this.agentId = agentId;
        this.displayName = displayName;
        this.computerName = computerName;
        this.ip = ip;
        this.mac = mac;
        this.operatingSystem = operatingSystem;
        this.regTime = regTime;
        this.activeTime = activeTime;
        this.agentVersion = agentVersion;
    }

    public RecvAgent() {
        super();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getAgentId() {
        return agentId;
    }

    public void setAgentId(String agentId) {
        this.agentId = agentId;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getComputerName() {
        return computerName;
    }

    public void setComputerName(String computerName) {
        this.computerName = computerName;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public String getMac() {
        return mac;
    }

    public void setMac(String mac) {
        this.mac = mac;
    }

    public String getOperatingSystem() {
        return operatingSystem;
    }

    public void setOperatingSystem(String operatingSystem) {
        this.operatingSystem = operatingSystem;
    }

    public Date getRegTime() {
        return regTime;
    }

    public void setRegTime(Date regTime) {
        this.regTime = regTime;
    }

    public Date getActiveTime() {
        return activeTime;
    }

    public void setActiveTime(Date activeTime) {
        this.activeTime = activeTime;
    }

    public String getAgentVersion() {
        return agentVersion;
    }

    public void setAgentVersion(String agentVersion) {
        this.agentVersion = agentVersion;
    }

    @Override
    public String toString() {
        return "RecvAgent{" +
                "id=" + id +
                ", agentId='" + agentId + '\'' +
                ", displayName='" + displayName + '\'' +
                ", computerName='" + computerName + '\'' +
                ", ip='" + ip + '\'' +
                ", mac='" + mac + '\'' +
                ", operatingSystem='" + operatingSystem + '\'' +
                ", regTime=" + regTime +
                ", activeTime=" + activeTime +
                ", agentVersion='" + agentVersion + '\'' +
                '}';
    }
}