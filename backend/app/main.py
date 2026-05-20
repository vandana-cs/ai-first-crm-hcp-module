from fastapi import FastAPI, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# DATABASE
conn = sqlite3.connect("crm.db", check_same_thread=False)

cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS interactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    doctor TEXT,
    message TEXT,
    response TEXT
)
""")

conn.commit()

# MODELS
class ChatRequest(BaseModel):
    message: str
    doctor: str
    tags: list[str]

# AI RESPONSE
def ai_reply(message):
    if "diabetes" in message.lower():
        return "AI Suggestion: Discussed diabetes treatment."

    if "insulin" in message.lower():
        return "AI Suggestion: Insulin therapy discussed."

    return "AI processed interaction successfully."

# CHAT API
@app.post("/chat")
def chat(req: ChatRequest, authorization: str = Header(None)):

    response = ai_reply(req.message)

    cursor.execute(
        """
        INSERT INTO interactions
        (doctor, message, response)
        VALUES (?, ?, ?)
        """,
        (req.doctor, req.message, response)
    )

    conn.commit()

    return {
        "response": response
    }

# GET HISTORY
@app.get("/interactions")
def get_interactions():

    cursor.execute("""
    SELECT * FROM interactions
    ORDER BY id DESC
    """)

    rows = cursor.fetchall()

    data = []

    for row in rows:
        data.append({
            "id": row[0],
            "doctor": row[1],
            "message": row[2],
            "response": row[3]
        })

    return data

# DELETE
@app.delete("/interactions/{id}")
def delete_interaction(id: int):

    cursor.execute(
        "DELETE FROM interactions WHERE id=?",
        (id,)
    )

    conn.commit()

    return {
        "message": "Deleted successfully"
    }