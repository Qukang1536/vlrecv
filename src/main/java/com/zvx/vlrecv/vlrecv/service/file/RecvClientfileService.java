package com.zvx.vlrecv.vlrecv.service.file;

import com.zvx.vlrecv.vlrecv.entity.file.RecvClientfile;
import com.zvx.vlrecv.vlrecv.entity.file.RecvClientfileKey;

/**
 * @author 屈康
 * @company 中辰信
 * @Functional interpretation
 * @create  2020-05-29 9:29
 */
public interface RecvClientfileService {
    int deleteByPrimaryKey(RecvClientfileKey key);

    int insert(RecvClientfile record);

    int insertSelective(RecvClientfile record);

    RecvClientfile selectByPrimaryKey(RecvClientfileKey key);

    int updateByPrimaryKeySelective(RecvClientfile record);

    int updateByPrimaryKey(RecvClientfile record);
}
