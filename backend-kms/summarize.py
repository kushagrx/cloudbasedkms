import sys
import json
from transformers import pipeline

input_data = sys.stdin.read()
data = json.loads(input_data)
text = data.get("text", "")

summarizer = pipeline("summarization", model="sshleifer/distilbart-cnn-12-6")

summary = summarizer(text, max_length=100, min_length=30, do_sample=False)[0]["summary_text"]

print(json.dumps({"summary": summary}))