from utils.serializers import serialize_pg_result
from db.db import get_connection

def get_sources():
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT id, name, currency, description, created_at 
                FROM public.income_source;
                """
            )
            result = serialize_pg_result(cur.fetchall())
    return 200, result

def get_source_by_id(id):
    status, response = 404, {'error': 'Not found'}
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT id, name, currency, description, created_at 
                FROM public.income_source 
                WHERE id = %s;
                """, 
                (id,)
            )
            result = serialize_pg_result(cur.fetchone())
    if result is not None:
        status, response = 200, result
    return status, response

def add_source(data):
    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO public.income_source (name, currency, description, created_at) 
                VALUES (%s, %s, %s, %s) 
                ON CONFLICT (id) DO NOTHING
                RETURNING *;
                """, 
                (data['name'], data['currency'], data['description'], data['createdAt'])
            )
            conn.commit()
            data = serialize_pg_result(cur.fetchone())
    if data is not None:
        return 201, data
    else:
        return 200, {'data': 'Already exists'}

def update_source(id, data):
    status, response = 404, {'error': 'Not found'}

    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                UPDATE public.income_source 
                SET 
                    name = %s, 
                    currency = %s, 
                    description = %s, 
                    created_at = %s 
                WHERE id = %s
                RETURNING *;
                """,
                (data['name'], data['currency'], data['description'], data['createdAt'], id)
            )
            conn.commit()
            updated = serialize_pg_result(cur.fetchone())
    
    if updated is not None:
        status, response = 200, updated
    return status, response

def delete_source(item_id):
    status, response = 404, {'error': 'Not found'}

    with get_connection() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                DELETE FROM public.income_source
                WHERE id = %s
                RETURNING *;
                """,
                (item_id,)
            )
            conn.commit()
            deleted = serialize_pg_result(cur.fetchone())
    
    if deleted is not None:
        status, response = 204, None
    return status, response