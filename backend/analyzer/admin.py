from django.contrib import admin
from .models import AnalysisHistory

@admin.register(AnalysisHistory)
class AnalysisHistoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'sentiment', 'confidence', 'word_count', 'created_at')
    list_filter = ('sentiment', 'created_at')
    search_fields = ('original_text', 'summary')
    readonly_fields = ('created_at',)
