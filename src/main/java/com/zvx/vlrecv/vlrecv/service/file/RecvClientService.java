package com.zvx.vlrecv.vlrecv.service.file;

import com.zvx.vlrecv.vlrecv.entity.file.RecvClient;

import java.util.List;

/**
 * @author 屈康
 * @company 中辰信
 * @Functional interpretation
 * @create  2020-05-29 9:29
 */
public interface RecvClientService {

    int deleteByPrimaryKey(Integer id);

    int insert(RecvClient record);

    int insertSelective(RecvClient record);

    RecvClient selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(RecvClient record);

    int updateByPrimaryKeyWithBLOBs(RecvClient record);

    int updateByPrimaryKey(RecvClient record);

    /**
     * 查询所有客户端管理
     */
    List<RecvClient> findAll();
}
