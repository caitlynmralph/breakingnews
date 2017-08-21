import json
import os
import csv
import numpy as np

os.chdir("/Applications/MAMP/htdocs/breakingnews")

with open("alerts.json","r") as f:
    data_parsed = json.load(f)

data_tsv = open("/Applications/MAMP/htdocs/breakingnews/tag_counts_alerts.tsv","w")

csvwriter = csv.writer(data_tsv, delimiter="\t")

tags_list = []
tags = np.zeros([1,2])

count = 0

for alert in data_parsed:
    alert_tags = alert['tags']
    for tag in alert_tags:
        if tag in tags_list:
            for i in range(0,len(tags)):
                if tags[i:i+1,0:1] == tag:
                    tags[i:i+1,1:2] = int(tags[i:i+1,1:2][0][0]) + 1
        else:
            tags_list.append(tag)
            row = np.asarray([tag,1])
            row = np.reshape(row,[1,2])
            tags = np.append(tags,row, axis=0)

for row in tags:
    print(row)
    csvwriter.writerow(row)

data_tsv.close()