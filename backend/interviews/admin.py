from django.contrib import admin
from .models import JobRole, InterviewQuestion, InterviewSession, InterviewResponse

@admin.register(JobRole)
class JobRoleAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(InterviewQuestion)
class InterviewQuestionAdmin(admin.ModelAdmin):
    list_display = ('question_text', 'role', 'difficulty', 'order')
    list_filter = ('role', 'difficulty')

@admin.register(InterviewSession)
class InterviewSessionAdmin(admin.ModelAdmin):
    list_display = ('user', 'role', 'status', 'started_at')
    list_filter = ('status', 'role')

@admin.register(InterviewResponse)
class InterviewResponseAdmin(admin.ModelAdmin):
    list_display = ('session', 'question', 'submitted_at')
