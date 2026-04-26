from sentence_transformers import SentenceTransformer, util

class NLPService:
    def __init__(self, model_name='all-MiniLM-L6-v2'):
        self.model = SentenceTransformer(model_name)

    def calculate_similarity(self, text1, text2):
        embeddings1 = self.model.encode(text1, convert_to_tensor=True)
        embeddings2 = self.model.encode(text2, convert_to_tensor=True)
        
        cosine_scores = util.cos_sim(embeddings1, embeddings2)
        return float(cosine_scores[0][0])

    def evaluate_answer(self, candidate_answer, ideal_answer):
        score = self.calculate_similarity(candidate_answer, ideal_answer)
        # Convert similarity score (0 to 1) to a percentage or 0-100 scale
        return round(score * 100, 2)
