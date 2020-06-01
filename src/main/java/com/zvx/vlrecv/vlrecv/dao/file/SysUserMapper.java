package com.zvx.vlrecv.vlrecv.dao.file;

import com.zvx.vlrecv.vlrecv.entity.file.SysUser;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface SysUserMapper {
    int deleteByPrimaryKey(Long userId);

    int insert(SysUser record);

    int insertSelective(SysUser record);

    SysUser selectByPrimaryKey(Long userId);

    int updateByPrimaryKeySelective(SysUser record);

    int updateByPrimaryKey(SysUser record);

    SysUser SysUserLogin(String username,String password);

    List<SysUser> UserAll();
}