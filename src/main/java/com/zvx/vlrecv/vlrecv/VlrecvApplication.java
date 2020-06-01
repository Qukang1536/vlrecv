package com.zvx.vlrecv.vlrecv;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
@MapperScan("com.zcx.vlrecv.dao")
public class VlrecvApplication  extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(VlrecvApplication.class, args);
    }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.sources(VlrecvApplication.class);
    }
}
