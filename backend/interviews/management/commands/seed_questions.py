from django.core.management.base import BaseCommand
from interviews.models import JobRole, InterviewQuestion

class Command(BaseCommand):
    help = 'Seed the database with sample job roles and interview questions'

    def handle(self, *args, **kwargs):
        roles_data = [
            {
                "name": "Python Developer",
                "slug": "python-developer",
                "description": "Technical interview for backend development using Python and Django.",
                "icon": "Code2",
                "questions": [
                    {
                        "text": "What are the key differences between Python 2 and Python 3?",
                        "answer": "Python 3 introduced several backward-incompatible changes like print as a function, integer division, and Unicode support.",
                        "difficulty": "easy",
                        "order": 1
                    },
                    {
                        "text": "Explain how memory management works in Python.",
                        "answer": "Python uses a private heap, reference counting, and a garbage collector to manage memory automatically.",
                        "difficulty": "medium",
                        "order": 2
                    },
                    {
                        "text": "What is a decorator in Python and how do you use it?",
                        "answer": "A decorator is a function that takes another function and extends its behavior without explicitly modifying it.",
                        "difficulty": "medium",
                        "order": 3
                    }
                ]
            },
            {
                "name": "Data Analyst",
                "slug": "data-analyst",
                "description": "Interview focusing on data processing, SQL, and statistical analysis.",
                "icon": "BarChart",
                "questions": [
                    {
                        "text": "What is the difference between a list and a tuple in Python?",
                        "answer": "Lists are mutable and tuples are immutable.",
                        "difficulty": "easy",
                        "order": 1
                    },
                    {
                        "text": "Explain the concept of P-value in statistics.",
                        "answer": "A P-value measures the probability that the observed results occurred by chance under the null hypothesis.",
                        "difficulty": "medium",
                        "order": 2
                    }
                ]
            },
            {
                "name": "HR Specialist",
                "slug": "hr-specialist",
                "description": "Soft skills and management focused interview.",
                "icon": "Users",
                "questions": [
                    {
                        "text": "How do you handle conflict in the workplace?",
                        "answer": "I believe in open communication, active listening, and finding a win-win resolution.",
                        "difficulty": "medium",
                        "order": 1
                    },
                    {
                        "text": "Describe your approach to employee performance reviews.",
                        "answer": "My approach is to provide constructive feedback, set clear goals, and focus on growth opportunities.",
                        "difficulty": "hard",
                        "order": 2
                    }
                ]
            }
        ]

        for r_data in roles_data:
            role, created = JobRole.objects.get_or_create(
                slug=r_data['slug'],
                defaults={
                    'name': r_data['name'],
                    'description': r_data['description'],
                    'icon': r_data['icon']
                }
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f"Created role: {role.name}"))
            
            for q_data in r_data['questions']:
                InterviewQuestion.objects.get_or_create(
                    role=role,
                    question_text=q_data['text'],
                    defaults={
                        'ideal_answer': q_data['answer'],
                        'difficulty': q_data['difficulty'],
                        'order': q_data['order']
                    }
                )
        
        self.stdout.write(self.style.SUCCESS("Successfully seeded database with roles and questions."))
