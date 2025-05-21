from decimal import Decimal
from datetime import datetime, date

def serialize_pg_result(data):
    def convert_value(v):
        if isinstance(v, Decimal):
            return float(v)
        if isinstance(v, (datetime, date)):
            return v.isoformat()
        return v
    
    def serialize_row(row):
        return {k: convert_value(v) for k, v in row.items()}
    
    if data is None:
        return None
    elif isinstance(data, list):
        return [serialize_row(row) for row in data]
    elif isinstance(data, dict):
        return serialize_row(data)
    else:
        raise TypeError('Expected dict, list[dict] or None')