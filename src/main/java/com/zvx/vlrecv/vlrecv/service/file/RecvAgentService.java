package com.zvx.vlrecv.vlrecv.service.file;

import com.zvx.vlrecv.vlrecv.entity.file.RecvAgent;

import java.util.List;

/**
 * @author 屈康
 * @company 中辰信
 * @Functional interpretation
 * @create  2020-05-29 9:30
 */
public interface RecvAgentService {
    int deleteByPrimaryKey(Integer id);

    int insert(RecvAgent record);

    int insertSelective(RecvAgent record);

    RecvAgent selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(RecvAgent record);

    int updateByPrimaryKey(RecvAgent record);

    List<RecvAgent> RecvAll();
}
