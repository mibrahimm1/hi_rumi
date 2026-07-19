import json
import os
import glob

chat_dir = r"d:\Personal Projects\hi_rumi\chat"

files = glob.glob(os.path.join(chat_dir, "*.json"))

# Let's extract 10 random messages from Ibrahim that have the word "heart", "love", "entire", etc.
# and show the message right after it (her reply).

results = []

for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        try:
            data = json.load(file)
            messages = data.get('messages', [])
            
            for i in range(len(messages) - 1):
                msg = messages[i]
                sender = msg.get('sender_name', '')
                
                # We iterate backwards through time, so messages[i] is newer than messages[i+1]
                # Wait, Facebook JSON usually has newest messages first.
                # So the message sent BEFORE msg is messages[i+1].
                # If Ibrahim sends a message, her reply is messages[i-1].
                
                if i > 0 and sender == 'Ibrahim Shaikh':
                    content = msg.get('content', '')
                    if content and isinstance(content, str):
                        try:
                            content = content.encode('latin1').decode('utf-8')
                        except:
                            pass
                            
                        content_lower = content.lower()
                        if any(kw in content_lower for kw in ['entire heart', 'i love you', 'my everything', 'reasons why', 'my world', 'intimate']):
                            
                            # Get her reply (messages[i-1] since it's newer)
                            reply_msg = messages[i-1]
                            reply_sender = reply_msg.get('sender_name', '')
                            if reply_sender.lower() == 'rumaisa':
                                reply_content = reply_msg.get('content', '')
                                if reply_content and isinstance(reply_content, str):
                                    try:
                                        reply_content = reply_content.encode('latin1').decode('utf-8')
                                    except:
                                        pass
                                    
                                    results.append({
                                        'ibrahim': content,
                                        'rumaisa_reply': reply_content
                                    })
        except Exception as e:
            pass

import random
sample = random.sample(results, min(10, len(results)))
for idx, res in enumerate(sample):
    print(f"--- Pair {idx+1} ---")
    print(f"Ibrahim: {res['ibrahim']}")
    print(f"Rumaisa: {res['rumaisa_reply']}\n")
