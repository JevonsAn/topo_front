const table_heads = {
  "ipv4_link": [
    {"title": "入IP", "name": "in_ip","width": 120, "sort": true },
    {"title":"出IP", "name": "out_ip", "width": 120, "sort": true },
    {"title":"匿名跳数", "name": "star", "width": 70 },
    {"title":"终端", "name": "is_dest", "width": 50 },
    {"title":"入IP域名", "name": "in_domain","width": 100 },
    {"title":"入IP Whois信息", "name": "in_whois","width": 120 },
    {"title":"出IP域名", "name": "out_domain","width": 100 },
    {"title":"出IP Whois信息", "name": "out_whois","width": 120 },
    {"title":"AS边界", "name": "is_as_boundary" },
    {"title":"入自治域", "name": "in_asn" },
    {"title":"出自治域", "name": "out_asn" },
    {"title":"国家边界", "name": "is_country_boundary" },
    {"title":"入IP所属国家城市", "name": "in_country","width": 100 },
    {"title":"出IP所属国家城市", "name": "out_country","width": 100 },
    {"title": "监测点", "name": "monitor", "width": 120 },
    {"title": "首次发现/最后发现时间", "name": "first_seen", "width": 200 },
  ],
  "ipv4_node":[
    { "title":"IP", "name": "ip", "width": 150, "sort": true },
    { "title":"路由器编号", "name": "rtr_id","width": 100 },
    { "title":"节点度", "name": "degree" },
    { "title":"POP", "name": "pop_id", "width": 120 },
    { "title":"国家", "name": "country" },
    { "title":"城市", "name": "city","width": 120 },
    { "title":"归属AS", "name": "asn" },
    { "title":"AS边界", "name": "is_as_boundary","width": 80 },
    { "title":"国家边界", "name": "is_country_boundary","width": 80 },
    { "title":"设备", "name": "device_info", "width": 150 },
    { "title":"域名", "name": "domain","width": 150 }
  ],
  "ipv6_link":[
    {"title":"入IP", "name": "in_ip", "width":300, "sort": true },
    {"title":"出IP", "name": "out_ip", "width":300, "sort": true},
    {"title":"匿名路由数量", "name": "star" },
    {"title":"终端", "name": "is_dest" },
    {"title":"AS边界", "name": "is_as_boundary" },
    {"title": "监测点", "name": "monitor" ,"width":300},
    {"title":"入自治域", "name": "in_asn" },
    {"title":"出自治域", "name": "out_asn" },
    {"title": "首次发现/最后发现时间", "name": "first_seen", "width": 200 },
  ],
  "ipv6_node":[
    { "title":"IP", "name": "ip", "width": 300, "sort": true  },
    { "title":"设备", "name": "device_info", "width": 150 },
    { "title":"域名", "name": "domain","width": 100 },
    { "title":"节点度", "name": "degree" },
    { "title":"POP", "name": "pop_id" },
    { "title":"国家", "name": "country" },
    { "title":"城市", "name": "city" },
    { "title":"归属AS", "name": "asn" },
    { "title":"AS边界", "name": "is_as_boundary","width": 80 },
    { "title":"国家边界", "name": "is_country_boundary","width": 80 }
  ],
  "logicTopo_link":[
    {"title": "入IP","name": "in_ip","width": 150, "sort": true },
    {"title": "出IP","name": "out_ip","width": 150, "sort": true },
    {"title": "带宽","name": "bandwidth"},
    {"title": "匿名跳数","name": "ttl","width": 100},
    {"title": "入IP域名","name": "in_domain","width": 150},
    {"title": "入IP Whois信息","name": "in_whois","width": 200},
    {"title": "出IP域名","name": "out_domain","width": 150},
    {"title": "出IP Whois信息","name": "out_whois","width": 200},
    {"title": "入IP所属国家城市","name": "in_country","width": 150},
    {"title": "出IP所属国家城市","name": "out_country","width": 150},
    {"title": "入IP经度","name": "in_longitude","width": 150},
    {"title": "入IP纬度","name": "in_latitude","width": 150},
    {"title": "出IP经度","name": "out_longitude","width": 150},
    {"title": "出IP纬度","name": "out_latitude","width": 150},
    {"title": "监测点","name": "monitor", "width": 150},
    {"title": "首次发现/最后发现时间", "name": "first_seen", "width": 200 },
  ],
  "logicTopo_node":[
    { "title":"IP", "name": "ip", "width": 150, "sort": true },
    { "title":"节点度", "name": "degree" },
    { "title":"国家", "name": "country" },
    { "title":"城市", "name": "city","width": 120 },
    { "title":"归属AS", "name": "asn" },
    { "title":"AS边界", "name": "is_as_boundary","width": 80 },
    { "title":"国家边界", "name": "is_country_boundary","width": 80 },
    { "title":"设备", "name": "device_info", "width": 150 },
    { "title":"域名", "name": "domain","width": 150 }
  ],
  "pop_link":[ 
    {"title": "入接口pop_id","name": "in_pop_id", "sort": true  },
    {"title": "出接口pop_id","name": "out_pop_id", "sort": true  },
    {"title": "边数","name": "num" } 
  ],
  "pop_node":[
    {"title": "编号","name": "pop_id", "sort": true  },
    {"title": "位置","name": "geo" }, 
    {"title": "大小","name": "num" } 
  ],
  "nationalGateway_link":[
    {"title": "入IP","name": "in_ip","width": 150, "sort": true  },
    {"title": "出IP","name": "out_ip","width": 150, "sort": true  },
    {"title": "带宽","name": "bandwidth" }, 
    {"title": "匿名跳数","name": "ttl","width": 100 }, 
    {"title": "入IP域名","name": "in_domain","width": 150 }, 
    {"title": "入IP Whois信息","name": "in_whois","width": 200 }, 
    {"title": "出IP域名","name": "out_domain","width": 150 }, 
    {"title": "出IP Whois信息","name": "out_whois","width": 200 }, 
    {"title": "入IP所属国家城市","name": "in_country","width": 150 }, 
    {"title": "出IP所属国家城市","name": "out_country","width": 150 }, 
    {"title": "入IP经度","name": "in_longitude","width": 150 }, 
    {"title": "入IP纬度","name": "in_latitude","width": 150 }, 
    {"title": "出IP经度","name": "out_longitude","width": 150 }, 
    {"title": "出IP纬度","name": "out_latitude","width": 150 }, 
    {"title": "监测点","name": "monitor", "width": 150},
    {"title": "首次发现/最后发现时间", "name": "first_seen", "width": 200 },
  ],
  "nationalGateway_node":[
    {"title": "IP","name": "ip","width": 150, "sort": true  },
    {"title": "设备","name": "device_info","width": 200 }, 
    {"title": "域名","name": "domain","width": 200 }, 
    {"title": "节点度","name": "degree","width": 80 },
    {"title": "POP","name": "pop_id","width": 150 }, 
    {"title": "国家","name": "country" }, 
    {"title": "城市","name": "city" }, 
    {"title": "经度","name": "longitude" }, 
    {"title": "纬度","name": "latitude" }, 
    {"title": "归属AS","name": "asn" }, 
    {"title": "AS边界","name": "is_as_boundary","width": 50 } 
  ],
  "cable_link":[
    { "name": "landing_point_in","title":"入口" },
    { "name": "landing_point_out","title":"出口" },
    { "name": "medium","title":"介质" },
    { "name": "cable","title":"光缆" },
    { "name": "in_country","title":"入国家" },
    { "name": "out_country","title":"出国家" },
    { "name": "in_latlng","title":"入坐标" },
    { "name": "out_latlng","title":"出坐标" },
    { "name": "cable_rfs","title":"光缆服务时间" },
    { "name": "cable_len","title":"光缆长度" },
    { "name": "cable_url","title":"光缆网址" },
    { "name": "update_time","title":"更新时间" }
  ],
  "cable_node":[
    // { "title": "详细信息", "name": "cable_node_pre", "width": "70px" },
    { "title": "名称", "name": "name" }, 
    { "title": "长度", "name": "length" }, 
    { "title": "服务时间", "name": "rfs" }, 
    { "title": "官网", "name": "url"}
  ]
};
exports.table_heads = table_heads;