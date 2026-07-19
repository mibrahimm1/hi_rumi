import json
import glob
import random

keywords = ["love", "safe space", "forever", "heart", "mine", "always", "protect", "cute", "clingy", "beautiful", "stars", "universe", "perfect", "lucky", "mera", "meri", "jaan", "pyaar", "best"]

quotes = []

for file in glob.glob("chat/*.json"):
    try:
        with open(file, 'r', encoding='utf-8') as f:
            data = json.load(f)
            if 'messages' in data:
                for msg in data['messages']:
                    if msg.get('sender_name') == 'rumaisa' and 'content' in msg:
                        content = msg['content'].lower()
                        if any(kw in content for kw in keywords) and len(content) > 15 and len(content) < 100:
                            quotes.append(msg['content'])
    except Exception as e:
        print(f"Error parsing {file}: {e}")

# Sample some quotes and print
print(f"Found {len(quotes)} potential quotes.")
selected = random.sample(quotes, min(50, len(quotes)))
for i, q in enumerate(selected):
    print(f"{i+1}. {q}")
