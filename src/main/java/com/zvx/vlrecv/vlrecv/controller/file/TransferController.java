package com.zvx.vlrecv.vlrecv.controller.file;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class TransferController {

  @RequestMapping(value = "/index")
  public String test() {
    return "index";
  }

  @RequestMapping(value = "/host")
  public String host() {
    return "host";
  }

  @RequestMapping(value = "/receiving")
  public String receiving() {
    return "receiving";
  }

  @RequestMapping(value = "/management")
  public String testF2F() {
    return "management";
  }


  @RequestMapping(value = "/user")
  public String user() {
    return "user";
  }
}