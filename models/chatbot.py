import random
from nltk.sentiment import SentimentIntensityAnalyzer
import nltk
nltk.download('vader_lexicon')

sia = SentimentIntensityAnalyzer()

def analyze_sentiment(message):
    scores = sia.polarity_scores(message)
    if scores['compound'] >= 0.05:
        return "positive"
    elif scores['compound'] <= -0.05:
        return "negative"
    else:
        return "neutral"

def get_response(user_message):
    sentiment = analyze_sentiment(user_message)
    if sentiment == "positive":
        responses = ["I'm glad you're feeling positive!", "That's great to hear!"]
    elif sentiment == "negative":
        responses = ["I'm here for you. What's on your mind?", "It’s okay to feel down sometimes."]
    else:
        responses = ["How can I assist you?", "Tell me more."]
    return random.choice(responses)
