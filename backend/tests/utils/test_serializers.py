import pytest

from datetime import datetime, date
from decimal import Decimal
from contextlib import nullcontext as do_not_raise
from app.utils.serializers import *

DICT_ROW = {
    'decimal': Decimal(10),
    'datetime': datetime(2025, 1, 1, 12, 0, 0),
    'date': date(2025, 1, 1),
    'integer': 10,
    'float': 10.0,
    'string': 'string',
    'boolean': True,
    'none': None
}

DICT_SERIALIZED = {
    'decimal': 10.0,
    'datetime': '2025-01-01T12:00:00',
    'date': '2025-01-01',
    'integer': 10,
    'float': 10.0,
    'string': 'string',
    'boolean': True,
    'none': None
}


class TestSerializers:
    @pytest.mark.parametrize("value, expected", [
        (Decimal(10), 10.0),
        (datetime(2025, 1, 1, 12, 0, 0), '2025-01-01T12:00:00'),
        (date(2025, 1, 1), '2025-01-01'),
        (int(10), 10),
        (float(10.0), 10.0),
        ('string', 'string'),
        (True, True),
        (None, None)
    ])
    def test_convert_value(self, value, expected):
        assert convert_value(value) == expected

    @pytest.mark.parametrize("value, expected", [
        (DICT_ROW, DICT_SERIALIZED)
    ])
    def test_serialize_row(self, value, expected):
        assert serialize_row(value) == expected


    @pytest.mark.parametrize("data, expected, expectation", [
            (None, None, do_not_raise()),
            (DICT_ROW, DICT_SERIALIZED, do_not_raise()),
            ([DICT_ROW, DICT_ROW], [DICT_SERIALIZED, DICT_SERIALIZED], do_not_raise()),
            (int(10), None, pytest.raises(TypeError)),
            (float(10), None, pytest.raises(TypeError)),
            ("Test string", None, pytest.raises(TypeError)),
            (True, None, pytest.raises(TypeError)),
            (tuple(), None, pytest.raises(TypeError)),
            (set(), None, pytest.raises(TypeError)),
        ])
    def test_serialize_pg_result(self, data, expected, expectation):
        with expectation:
            assert serialize_pg_result(data) == expected