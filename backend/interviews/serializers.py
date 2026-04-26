from rest_framework import serializers
from .models import JobRole, InterviewQuestion, InterviewSession, InterviewResponse

class JobRoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobRole
        fields = '__all__'

class InterviewQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = InterviewQuestion
        fields = ['id', 'question_text', 'difficulty', 'order']

class InterviewResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = InterviewResponse
        fields = '__all__'

class InterviewSessionSerializer(serializers.ModelSerializer):
    role_name = serializers.CharField(source='role.name', read_only=True)
    responses = InterviewResponseSerializer(many=True, read_only=True)

    class Meta:
        model = InterviewSession
        fields = ['id', 'role', 'role_name', 'status', 'started_at', 'completed_at', 'responses']
        read_only_fields = ['status', 'started_at', 'completed_at']
