package com.zvx.vlrecv.vlrecv.entity.file;

import java.io.Serializable;
import java.util.Date;
/**
 * @author 屈康
 * @company 中辰信
 * @Functional interpretation 用户登录
 * @create  2020-05-27 9:32
 */
public class SysUser{
    private Long userId;

    private String username;

    private String password;

    private String salt;

    private String email;

    private String mobile;

    private Byte status;

    private Long time;

    private Byte limit;

    private Long deptId;

    private Date createTime;

    public SysUser(Long userId, String username, String password, String salt, String email, String mobile, Byte status, Long time, Byte limit, Long deptId, Date createTime) {
        this.userId = userId;
        this.username = username;
        this.password = password;
        this.salt = salt;
        this.email = email;
        this.mobile = mobile;
        this.status = status;
        this.time = time;
        this.limit = limit;
        this.deptId = deptId;
        this.createTime = createTime;
    }

    public SysUser() {
        super();
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getSalt() {
        return salt;
    }

    public void setSalt(String salt) {
        this.salt = salt;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public Byte getStatus() {
        return status;
    }

    public void setStatus(Byte status) {
        this.status = status;
    }

    public Long getTime() {
        return time;
    }

    public void setTime(Long time) {
        this.time = time;
    }

    public Byte getLimit() {
        return limit;
    }

    public void setLimit(Byte limit) {
        this.limit = limit;
    }

    public Long getDeptId() {
        return deptId;
    }

    public void setDeptId(Long deptId) {
        this.deptId = deptId;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }
}