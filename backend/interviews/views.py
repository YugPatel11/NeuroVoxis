from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import JobRole, InterviewQuestion, InterviewSession, InterviewResponse
from .serializers import (
    JobRoleSerializer, InterviewQuestionSerializer,
    InterviewSessionSerializer, InterviewResponseSerializer
)
import random
import time
from evaluations.models import Evaluation, SessionReport
from ai_services.feedback_service import FeedbackService
from ai_services.feedback_service import FeedbackService
from ai_services.pipeline import AIPipeline
from .serializers import InterviewSessionSerializer


class JobRoleListView(generics.ListAPIView):
    queryset = JobRole.objects.all()
    serializer_class = JobRoleSerializer
    permission_classes = [permissions.AllowAny]


class StartInterviewView(generics.CreateAPIView):
    serializer_class = InterviewSessionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        role_id = request.data.get('role_id')
        try:
            role = JobRole.objects.get(id=role_id)
        except JobRole.DoesNotExist:
            return Response({"error": "Role not found"}, status=status.HTTP_404_NOT_FOUND)

        session = InterviewSession.objects.create(user=request.user, role=role)
        questions = InterviewQuestion.objects.filter(role=role).order_by('order')

        return Response({
            "session": InterviewSessionSerializer(session).data,
            "questions": InterviewQuestionSerializer(questions, many=True).data
        }, status=status.HTTP_201_CREATED)


class SubmitResponseView(generics.CreateAPIView):
    serializer_class = InterviewResponseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        # response.data contains the serialized InterviewResponse
        response_id = response.data.get('id')
        
        if response_id:
            pipeline = AIPipeline()
            pipeline.process_response_async(response_id)
            
        return response


class SessionDetailView(generics.RetrieveAPIView):
    queryset = InterviewSession.objects.all()
    serializer_class = InterviewSessionSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'id'


class FinishInterviewView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        session_id = request.data.get('session_id')
        try:
            session = InterviewSession.objects.get(id=session_id, user=request.user)
        except InterviewSession.DoesNotExist:
            return Response({"error": "Session not found"}, status=status.HTTP_404_NOT_FOUND)

        session.status = 'completed'
        session.save()

        # Wait for background threads to finish processing evaluations (timeout after 60s)
        for _ in range(30):
            evals_count = Evaluation.objects.filter(response__session=session).count()
            responses_count = session.responses.count()
            if evals_count >= responses_count and responses_count > 0:
                break
            time.sleep(2)

        feedback_svc = FeedbackService()
        evaluations = list(Evaluation.objects.filter(response__session=session))

        if evaluations:
            final = round(sum(e.overall_score for e in evaluations) / len(evaluations), 2)
            ans_avg = round(sum(e.answer_score for e in evaluations) / len(evaluations), 2)
            conf_avg = round(sum(e.confidence_score for e in evaluations) / len(evaluations), 2)
            comm_avg = round(sum(e.communication_score for e in evaluations) / len(evaluations), 2)
            overall_fb = feedback_svc.generate(ans_avg, conf_avg, comm_avg, final)

            SessionReport.objects.update_or_create(
                session=session,
                defaults={
                    'final_score': final,
                    'answer_quality_avg': ans_avg,
                    'confidence_avg': conf_avg,
                    'communication_avg': comm_avg,
                    'overall_feedback': overall_fb['summary'],
                }
            )

            return Response({
                "report": {
                    "final_score": final,
                    "answer_quality_avg": ans_avg,
                    "confidence_avg": conf_avg,
                    "communication_avg": comm_avg,
                    "strengths": overall_fb['strengths'],
                    "weaknesses": overall_fb['weaknesses'],
                    "suggestions": overall_fb['suggestions'],
                    "summary": overall_fb['summary'],
                }
            }, status=status.HTTP_200_OK)

        return Response({"report": None, "message": "No responses found."}, status=status.HTTP_200_OK)

class UserInterviewHistoryView(generics.ListAPIView):
    serializer_class = InterviewSessionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return InterviewSession.objects.filter(user=self.request.user).order_by('-started_at')
