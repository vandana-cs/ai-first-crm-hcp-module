from app.database.db import conn

cursor = conn.cursor()


def log_interaction(message):

    cursor.execute(
        "INSERT INTO interactions (message) VALUES (?)",
        (message,)
    )

    conn.commit()

    return f"Interaction saved: {message}"


def get_interactions():

    cursor.execute(
        "SELECT message FROM interactions"
    )

    rows = cursor.fetchall()

    return [row[0] for row in rows]