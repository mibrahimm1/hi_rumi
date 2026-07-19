import json
import os
import glob

chat_dir = r"d:\Personal Projects\hi_rumi\chat"
artifact_path = r"C:\Users\Ibrahim Shaikh\.gemini\antigravity\brain\e22cec7e-5fbb-4314-ab6f-4251713edca1\romantic_quotes.md"

files = glob.glob(os.path.join(chat_dir, "*.json"))

# Weighted keywords to identify deep, romantic, and meaningful messages
keyword_weights = {
    "love you": 5,
    "miss you": 4,
    "my world": 6,
    "my everything": 6,
    "always and forever": 6,
    "soulmate": 6,
    "mean to me": 5,
    "heart": 3,
    "forever": 4,
    "baby": 2,
    "beautiful": 3,
    "together": 3,
    "my life": 5,
    "adore": 4,
    "lucky to have": 5,
    "so much": 2,
    "dream": 2
}

candidates = []

for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        try:
            data = json.load(file)
            for m in data.get('messages', []):
                if m.get('sender_name', '').lower() == 'rumaisa':
                    content = m.get('content')
                    if content and isinstance(content, str):
                        # Decode Facebook's latin1 text to proper UTF-8 if needed
                        try:
                            content = content.encode('latin1').decode('utf-8')
                        except:
                            pass
                        
                        # Filter out messages that are too short or too long
                        if 30 < len(content) < 500:
                            content_lower = content.lower()
                            score = sum(weight for kw, weight in keyword_weights.items() if kw in content_lower)
                            
                            # Threshold for considering it highly romantic
                            if score >= 5:
                                candidates.append((score, len(content), content))
        except Exception as e:
            print(f"Error parsing {f}: {e}")

# Sort primarily by highest romantic score, secondarily by length to favor expressive messages
candidates.sort(key=lambda x: (x[0], x[1]), reverse=True)

# De-duplicate and select top 20
seen = set()
top_quotes = []
for score, length, content in candidates:
    if content not in seen:
        seen.add(content)
        top_quotes.append(content)
    if len(top_quotes) == 20:
        break

# Ensure the artifact directory exists
os.makedirs(os.path.dirname(artifact_path), exist_ok=True)

# Write the artifact
with open(artifact_path, 'w', encoding='utf-8') as f:
    f.write("# Romantic Quotes from Rumaisa\n\n")
    f.write("Here are 20 deeply romantic and meaningful quotes found in the chat exports. Please select your top 10 by checking the boxes below.\n\n")
    for quote in top_quotes:
        f.write(f"- [ ] {quote}\n")

print(f"Successfully generated artifact with {len(top_quotes)} quotes at:\n{artifact_path}")
