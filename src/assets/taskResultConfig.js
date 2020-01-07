const inputsInfo = {
    "ipv4_link": {
        "sub_title":"IPv4 Links",
        "button_items": {
            "commit_url": "/celery/ipv4_db",
            "export_url": "/celery/ipv4_db"
          },
        "input_info":"ipv4_link",
        "front_radio": "no_require",
        "backward_radio": "export_radio",
        "table_head": "logicTopo_link"
    },
    "ipv6_link":{
        "sub_title":"IPv6 链接",
        "button_items": {
            "commit_url": "/website/ipv6_db",
            "export_url": "/website/ipv6_db"
        },
        "input_info":"ipv4_link",
        "front_radio": "no_require",
        "backward_radio": "export_radio",
        "table_head": "logicTopo_link"
    },
    "mpls_link":{
        "sub_title":"MPLS Links",
        "button_items": {
            "commit_url": "/website/mpls_db",
            "export_url": "/website/mpls_db"
        },
        "input_info":"ipv4_link",
        "front_radio": "no_require",
        "backward_radio": "export_radio",
        "table_head": "logicTopo_link"
    },
    "mrinfo_link":{
        "sub_title":"组播路由链接",
        "button_items": {
            "commit_url": "/website/mrinfo_db",
            "export_url": "/website/mrinfo_db"
        },
        "input_info":"ipv4_link",
        "front_radio": "no_require",
        "backward_radio": "export_radio",
        "table_head": "logicTopo_link"
    },
    "pchar_link":{
        "sub_title":"带宽链接",
        "button_items": {
            "commit_url": "/website/pchar_db",
            "export_url": "/website/pchar_db"
        },
        "input_info":"ipv4_link",
        "front_radio": "no_require",
        "backward_radio": "export_radio",
        "table_head": "logicTopo_link"
    },
    "parsedConf_link":{
        "sub_title":"路由器配置解析结果",
        "button_items": {
            "commit_url": "/website/parsedConf_db",
            "export_url": "/website/parsedConf_db"
        },
        "input_info":"ipv4_link",
        "front_radio": "no_require",
        "backward_radio": "export_radio",
        "table_head": "logicTopo_link"
    },
    "iffinder_link":{
        "sub_title":"Aliases",
        "button_items": {
            "commit_url": "/website/iffinder_db",
            "export_url": "/website/iffinder_db"
        },
        "input_info":"ipv4_link",
        "front_radio": "no_require",
        "backward_radio": "export_radio",
        "table_head": "logicTopo_link"
    }
  };
//   exports = inputsInfo;
  export default inputsInfo;