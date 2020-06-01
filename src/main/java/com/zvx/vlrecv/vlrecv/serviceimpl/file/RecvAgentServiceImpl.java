package com.zvx.vlrecv.vlrecv.serviceimpl.file;

import com.zvx.vlrecv.vlrecv.dao.file.RecvAgentMapper;
import com.zvx.vlrecv.vlrecv.entity.file.RecvAgent;
import com.zvx.vlrecv.vlrecv.service.file.RecvAgentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author 屈康
 * @company 中辰信
 * @Functional interpretation
 * @create  2020-05-29 9:31
 */
@Service
public class RecvAgentServiceImpl implements RecvAgentService {
    @Autowired
    private RecvAgentMapper recvAgentMapper;
    @Override
    public int deleteByPrimaryKey(Integer id) {
        return recvAgentMapper.deleteByPrimaryKey(id);
    }

    @Override
    public int insert(RecvAgent record) {
        return recvAgentMapper.insert(record);
    }

    @Override
    public int insertSelective(RecvAgent record) {
        return recvAgentMapper.insertSelective(record);
    }

    @Override
    public RecvAgent selectByPrimaryKey(Integer id) {
        return recvAgentMapper.selectByPrimaryKey(id);
    }

    @Override
    public int updateByPrimaryKeySelective(RecvAgent record) {
        return recvAgentMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public int updateByPrimaryKey(RecvAgent record) {
        return recvAgentMapper.updateByPrimaryKey(record);
    }

    @Override
    public List<RecvAgent> RecvAll() {
        return recvAgentMapper.RecvAll();
    }
}
