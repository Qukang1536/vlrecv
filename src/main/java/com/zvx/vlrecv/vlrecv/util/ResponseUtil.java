package com.zvx.vlrecv.vlrecv.util;

import java.io.PrintWriter;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import com.alibaba.fastjson.JSON;


public class ResponseUtil {

	public static void write(HttpServletResponse response,Object o)throws Exception{
		response.setContentType("text/html;charset=utf-8");
		PrintWriter out=response.getWriter();
		out.println(o.toString());
		out.flush();
		out.close();
	}

	public static void writeJSON(HttpServletResponse response, Object o) throws Exception {
		write(response, JSON.toJSONString(o));
	}
}
