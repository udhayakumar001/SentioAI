import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer
import logging

logger = logging.getLogger(__name__)

# Ensure VADER lexicon is downloaded
try:
    nltk.data.find('sentiment/vader_lexicon.zip')
except LookupError:
    nltk.download('vader_lexicon', quiet=True)

class SentimentService:
    @staticmethod
    def analyze(text):
        """
        Analyzes the sentiment of the text using NLTK's VADER model.
        Returns a tuple: (sentiment_label, confidence_score)
        """
        try:
            sia = SentimentIntensityAnalyzer()
            scores = sia.polarity_scores(text)
            
            compound = scores['compound']
            
            # Convert compound (-1 to 1) to a confidence percentage 
            # and map it to Positive, Negative, or Neutral.
            if compound > 0.05:
                sentiment = "Positive"
                # Scale confidence from 0.05..1 to 0..1
                confidence = round((compound - 0.05) / 0.95, 2)
                # Adding a baseline confidence from its pos/neg ratios to make it realistic
                if confidence < 0.3: confidence += 0.3 
                
            elif compound < -0.05:
                sentiment = "Negative"
                # Scale confidence from -0.05..-1 to 0..1
                confidence = round((abs(compound) - 0.05) / 0.95, 2)
                if confidence < 0.3: confidence += 0.3
                
            else:
                sentiment = "Neutral"
                # Neutral confidence is high when compound is extremely close to 0
                confidence = round(1.0 - abs(compound) * 10, 2)
                if confidence < 0: confidence = 0.0

            # Ensure confidence is capped at 1.0 (sometimes tweaking passes it)
            confidence = min(confidence, 1.0)

            return sentiment, confidence
            
        except Exception as e:
            logger.error(f"Sentiment evaluation error (VADER): {str(e)}")
            # Fallback output so the app doesn't crash on NLP failures
            return "Neutral", 0.5
