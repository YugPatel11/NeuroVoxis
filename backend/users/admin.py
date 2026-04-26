from django.contrib import admin
from .models import UserProfile

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'target_role', 'total_interviews', 'average_score')
    search_fields = ('user__username', 'target_role')
