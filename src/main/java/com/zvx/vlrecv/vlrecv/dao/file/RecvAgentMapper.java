package com.zvx.vlrecv.vlrecv.dao.file;

import com.zvx.vlrecv.vlrecv.entity.file.RecvAgent;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface RecvAgentMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(RecvAgent record);

    int insertSelective(RecvAgent record);

    RecvAgent selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(RecvAgent record);

    int updateByPrimaryKey(RecvAgent record);

    List<RecvAgent> RecvAll();
}