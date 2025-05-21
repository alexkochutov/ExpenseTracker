import psycopg2
from psycopg2.extras import RealDictCursor

def get_connection():
    return psycopg2.connect(
        dbname='expense_tracker',
        user='',
        password='',
        host='',
        port='5432',
        cursor_factory=RealDictCursor
    )