# NeuroVoxis: Product Requirements & User Stories

## 1. Product Requirements

### 1.1 Core Requirements
- **Role Selection:** The system must provide predefined roles (e.g., Python Developer, HR, Product Manager) for users to select before starting an interview.
- **Multimodal Interview Interface:** The system must record user audio and video simultaneously during the interview session.
- **Dynamic Questioning:** Questions must be presented one at a time, based on the selected role.
- **Real-time Processing Simulation:** The interface should give real-time or near real-time feedback that recording is active and responses are being collected.

### 1.2 Technical Requirements
- **Audio Processing (Speech-to-Text):** The system must use Whisper (or similar STT model) to transcribe candidate responses accurately.
- **Natural Language Processing (NLP):** The system must use Sentence Transformers to evaluate the semantic similarity between the candidate's transcribed answer and the ideal answer.
- **Video Analysis (Computer Vision):** The system must use MediaPipe to track facial landmarks, eye contact, and head posture to gauge confidence.
- **Audio Feature Extraction:** The system must use Librosa to extract paralinguistic features (pitch stability, speaking rate, pauses) to evaluate communication skills.
- **Data Storage:** The system must store user profiles, interview session metadata, questions, and final scores/feedback in a relational database (SQLite for local, PostgreSQL for production).

## 2. User Stories

### 2.1 Candidate / User
- **As a candidate,** I want to select a specific job role so that I can practice relevant interview questions.
- **As a candidate,** I want the interface to cleanly display the current question and indicate that my camera and microphone are recording, so I know the system is capturing my response.
- **As a candidate,** I want to be able to finish a question and proceed to the next one manually, so I control the pace of the interview.
- **As a candidate,** I want to receive a comprehensive post-interview dashboard showing my overall score and a breakdown (Answer Quality, Confidence, Communication), so I understand my performance.
- **As a candidate,** I want specific, actionable feedback on my strengths and weaknesses (e.g., "Good eye contact," "Slight hesitation"), so I know exactly what to improve.

### 2.2 System / Admin
- **As an admin,** I want to be able to add new roles and specific questions with ideal answers into the database, so the platform can support new job categories.
- **As the system,** I must gracefully handle situations where the user's camera or microphone is unavailable and provide appropriate warnings.
- **As the system,** I must generate an aggregated final score (30% Answer Quality, 40% Confidence, 30% Communication) by fusing outputs from NLP, Vision, and Audio models.

## 3. Acceptance Criteria for Phase 1
- Backend and frontend repositories are initialized and structured.
- Django application has base apps created (`users`, `interviews`, `evaluations`) and configured for SQLite.
- React frontend is initialized with Vite and Tailwind CSS.
- Basic GitHub Actions CI/CD pipeline is implemented for linting and testing.
