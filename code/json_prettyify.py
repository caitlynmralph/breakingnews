import json
import os
import csv
import numpy as np

os.chdir("/Applications/MAMP/htdocs/breakingnews")

with open("events_100days.json","r") as f:
    data_parsed = json.load(f)

data_tsv = open("/Applications/MAMP/htdocs/breakingnews/events_100days.tsv","w")

csvwriter = csv.writer(data_tsv, delimiter="|")

count = 0

for event in data_parsed:
    if count == 0:
        header = event.keys()
        csvwriter.writerow(header)
        count += 1
    csvwriter.writerow(event.values())

data_tsv.close()