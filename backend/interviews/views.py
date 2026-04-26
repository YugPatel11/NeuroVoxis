from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import JobRole, InterviewQuestion, InterviewSession, InterviewResponse
from .serializers import (
    JobRoleSerializer, InterviewQuestionSerializer,
    InterviewSessionSerializer, InterviewResponseSerializer
)
import random
from evaluations.models import Evaluation, SessionReport
from ai_services.feedback_service import FeedbackService


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
        return super().create(request, *args, **kwargs)


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

        feedback_svc = FeedbackService()
        responses = session.responses.all()

        for response in responses:
            ans = random.uniform(55, 95)
            conf = random.uniform(55, 95)
            comm = random.uniform(55, 95)
            overall = round(ans * 0.3 + conf * 0.4 + comm * 0.3, 2)
            fb = feedback_svc.generate(ans, conf, comm, overall)

            Evaluation.objects.update_or_create(
                response=response,
                defaults={
                    'answer_score': round(ans, 2),
                    'confidence_score': round(conf, 2),
                    'communication_score': round(comm, 2),
                    'overall_score': overall,
                    'strengths': fb['strengths'],
                    'weaknesses': fb['weaknesses'],
                    'suggestions': fb['suggestions'],
                }
            )

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
