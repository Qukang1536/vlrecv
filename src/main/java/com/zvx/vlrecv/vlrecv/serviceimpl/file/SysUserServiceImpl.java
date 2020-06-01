package com.zvx.vlrecv.vlrecv.serviceimpl.file;

import com.zvx.vlrecv.vlrecv.dao.file.SysUserMapper;
import com.zvx.vlrecv.vlrecv.entity.file.SysUser;
import com.zvx.vlrecv.vlrecv.service.file.SysUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author 屈康
 * @company 中辰信
 * @Functional interpretation
 * @create  2020-05-27 9:33
 */
@Service
public class SysUserServiceImpl implements SysUserService {

    @Autowired
    SysUserMapper sysUserMapper;
    @Override
    public int deleteByPrimaryKey(Long userId) {
        return sysUserMapper.deleteByPrimaryKey(userId);
    }

    @Override
    public int insert(SysUser record) {
        return sysUserMapper.insert(record);
    }

    @Override
    public int insertSelective(SysUser record) {
        return sysUserMapper.insertSelective(record);
    }

    @Override
    public SysUser selectByPrimaryKey(Long userId) {
        return sysUserMapper.selectByPrimaryKey(userId);
    }

    @Override
    public int updateByPrimaryKeySelective(SysUser record) {
        return sysUserMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public int updateByPrimaryKey(SysUser record) {
        return sysUserMapper.updateByPrimaryKey(record);
    }

    @Override
    public SysUser SysUserLogin(String username, String password) {
        return sysUserMapper.SysUserLogin(username,password);
    }

    @Override
    public List<SysUser> UserAll() {
        return sysUserMapper.UserAll();
    }

}
