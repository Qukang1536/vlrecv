package com.zvx.vlrecv.vlrecv.dao.file;

import com.zvx.vlrecv.vlrecv.entity.file.RecvClient;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface RecvClientMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(RecvClient record);

    int insertSelective(RecvClient record);

    RecvClient selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(RecvClient record);

    int updateByPrimaryKeyWithBLOBs(RecvClient record);

    int updateByPrimaryKey(RecvClient record);

    //查询所有客户端管理
    List<RecvClient> findAll();
}