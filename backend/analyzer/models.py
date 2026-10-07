from django.db import models

class AnalysisHistory(models.Model):
    original_text = models.TextField()
    sentiment = models.CharField(max_length=50)
    confidence = models.FloatField()
    summary = models.TextField()
    word_count = models.IntegerField()
    character_count = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.sentiment} - {self.word_count} words"

    class Meta:
        ordering = ['-created_at']
