from django.contrib import admin
from .models import Evaluation, SessionReport

@admin.register(Evaluation)
class EvaluationAdmin(admin.ModelAdmin):
    list_display = ('response', 'overall_score', 'evaluated_at')

@admin.register(SessionReport)
class SessionReportAdmin(admin.ModelAdmin):
    list_display = ('session', 'final_score', 'generated_at')
