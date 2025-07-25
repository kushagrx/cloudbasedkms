import sys
import json
from transformers import pipeline

import warnings
warnings.filterwarnings("ignore", category=FutureWarning)

input_data = sys.stdin.read()
data = json.loads(input_data)
text = data.get("text", "")

summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

summary = summarizer(
    text,
    max_length=35,
    min_length=8,
    do_sample=False
)[0]['summary_text']

print(json.dumps({"summary": summary}))