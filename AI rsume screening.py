import os
import pdfplumber
from docx import Document
import nltk
import re
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

nltk.download('stopwords')
nltk.download('wordnet')

# Extract text from PDF
def extract_text_from_pdf(file_path):
    text = ""
    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            if page.extract_text():
                text += page.extract_text()
    return text

# Extract text from DOCX
def extract_text_from_docx(file_path):
    doc = Document(file_path)
    return "\n".join([para.text for para in doc.paragraphs])

# Clean text
def preprocess_text(text):
    text = text.lower()
    text = re.sub(r'[^a-zA-Z\s]', '', text)

    stop_words = set(stopwords.words('english'))
    words = text.split()
    words = [word for word in words if word not in stop_words]

    lemmatizer = WordNetLemmatizer()
    words = [lemmatizer.lemmatize(word) for word in words]

    return " ".join(words)

# Main ranking function
def rank_resumes(resume_folder, job_description):

    resume_texts = []
    resume_names = []

    for file in os.listdir(resume_folder):
        file_path = os.path.join(resume_folder, file)

        if file.endswith(".pdf"):
            text = extract_text_from_pdf(file_path)
        elif file.endswith(".docx"):
            text = extract_text_from_docx(file_path)
        else:
            continue

        cleaned_text = preprocess_text(text)
        resume_texts.append(cleaned_text)
        resume_names.append(file)

    cleaned_jd = preprocess_text(job_description)

    documents = resume_texts + [cleaned_jd]

    tfidf = TfidfVectorizer()
    tfidf_matrix = tfidf.fit_transform(documents)

    similarity_scores = cosine_similarity(tfidf_matrix[-1], tfidf_matrix[:-1])

    results = list(zip(resume_names, similarity_scores[0]))
    results = sorted(results, key=lambda x: x[1], reverse=True)

    return results

# ---------------- RUN PROGRAM ---------------- #

if __name__ == "__main__":

    job_description = """
    Looking for a Python c,c++ developer with experience in machine learning,
    data analysis,with know html and css with github .
    """

    resume_folder = "resumes"

    rankings = rank_resumes(resume_folder, job_description)

    print("\nResume Rankings:\n")
    for rank, (name, score) in enumerate(rankings, 1):
        print(f"{rank}. {name} - Match Score: {score:.4f}")
