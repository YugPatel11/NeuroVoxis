from django.urls import path
from .views import JobRoleListView, StartInterviewView, SubmitResponseView, SessionDetailView, FinishInterviewView, UserInterviewHistoryView

urlpatterns = [
    path('roles/', JobRoleListView.as_view(), name='job_role_list'),
    path('start/', StartInterviewView.as_view(), name='start_interview'),
    path('respond/', SubmitResponseView.as_view(), name='submit_response'),
    path('session/<int:id>/', SessionDetailView.as_view(), name='session_detail'),
    path('finish/', FinishInterviewView.as_view(), name='finish_interview'),
    path('history/', UserInterviewHistoryView.as_view(), name='interview_history'),
]
