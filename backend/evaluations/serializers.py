from rest_framework import serializers
from .models import Evaluation, SessionReport

class EvaluationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evaluation
        fields = '__all__'

class SessionReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = SessionReport
        fields = '__all__'
