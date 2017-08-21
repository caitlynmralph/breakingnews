import json
import os
import csv
import numpy as np

os.chdir("/Applications/MAMP/htdocs/breakingnews/spreadsheets")

with open("charlottesville_alerts.json","r") as f:
    data_parsed = json.load(f)

data_tsv = open("/Applications/MAMP/htdocs/breakingnews/spreadsheets/charlottesville_alerts.tsv","w")

csvwriter = csv.writer(data_tsv, delimiter="|")

count = 0

for alert in data_parsed:
    if count == 0:
        header = alert.keys()
        csvwriter.writerow(header)
        count += 1
    csvwriter.writerow(alert.values())

data_tsv.close()