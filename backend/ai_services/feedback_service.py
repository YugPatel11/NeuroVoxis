class FeedbackService:
    """Generates structured, qualitative feedback from evaluation scores."""

    def generate(self, answer_score, confidence_score, communication_score, overall_score):
        strengths = []
        weaknesses = []
        suggestions = []

        # --- Answer Quality ---
        if answer_score >= 80:
            strengths.append("Strong command of technical concepts in answers.")
        elif answer_score >= 60:
            weaknesses.append("Answers lacked depth on some topics.")
            suggestions.append("Study core concepts more thoroughly and use STAR method.")
        else:
            weaknesses.append("Answers were unclear or incorrect in key areas.")
            suggestions.append("Review fundamentals and practice structured responses.")

        # --- Confidence ---
        if confidence_score >= 80:
            strengths.append("Demonstrated high confidence and steady eye contact.")
        elif confidence_score >= 60:
            weaknesses.append("Some signs of nervousness detected (posture/gaze).")
            suggestions.append("Practice mock interviews to build confidence.")
        else:
            weaknesses.append("Low confidence levels detected. Poor eye contact and posture.")
            suggestions.append("Work on body language: sit upright and maintain eye contact.")

        # --- Communication ---
        if communication_score >= 80:
            strengths.append("Clear and fluent speech with good pacing.")
        elif communication_score >= 60:
            weaknesses.append("Speaking pace was inconsistent with occasional pauses.")
            suggestions.append("Practice speaking at a steady pace. Avoid filler words.")
        else:
            weaknesses.append("Significant speech issues: long pauses or unclear delivery.")
            suggestions.append("Record yourself speaking and review regularly for improvement.")

        # --- Overall summary ---
        if overall_score >= 85:
            summary = "Excellent performance! You are well-prepared for this role."
        elif overall_score >= 70:
            summary = "Good performance with some areas to refine before your real interview."
        elif overall_score >= 55:
            summary = "Average performance. Focus on the suggested improvements."
        else:
            summary = "Needs significant improvement. Keep practicing with the suggestions above."

        return {
            "strengths": strengths,
            "weaknesses": weaknesses,
            "suggestions": suggestions,
            "summary": summary,
        }
