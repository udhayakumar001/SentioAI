from django.urls import path
from .views import AnalysisListCreateView, AnalysisDetailView, AnalyzeTextView

urlpatterns = [
    path('analyses/', AnalysisListCreateView.as_view(), name='analysis-list'),
    path('analyses/<int:pk>/', AnalysisDetailView.as_view(), name='analysis-detail'),
    path('analyze/', AnalyzeTextView.as_view(), name='analyze-text'),
]
