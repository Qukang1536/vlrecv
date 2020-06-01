package com.zvx.vlrecv.vlrecv.dao.file;

import com.zvx.vlrecv.vlrecv.entity.file.SendPlan;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;
@Mapper
public interface SendPlanMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(SendPlan record);

    int insertSelective(SendPlan record);

    SendPlan selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(SendPlan record);

    int updateByPrimaryKeyWithBLOBs(SendPlan record);

    int updateByPrimaryKey(SendPlan record);

    List<SendPlan> SendPlanAll();
}