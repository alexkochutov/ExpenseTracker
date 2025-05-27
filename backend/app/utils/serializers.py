from decimal import Decimal
from datetime import datetime, date


def convert_value(value):
    if isinstance(value, Decimal):
        return float(value)
    if isinstance(value, (datetime, date)):
        return value.isoformat()
    return value


def serialize_row(row):
        return {k: convert_value(v) for k, v in row.items()}


def serialize_pg_result(data):
    if data is None:
        return None
    elif isinstance(data, dict):
        return serialize_row(data)
    elif isinstance(data, list):
        return [serialize_row(row) for row in data]
    else:
        raise TypeError('Expected dict, list[dict] or None')