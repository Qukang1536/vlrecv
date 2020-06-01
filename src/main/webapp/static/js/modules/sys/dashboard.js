var vm = new Vue({
  el: '#rrapp',
  data() {
    return {
      data: {},
      usedmem: null,
      alldatatranssize: null,
      curdatatranssize: null,
      cpu_value: null,
      ram_value: null,
      disk_value: null,
    }
  },
  mounted() {
    // 显示器运行状态
    // this.shooting_time_charts();
    // cpu状态
    this.cpu_option();
    // 内存状态 
    this.ram_option();
    // 硬盘状态
    this.disk_option();
    window.setInterval(() => {
      setTimeout(getSysData(), 0)
    }, 5000);
  },
  created() {
    // 初始化前先get一次数据
    getSysData()
  },
  watch: {
    // 监听value值的变化并重新渲染
    cpu_value(val, oldVal) {
      this.cpu_option(val);
    },
    ram_value(val, oldVal) {
      this.ram_option(val);
    },
    disk_value(val, oldVal) {
      this.disk_option(val);
    },
  },
  methods: {
    // shooting_time_charts() {
    //   var shooting_time_charts = echarts.init(document.getElementById('shooting_time'));
    //   shooting_time = {
    //     //图标位置
    //     grid: {
    //       top: '0',
    //       right: '50',
    //       bottom: '0',
    //       left: '0',
    //       containLabel: true
    //     },
    //     // x 轴不显示
    //     xAxis: {
    //       show: false
    //     },
    //     // y 轴
    //     yAxis: [{
    //       axisTick: 'none',
    //       axisLine: 'none',
    //       offset: '0',
    //       axisLabel: {
    //         color: '#333',
    //         formatter: (value, index) => {
    //           return [
    //             '{title|' + value + '} '
    //           ]
    //         },
    //         rich: {
    //           title: {
    //             color: '#333',
    //           }
    //         }
    //       },
    //       data: ['待编码数据', '待显示图像'],
    //       inverse: true,
    //     }, {
    //       axisTick: 'none',
    //       axisLine: 'none',
    //       data: [],
    //       inverse: true,
    //     }],
    //     series: [{
    //       name: '总次数',
    //       type: 'bar',
    //       yAxisIndex: 0,
    //       data: [100, 100],
    //       barWidth: 10,
    //       label: {
    //         normal: {
    //           show: true,
    //           formatter: (value, index) => {
    //             return [
    //               '{title|' + value.value + '%' + '} '
    //             ]
    //           },
    //           rich: {

    //             title: {
    //               color: '#333',
    //               align: 'right',
    //             }
    //           },
    //           position: 'right'
    //         }
    //       },
    //       itemStyle: {
    //         normal: {
    //           barBorderRadius: 20,
    //           color: '#1089E7',
    //           opacity: 0.3
    //         }
    //       }
    //     }, {
    //       name: '次数占比',
    //       type: 'bar',
    //       yAxisIndex: 1,
    //       data: [0, 0],
    //       barWidth: 10,
    //       label: {
    //         normal: {
    //           show: true,
    //           position: 'right'
    //         }
    //       },
    //       itemStyle: {
    //         normal: {
    //           barBorderRadius: 20,
    //           color: '#1089E7'
    //         }
    //       }
    //     }, ]
    //   };
    //   shooting_time_charts.setOption(shooting_time);
    // },
    // CPU使用率
    cpu_option(value) {
      var cpu_option_charts = echarts.init(document.getElementById('cpu_option'));
      var cpu_option = {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },
        toolbox: {
          feature: {
            restore: {},
            saveAsImage: {}
          }
        },
        series: [{
          name: 'CPU使用率',
          type: 'gauge',
          detail: {
            formatter: '{value}%'
          },
          data: [{
            value: value,
            name: 'CPU使用率'
          }]
        }]
      };
      cpu_option_charts.setOption(cpu_option);
    },
    // 内存使用率
    ram_option(value) {
      var ram_option_charts = echarts.init(document.getElementById('ram_option'));
      var ram_option = {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },
        toolbox: {
          feature: {
            restore: {},
            saveAsImage: {}
          }
        },
        series: [{
          name: '内存已使用',
          type: 'gauge',
          detail: {
            formatter: '{value}%'
          },
          data: [{
            value: value,
            name: '内存已使用'
          }]
        }]
      }
      ram_option_charts.setOption(ram_option);
    },
    // 硬盘使用率
    disk_option(value) {
      var disk_option_charts = echarts.init(document.getElementById('disk_option'));
      var disk_option = {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },
        toolbox: {
          feature: {
            restore: {},
            saveAsImage: {}
          }
        },
        series: [{
          name: '硬盘已使用',
          type: 'gauge',
          detail: {
            formatter: '{value}%'
          },
          data: [{
            value: value,
            name: '硬盘已使用'
          }]
        }]
      };
      disk_option_charts.setOption(disk_option);
    }
  }
})

// 这里是近期使用状态，但接口没给出数据，暂时不放入图表
// var limit_send_charts = echarts.init(document.getElementById('limit_send'));
// var limit_send = {

//   grid: {
//     top: '20',
//     right: '0',
//     bottom: '0',
//     left: '0',
//     containLabel: true
//   },
//   xAxis: {
//     type: 'category',
//     data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
//   },
//   yAxis: {
//     type: 'value'
//   },
//   series: [{
//     data: [120, 932, 901, 334, 1290, 1330, 1320],
//     type: 'line',
//     itemStyle: {
//       normal: {  
//         label: {
//           show: true
//         }
//       }
//     }

//   }]
// };
// limit_send_charts.setOption(limit_send);

function change(limit) {
  var size = "";
  if (limit < 0.1 * 1024) { //小于0.1KB，则转化成B
    size = limit.toFixed(2) + "B"
  } else if (limit < 0.1 * 1024 * 1024) { //小于0.1MB，则转化成KB
    size = (limit / 1024).toFixed(2) + "KB"
  } else if (limit < 0.1 * 1024 * 1024 * 1024) { //小于0.1GB，则转化成MB
    size = (limit / (1024 * 1024)).toFixed(2) + "MB"
  } else { //其他转化成GB
    size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB"
  }
  var sizeStr = size + ""; //转成字符串
  var index = sizeStr.indexOf("."); //获取小数点处的索引
  var dou = sizeStr.substr(index + 1, 2) //获取小数点后两位的值
  if (dou == "00") { //判断后两位是否为00，如果是则删除00                
    return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
  }
  return size;
}

function getSysData() {
  $.ajax({
    type: "GET",
    url: "./sys/dev/queryGridList",
    success: function (r) {
      if (r.code === 0) {
        vm.data = r.data[0];
        vm.usedmem = Math.round((r.data[0].allmem / 100 * r.data[0].mem) * 10) / 10; // 换算硬盘使用数据 保留小数点一位
        vm.alldatatranssize = change(r.data[0].alldatatranssize) // 换算单位
        vm.curdatatranssize = change(r.data[0].curdatatranssize) // 换算单位
        vm.cpu_value = r.data[0].cpu;
        vm.ram_value = r.data[0].mem;
        vm.disk_value = r.data[0].disk;
      } else {
        alert(r.msg);
      }
    }
  });
}