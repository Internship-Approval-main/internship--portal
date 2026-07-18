import os
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_chroma import Chroma

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
chroma_db_dir = os.path.join(SCRIPT_DIR, "chroma_db")

def create_vector_db():
    pdf_path = os.path.join(SCRIPT_DIR, "data", "Internship Guidelines (2024-2028).pdf")

    if not os.path.exists(pdf_path):
        print(f"Error: Could not find your PDF at '{pdf_path}'. Please check the folder or filename!")
        return

    print("Loading your 4-page Guidelines PDF...")
    loader = PyPDFLoader(pdf_path)
    documents = loader.load()
    print(f"Loaded {len(documents)} pages.")

    print("Splitting text into clean chunks...")
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=600,
        chunk_overlap=120
    )
    chunks = text_splitter.split_documents(documents)
    print(f"Created {len(chunks)} text chunks.")

    print("Generating local embeddings (HuggingFace)...")
    embedding_model = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

    print("Saving chunks into ChromaDB...")
    vector_db = Chroma.from_documents(
        documents=chunks,
        embedding=embedding_model,
        persist_directory=chroma_db_dir
    )

    print(f"Success! ChromaDB created at: {chroma_db_dir}")

    # Let's test it with a direct question from your document
    print("\n Running test query...")
    test_query = "I have a research internship from an NIT but it is unpaid ,am i still eligible for college credits?"
    results = vector_db.similarity_search(test_query, k=1)

    print("\n--- Closest Match Found in Database ---")
    print(results[0].page_content)
    print("---------------------------------------")

if __name__ == "__main__":
    create_vector_db()