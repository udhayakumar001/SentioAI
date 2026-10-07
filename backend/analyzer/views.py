from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Count
from .models import AnalysisHistory
from .serializers import AnalysisHistorySerializer
from .services.sentiment import SentimentService
from .services.summarizer import SummarizerService

class AnalysisListCreateView(generics.ListCreateAPIView):
    queryset = AnalysisHistory.objects.all()
    serializer_class = AnalysisHistorySerializer

class AnalysisDetailView(generics.RetrieveDestroyAPIView):
    queryset = AnalysisHistory.objects.all()
    serializer_class = AnalysisHistorySerializer

class AnalyzeTextView(APIView):
    def post(self, request):
        text = request.data.get('text', '').strip()
        
        if not text:
            return Response(
                {"error": "Text cannot be empty."}, 
                status=status.HTTP_400_BAD_REQUEST
            )
            
        if len(text) > 5000:
            return Response(
                {"error": "Text is too long. Maximum length is 5000 characters."}, 
                status=status.HTTP_400_BAD_REQUEST
            )
            
        word_count = len(text.split())
        character_count = len(text)
        
        try:
            # 1. Processing Sentiment
            sentiment, confidence = SentimentService.analyze(text)
            
            # 2. Processing Summarization
            summary = SummarizerService.summarize(text)
            
            # 3. Saving to Database
            analysis = AnalysisHistory.objects.create(
                original_text=text,
                sentiment=sentiment,
                confidence=confidence,
                summary=summary,
                word_count=word_count,
                character_count=character_count
            )
            
            serializer = AnalysisHistorySerializer(analysis)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
            
        except Exception as e:
            return Response(
                {"error": f"An error occurred during analysis: {str(e)}"}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
