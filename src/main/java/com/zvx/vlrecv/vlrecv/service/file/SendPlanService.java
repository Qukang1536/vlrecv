package com.zvx.vlrecv.vlrecv.service.file;

import com.zvx.vlrecv.vlrecv.entity.file.SendPlan;

import java.util.List;

/**
 * @author 屈康
 * @company 中辰信
 * @Functional interpretation
 * @create  2020-05-27 16:46
 */
public interface SendPlanService {
    int deleteByPrimaryKey(Integer id);

    int insert(SendPlan record);

    int insertSelective(SendPlan record);

    SendPlan selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(SendPlan record);

    int updateByPrimaryKeyWithBLOBs(SendPlan record);

    int updateByPrimaryKey(SendPlan record);

    List<SendPlan> SendPlanAll();
}
