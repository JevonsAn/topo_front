function special_actionType_to_params(table, action, type, ip, out_ip){
  let params = {};
  if (table === "link_change"){
     params = {
      "action":"link_change",
      "type":  "node",
    };
    if (type.endsWith("edge") && action !== "router_node"){
      params["action"] = "link_change";
      params["type"] = "edge";
      params["out_ip"] = out_ip;
      params["in_ip"] = ip;
    }else{
      params["ip"] = ip;
    }
  } else if (table === "neighbor"){
    params = {
      "action": "ipv4",
      "type": "edge",
      "in_out_ip": ip
    };
    if (action === "ipv6")
      params["action"] = "ipv6";
  } else if (table === "3hops"){
    params = {
      "action": "3hops",
      "type": "ipv4",
      "ip": ip
    };
    if (action === "ipv6")
      params["type"] = "ipv6";
  } else if (table === "router_equal"){
    params = {
      "action": "router",
      "type": "node",
      "ip": ip
    };
  } else if (table === "pop_neighbor"){
    params = {
      "action": "pop",
      "type": "neighbor",
      "pop_id": ip
    };
  }
  return params;
}

const clickTables = {
  "link_change": {
    "title": "链路变化",
    "data_url": "/getLinkChange",
    "params": {
      "action":"link_change",
      "type": "node",
      "ip": ""
    },
    "head": [
      // {"title": "序号", "name": ""},
      {"title": "发现时间", "name": "timestamp"},
      {"title": "任务号", "name": "task_id"}
    ]
  },
  "neighbor":{
    "title": "邻居",
    "data_url": "/db",
    "params": {
      "action": "ipv4",
      "type": "edge",
      "in_out_ip": ""
    },
    "head": [
      {"title": "入IP","name": "in_ip","width": 150},
      {"title": "出IP","name": "out_ip","width": 150},
      {"title": "终端", "name": "is_dest", "width": 80 },
      {"title": "匿名跳数","name": "star", "width": 80 },
      {"title": "入自治域", "name": "in_asn"},
      {"title": "出自治域", "name": "out_asn"},
      {"title": "入国家","name": "in_country"},
      {"title": "出国家","name": "out_country"},
      {"title": "入城市","name": "in_city"},
      {"title": "出城市","name": "out_city"}
    ]
  },
  "3hops":{
    "title": "3Hops",
    "data_url": "/graph",
    "params": {
      "action": "3hops",
      "type": "ipv4",
      "ip": ""
    },
    "head": [
      {"title": "入IP","name": "in_ip","width": 150},
      {"title": "出IP","name": "out_ip","width": 150},
      {"title": "终端", "name": "is_dest", "width": 80 },
      {"title": "匿名跳数","name": "star", "width": 80 },
      {"title": "入自治域", "name": "in_asn"},
      {"title": "出自治域", "name": "out_asn"},
      {"title": "入国家","name": "in_country"},
      {"title": "出国家","name": "out_country"},
      {"title": "入城市","name": "in_city"},
      {"title": "出城市","name": "out_city"}
    ]
  },
  "router_equal":{
    "title": "路由接口合并节点",
    "data_url": "/db",
    "params": {
      "action": "",
      "type": "edge",
      "in_out_ip": ""
    },
    "head": [
      {"title": "经过接口归并发现可能是一个路由器的节点","name": "ip"},
      {"title": "判断依据","name": "reason"}
    ]
  },
  "pop_neighbor":{
    "title": "PoP邻居",
    "data_url": "/other",
    "params": {
      "action": "pop",
      "type": "neighbor",
      "ip": ""
    },
    "head": [
      {"title": "编号","name": "pop_id"},
      {"title": "位置","name": "geo"},
      {"title": "大小","name": "num"},
      {"title": "连接边数","name": "num2"}
    ]
  }
};

function clickPageTables(action, type){
  if (action === "ipv4"){
    if (type === "edge")
      return ["link_change"];
    else
      return ["link_change", "neighbor", "3hops"];
  }
  else if (action === "ipv6"){
    if (type === "edge")
      return [];
    else
      return ["neighbor", "3hops"];
  }
  else if (action === "router_link"){
    return ["link_change"];
  }
  else if (action === "router_node"){
    return ["link_change", "router_equal", "neighbor", "3hops"];
  }
  else if (action === "pop_topo_link"){
    return [];
  }
  else if (action === "pop_topo_node"){
    return ["pop_neighbor"];
  }
  else if (action === "national_gateway_edge"){
    return ["link_change"];
  }
  else if (action === "national_gateway_node"){
    return ["link_change", "neighbor", "3hops"];
  }
  return [];
}

exports.special_actionType_to_params = special_actionType_to_params;
exports.clickTables = clickTables;
exports.clickPageTables = clickPageTables;