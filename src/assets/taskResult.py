if dic["task_type"] == "traceroute":
dic["result_url"] = DISPLAY_RESULT_WEBSITE + "ipv4_link?task=%s" % task['task_id'].replace("-", "_")
elif dic["task_type"] == "traceroute6":
dic["result_url"] = DISPLAY_RESULT_WEBSITE + "ipv6_link?task=%s" % task['task_id'].replace("-", "_")
elif dic["task_type"] == "mplstrace":
dic["result_url"] = DISPLAY_RESULT_WEBSITE + "mpls_link?task=%s" % task['task_id'].replace("-", "_")
elif dic["task_type"] == "mrinfo":
dic["result_url"] = DISPLAY_RESULT_WEBSITE + "mrinfo_link?task=%s" % task['task_id'].replace("-", "_")
elif dic["task_type"] == "pchar":
dic["result_url"] = DISPLAY_RESULT_WEBSITE + "pchar_link?task=%s" % task['task_id'].replace("-", "_")
elif dic["task_type"] == "parseconf":
dic["result_url"] = DISPLAY_RESULT_WEBSITE + "parsedConf_link?task=%s" % task['task_id'].replace("-", "_")
elif dic["task_type"] == "iffinder":
dic["result_url"] = DISPLAY_RESULT_WEBSITE + "iffinder_link?task=%s" % task['task_id'].replace("-", "_")
else:
dic["result_url"] = ""