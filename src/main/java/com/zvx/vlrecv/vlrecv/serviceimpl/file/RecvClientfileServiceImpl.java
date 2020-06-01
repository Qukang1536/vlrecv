package com.zvx.vlrecv.vlrecv.serviceimpl.file;

import com.zvx.vlrecv.vlrecv.dao.file.RecvClientfileMapper;
import com.zvx.vlrecv.vlrecv.entity.file.RecvClientfile;
import com.zvx.vlrecv.vlrecv.entity.file.RecvClientfileKey;
import com.zvx.vlrecv.vlrecv.service.file.RecvClientfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author 屈康
 * @company 中辰信
 * @Functional interpretation
 * @create  2020-05-29 9:31
 */
@Service
public class RecvClientfileServiceImpl implements RecvClientfileService {
    @Autowired
    private RecvClientfileMapper recvClientfileMapper;
    @Override
    public int deleteByPrimaryKey(RecvClientfileKey key) {
        return recvClientfileMapper.deleteByPrimaryKey(key);
    }

    @Override
    public int insert(RecvClientfile record) {
        return recvClientfileMapper.insert(record);
    }

    @Override
    public int insertSelective(RecvClientfile record) {
        return recvClientfileMapper.insertSelective(record);
    }

    @Override
    public RecvClientfile selectByPrimaryKey(RecvClientfileKey key) {
        return recvClientfileMapper.selectByPrimaryKey(key);
    }

    @Override
    public int updateByPrimaryKeySelective(RecvClientfile record) {
        return recvClientfileMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public int updateByPrimaryKey(RecvClientfile record) {
        return recvClientfileMapper.updateByPrimaryKey(record);
    }
}
