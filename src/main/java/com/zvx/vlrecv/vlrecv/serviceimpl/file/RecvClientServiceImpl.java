package com.zvx.vlrecv.vlrecv.serviceimpl.file;

import com.sun.org.apache.bcel.internal.generic.ARETURN;
import com.zvx.vlrecv.vlrecv.dao.file.RecvClientMapper;
import com.zvx.vlrecv.vlrecv.entity.file.RecvClient;
import com.zvx.vlrecv.vlrecv.service.file.RecvClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author 屈康
 * @company 中辰信
 * @Functional interpretation
 * @create  2020-05-29 9:30
 */
@Service
public class RecvClientServiceImpl implements RecvClientService {
    @Autowired
    private RecvClientMapper recvClientMapper;
    @Override
    public int deleteByPrimaryKey(Integer id) {
        return recvClientMapper.deleteByPrimaryKey(id);
    }

    @Override
    public int insert(RecvClient record) {
        return recvClientMapper.insert(record);
    }

    @Override
    public int insertSelective(RecvClient record) {
        return recvClientMapper.insertSelective(record);
    }

    @Override
    public RecvClient selectByPrimaryKey(Integer id) {
        return recvClientMapper.selectByPrimaryKey(id);
    }

    @Override
    public int updateByPrimaryKeySelective(RecvClient record) {
        return recvClientMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public int updateByPrimaryKeyWithBLOBs(RecvClient record) {
        return recvClientMapper.updateByPrimaryKeyWithBLOBs(record);
    }

    @Override
    public int updateByPrimaryKey(RecvClient record) {
        return recvClientMapper.updateByPrimaryKey(record);
    }

    /**
     * 查询所有客户端管理
     */
    @Override
    public List<RecvClient> findAll() {

        //查询所有客户端管理
        List<RecvClient> recvClientList = recvClientMapper.findAll();
        return recvClientList;
    }


}
