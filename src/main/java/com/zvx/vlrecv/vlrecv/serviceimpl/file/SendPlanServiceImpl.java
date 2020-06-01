package com.zvx.vlrecv.vlrecv.serviceimpl.file;

import com.zvx.vlrecv.vlrecv.dao.file.SendPlanMapper;
import com.zvx.vlrecv.vlrecv.entity.file.SendPlan;
import com.zvx.vlrecv.vlrecv.service.file.SendPlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author 屈康
 * @company 中辰信
 * @Functional interpretation
 * @create  2020-05-27 16:48
 */
@Service
public class SendPlanServiceImpl implements SendPlanService {
    @Autowired
    private SendPlanMapper sendPlanMapper;
    @Override
    public int deleteByPrimaryKey(Integer id) {
        return sendPlanMapper.deleteByPrimaryKey(id);
    }

    @Override
    public int insert(SendPlan record) {
        return sendPlanMapper.insert(record);
    }

    @Override
    public int insertSelective(SendPlan record) {
        return sendPlanMapper.insertSelective(record);
    }

    @Override
    public SendPlan selectByPrimaryKey(Integer id) {
        return sendPlanMapper.selectByPrimaryKey(id);
    }

    @Override
    public int updateByPrimaryKeySelective(SendPlan record) {
        return sendPlanMapper.updateByPrimaryKeySelective(record);
    }

    @Override
    public int updateByPrimaryKeyWithBLOBs(SendPlan record) {
        return sendPlanMapper.updateByPrimaryKeyWithBLOBs(record);
    }

    @Override
    public int updateByPrimaryKey(SendPlan record) {
        return sendPlanMapper.updateByPrimaryKey(record);
    }

    @Override
    public List<SendPlan> SendPlanAll() {
        return sendPlanMapper.SendPlanAll();
    }
}
