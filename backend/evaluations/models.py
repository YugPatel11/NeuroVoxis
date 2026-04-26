from django.db import models
from interviews.models import InterviewSession, InterviewResponse

class Evaluation(models.Model):
    response = models.OneToOneField(InterviewResponse, on_delete=models.CASCADE, related_name='evaluation')
    answer_score = models.FloatField(default=0)      # NLP similarity (0-100)
    confidence_score = models.FloatField(default=0)  # Video analysis (0-100)
    communication_score = models.FloatField(default=0)  # Audio analysis (0-100)
    overall_score = models.FloatField(default=0)     # Weighted composite
    strengths = models.JSONField(default=list)
    weaknesses = models.JSONField(default=list)
    suggestions = models.JSONField(default=list)
    evaluated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Evaluation for {self.response.id}"

class SessionReport(models.Model):
    session = models.OneToOneField(InterviewSession, on_delete=models.CASCADE, related_name='report')
    final_score = models.FloatField(default=0)
    answer_quality_avg = models.FloatField(default=0)
    confidence_avg = models.FloatField(default=0)
    communication_avg = models.FloatField(default=0)
    overall_feedback = models.TextField(blank=True)
    generated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Report for {self.session.user.username}'s Session"
