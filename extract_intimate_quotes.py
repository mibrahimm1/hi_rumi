import json
import os
import re

CHAT_DIR = r"d:\Personal Projects\hi_rumi\chat"
OUTPUT_FILE = r"C:\Users\Ibrahim Shaikh\.gemini\antigravity\brain\e22cec7e-5fbb-4314-ab6f-4251713edca1\romantic_quotes.md"

# Keywords that indicate deep emotional meaning
keywords = [
    "entire heart", "sweet boy", "let this", "love of my life", "my everything",
    "so deeply", "can't imagine", "so lucky", "mean the world", "beautiful soul",
    "marry you", "forever", "my person", "soulmate"
]

quotes = []

for filename in os.listdir(CHAT_DIR):
    if not filename.endswith(".json"):
        continue
    filepath = os.path.join(CHAT_DIR, filename)
    with open(filepath, 'r', encoding='utf-8') as f:
        try:
            data = json.load(f)
            messages = data.get('messages', [])
            for msg in messages:
                content = msg.get('content', '')
                sender = msg.get('sender_name', '')
                if not content or type(content) != str:
                    continue
                
                # Fix Facebook latin1 encoding
                try:
                    content = content.encode('latin1').decode('utf-8')
                except:
                    pass
                
                content_lower = content.lower()
                
                # Filter out generic or very short messages
                if len(content_lower) < 20 or content_lower.strip() == "i love you":
                    continue
                    
                # Score the message based on keyword presence and length
                score = 0
                for kw in keywords:
                    if kw in content_lower:
                        score += 5
                
                if score > 0 or len(content) > 150: # if it has keywords or is quite long
                    # Check if it has romantic words if it's just long
                    if "love" in content_lower or "heart" in content_lower or "care" in content_lower:
                        score += 1
                        
                if score > 0:
                    quotes.append({
                        "sender": sender,
                        "content": content,
                        "score": score + len(content)/100.0  # Tie-breaker using length
                    })
        except Exception as e:
            print(f"Error reading {filename}: {e}")

# Sort by score descending
quotes.sort(key=lambda x: x['score'], reverse=True)

# Select top 20
top_quotes = quotes[:20]

# Write to markdown artifact
os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
    f.write("# Top 20 Intimate Romantic Quotes\n\n")
    f.write("Select your top 10 quotes from the list below:\n\n")
    for q in top_quotes:
        sender_clean = "Ibrahim" if "ibrahim" in q['sender'].lower() else "Rumaisa"
        # Basic typo fixing (can be expanded)
        content_clean = q['content'].replace(" u ", " you ").replace(" ur ", " your ").replace("\n", " ")
        f.write(f"- [ ] **{sender_clean}**: \"{content_clean}\"\n")

print(f"Successfully wrote {len(top_quotes)} quotes to {OUTPUT_FILE}")
