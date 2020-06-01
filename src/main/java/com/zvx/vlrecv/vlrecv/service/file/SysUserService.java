package com.zvx.vlrecv.vlrecv.service.file;


import com.zvx.vlrecv.vlrecv.entity.file.SysUser;

import java.util.List;

/**
 * @author 屈康
 * @company 中辰信
 * @Functional interpretation 用户登录
 * @create  2020-05-27 9:32
 */
public interface SysUserService {
    int deleteByPrimaryKey(Long userId);

    int insert(SysUser record);

    int insertSelective(SysUser record);

    SysUser selectByPrimaryKey(Long userId);

    int updateByPrimaryKeySelective(SysUser record);

    int updateByPrimaryKey(SysUser record);

    SysUser SysUserLogin(String username,String password);

    List<SysUser> UserAll();
}
