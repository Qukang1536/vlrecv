package com.zvx.vlrecv.vlrecv.dao.file;

import com.zvx.vlrecv.vlrecv.entity.file.RecvClientfile;
import com.zvx.vlrecv.vlrecv.entity.file.RecvClientfileKey;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface RecvClientfileMapper {
    int deleteByPrimaryKey(RecvClientfileKey key);

    int insert(RecvClientfile record);

    int insertSelective(RecvClientfile record);

    RecvClientfile selectByPrimaryKey(RecvClientfileKey key);

    int updateByPrimaryKeySelective(RecvClientfile record);

    int updateByPrimaryKey(RecvClientfile record);
}