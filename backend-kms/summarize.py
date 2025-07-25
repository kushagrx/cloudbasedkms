import warnings
warnings.filterwarnings("ignore", category=FutureWarning)
from transformers import pipeline
import sys
import json

def chunk_text(text, chunk_size=900):
    return [text[i:i+chunk_size] for i in range(0, len(text), chunk_size)]

if len(sys.argv) > 1:
    with open(sys.argv[1], 'r', encoding='utf-8') as f:
        data = json.load(f)
else:
    input_data = sys.stdin.read()
    data = json.loads(input_data)

text = data.get("text", "")

if not text.strip():
    print(json.dumps({"summary": ""}))
    sys.exit(0)

summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

max_chunk = 900
if len(text) > max_chunk:
    chunks = chunk_text(text, max_chunk)
    summaries = []
    for chunk in chunks:
        s = summarizer(chunk, max_length=60, min_length=15, do_sample=False)[0]['summary_text']
        summaries.append(s)
    combined = " ".join(summaries)
    # Prompt the model to return bullet points
    bullet_prompt = f"Summarize the following as bullet points:\n{combined}"
    final_summary = summarizer(bullet_prompt, max_length=80, min_length=35, do_sample=False)[0]['summary_text']
    print(json.dumps({"summary": final_summary}))
else:
    # For short texts, use bullet prompt directly
    bullet_prompt = f"Summarize the following as bullet points:\n{text}"
    summary = summarizer(bullet_prompt, max_length=60, min_length=15, do_sample=False)[0]['summary_text']
    print(json.dumps({"summary": summary}))