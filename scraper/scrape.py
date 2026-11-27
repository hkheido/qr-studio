import json
import datetime
import os
import requests

URL = "https://openapi.twse.com.tw/v1/exchangeReport/STOCK_DAY_ALL"

r = requests.get(URL, timeout=30)
r.raise_for_status()
rows = r.json()

# 只留前 20 筆，測試用
data = {
    "updated": datetime.datetime.utcnow().isoformat() + "Z",
    "count": len(rows),
    "rows": rows[:20],
}

os.makedirs("public/data", exist_ok=True)
with open("public/data/twse.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("done, rows:", len(rows))
