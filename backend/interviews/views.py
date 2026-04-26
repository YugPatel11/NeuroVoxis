from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import JobRole, InterviewQuestion, InterviewSession, InterviewResponse
from .serializers import JobRoleSerializer, InterviewQuestionSerializer, InterviewSessionSerializer, InterviewResponseSerializer

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
        # multipart/form-data expected
        return super().create(request, *args, **kwargs)

class SessionDetailView(generics.RetrieveAPIView):
    queryset = InterviewSession.objects.all()
    serializer_class = InterviewSessionSerializer
    permission_classes = [permissions.IsAuthenticated]
    lookup_field = 'id'
