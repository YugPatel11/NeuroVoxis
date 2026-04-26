from django.db import models
from django.contrib.auth.models import User

class JobRole(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True)
    icon = models.CharField(max_length=50, blank=True)

    def __str__(self):
        return self.name

class InterviewQuestion(models.Model):
    DIFFICULTY_CHOICES = [
        ('easy', 'Easy'),
        ('medium', 'Medium'),
        ('hard', 'Hard'),
    ]
    role = models.ForeignKey(JobRole, on_delete=models.CASCADE, related_name='questions')
    question_text = models.TextField()
    ideal_answer = models.TextField()
    difficulty = models.CharField(max_length=10, choices=DIFFICULTY_CHOICES, default='medium')
    order = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.role.name} - Q{self.order}: {self.question_text[:50]}..."

class InterviewSession(models.Model):
    STATUS_CHOICES = [
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('abandoned', 'Abandoned'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='sessions')
    role = models.ForeignKey(JobRole, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='in_progress')
    started_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.user.username} - {self.role.name} - {self.status}"

class InterviewResponse(models.Model):
    session = models.ForeignKey(InterviewSession, on_delete=models.CASCADE, related_name='responses')
    question = models.ForeignKey(InterviewQuestion, on_delete=models.CASCADE)
    video_file = models.FileField(upload_to='responses/combined/', null=True, blank=True)
    # Backend will split this later if needed
    audio_file = models.FileField(upload_to='responses/audio/', null=True, blank=True)
    visual_file = models.FileField(upload_to='responses/video/', null=True, blank=True)
    transcript = models.TextField(blank=True)
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Response to {self.question.question_text[:30]}..."
