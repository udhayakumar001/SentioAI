from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from .models import AnalysisHistory
from .services.sentiment import SentimentService

class AnalyzerTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_sentiment_service(self):
        """Test the underlying sentiment service directly."""
        text = "This is wonderfully fantastic and I am extremely happy."
        sentiment, confidence = SentimentService.analyze(text)
        self.assertEqual(sentiment, "Positive")
        
        text2 = "This is terrible and bad."
        sentiment2, confidence2 = SentimentService.analyze(text2)
        self.assertEqual(sentiment2, "Negative")

    def test_analyze_empty_input(self):
        """Test API handles empty input gracefully"""
        response = self.client.post(reverse('analyze-text'), {"text": "   "})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_analyze_input_success_db(self):
        """Test API creation logic skips ML to save time, but tests the DB creation"""
        # Testing full ML logic in basic unit config can be slow, but we'll submit small text
        # so summarizer doesn't do heavy work (summarizer skips text < 30 words).
        response = self.client.post(reverse('analyze-text'), {"text": "I really enjoy this product a lot."})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(AnalysisHistory.objects.count(), 1)
        self.assertEqual(response.data['sentiment'], 'Positive')
        self.assertTrue('summary' in response.data)
