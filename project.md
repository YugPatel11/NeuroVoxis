NeuroVoxis

---

## 📌 Project Overview

The NeuroVoxis is an advanced application designed to simulate real-world interview scenarios and evaluate candidate performance using artificial intelligence.

The system allows users to select a job role, answer interview questions through video and audio, and receive detailed feedback based on their responses, behavior, and communication skills.

This project combines multiple AI domains including Natural Language Processing (NLP), Computer Vision, and Audio Processing to deliver a comprehensive interview analysis.

---

## 🎯 Objectives

- Simulate real interview environments using AI
- Evaluate candidate performance beyond basic Q&A
- Analyze both verbal and non-verbal communication
- Provide structured and actionable feedback
- Build a real-world AI system integrating multiple technologies

---

## 🧠 System Architecture

User (Video + Audio Input)
↓
Frontend Interface (React + Tailwind)
↓
Backend Server (Django REST API)
↓
| Speech-to-Text (Whisper) |
| NLP Analysis (Sentence Transformers) |
| Video Analysis (MediaPipe) |
| Audio Processing (Librosa) |
    ↓

Scoring Engine
↓
Final Score + Feedback Output


---

## 🛠️ Tech Stack

### Frontend
- React.js
- Tailwind CSS

### Backend
- Django (REST API)

### AI / ML Technologies
- Whisper (Speech-to-Text)
- Sentence Transformers (BERT-based NLP model)
- MediaPipe (Face, Hand, and Pose Detection)
- Librosa (Audio Feature Extraction)

### Database
- Use default Django DB (SQLite) for development; PostgreSQL for production level deployment.

---

## 📦 Core Features

### 1. Role-Based Interview Simulation
Users can select a specific job role such as Python Developer or HR, and the system dynamically loads relevant interview questions.

---

### 2. Speech-to-Text Conversion
User responses are captured through audio and converted into text using a speech recognition model.

---

### 3. Answer Evaluation (NLP)
The system evaluates the quality of answers by comparing them with ideal answers using semantic similarity techniques rather than simple keyword matching.

---

### 4. Video-Based Behavior Analysis
The system analyzes user video input to evaluate non-verbal communication, including:
- Eye contact
- Facial expressions
- Head movement
- Hand gestures
- Posture

---

### 5. Audio-Based Communication Analysis
Audio input is analyzed to extract communication features such as:
- Speaking speed (Words Per Minute)
- Pauses and hesitation
- Voice energy and stability

---

### 6. Intelligent Scoring System

The system generates a final score based on multiple factors:

- Answer Quality (30%)
- Confidence (40%)
- Communication Skills (30%)

---

### 7. Feedback Generation
The system provides structured feedback including:
- Strengths
- Weaknesses
- Suggestions for improvement

---

### 8. Result Dashboard
A detailed dashboard displays:
- Final score
- Section-wise breakdown
- Personalized feedback

---

## 📊 Dataset Strategy

### 1. Interview Questions Dataset
A custom dataset is created containing role-specific interview questions and ideal answers.

**Example Format:**
```json
{
  "role": "python_dev",
  "question": "What is Python?",
  "ideal_answer": "Python is a high-level programming language..."
}
```

### 2. NLP Dataset (Optional)

Semantic similarity datasets such as the STS Benchmark can be used to improve answer evaluation models.

### 3. Emotion Detection Dataset

The FER2013 dataset is used for facial expression recognition with pretrained models.

### 4. Audio Data

Audio data is captured in real-time from users; no external dataset is required.

---

## 🔍 Key Functional Components

- Multimodal data processing (text, audio, video)
- Semantic answer evaluation using embeddings
- Real-time face and pose tracking
- Audio signal analysis for communication metrics
- Score fusion from multiple inputs

---

## 🚀 Advanced Capabilities

- Real-time interview simulation
- Behavioral analysis using computer vision
- AI-driven feedback generation
- Scalable architecture for multiple roles
- Extensible system for future enhancements

---

## 🏆 Expected Output

The system generates a structured evaluation report.

**Example Output:**

**Score:** 87/100

**Breakdown:**
- Answer Quality: 82
- Confidence: 90
- Communication: 85

**Feedback:**
- Strong technical understanding
- Good eye contact
- Slight hesitation observed
- Maintain steady posture

---

## 🎯 Conclusion

This project demonstrates the integration of multiple AI technologies into a single intelligent system capable of analyzing human responses in an interview setting. It serves as a strong portfolio project showcasing skills in full-stack development, machine learning, and real-world problem solving.

---

## 📅 Implementation Plan

### Phase 1: Planning & Setup
- [x] Define precise product requirements and user stories.
- [x] Initialize Git repository and setup basic project structure.
- [x] Set up the Django backend environment with SQLite.
- [x] Initialize the React frontend with Tailwind CSS and Framer Motion.

### Phase 2: Core Infrastructure
- [x] Design API contracts.
- [x] Set up user authentication basics.
- [x] Create basic frontend layouts and UI components (Landing page styled).
- [x] Implement audio and video capture functionality using browser APIs.

### Phase 3: AI Model Integration
- [x] Integrate Whisper service for Speech-to-Text conversion.
- [x] Set up Sentence Transformers for NLP semantic similarity evaluation.
- [x] Implement MediaPipe for visual tracking (eye contact, posture).
- [x] Integrate Librosa for audio feature extraction (pitch, pauses).

### Phase 4: Scoring Engine
- [x] Develop the scoring algorithm to aggregate NLP, vision, and audio metrics.
- [x] Create logic for generating structured, qualitative feedback.
- [x] Finalize database schema to store interviews, scores, and feedback logs.

### Phase 5: Final UI & Dashboards
- [x] Develop the real-time interview simulation UI.
- [x] Build the post-interview result dashboard with detailed charts/breakdowns.
- [x] Refine the visual design to ensure a premium, modern user experience.

### Phase 6: Testing & Deployment
- [x] Perform integration testing across frontend, backend, and AI components.
- [x] Optimize AI model inference time and overall performance.
- [x] Deploy backend services (Render) and frontend (Vercel). ← See `DEPLOYMENT.md`