package com.zvx.vlrecv.vlrecv.util;

import java.io.Serializable;
import java.util.HashMap;

/**
 * 服务器返回给客户端的JSON格式的数据
 *
 */
public class JsonData extends HashMap<String, Object> implements Serializable {

	private static final long serialVersionUID = -8855960778711040221L;
	private int code;
	private String msg;
	private Object data;
	
	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

	public JsonData(int code, String msg, Object data) {
		super();
		this.put("code", code);
		this.put("msg", msg);
		this.put("data", data);
	}

	public JsonData() {
		super();
	}

}
