import sqlite3

# Connect database
conn = sqlite3.connect("crm.db", check_same_thread=False)

cursor = conn.cursor()

# Create table
cursor.execute("""
CREATE TABLE IF NOT EXISTS interactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    message TEXT
)
""")

conn.commit()