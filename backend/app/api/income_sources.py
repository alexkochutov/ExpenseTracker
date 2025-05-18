income_sources = []

def get_sources():
    return 200, income_sources

def get_source_by_id(id):
    status, response = 404, {'error': 'Not found'}
    for item in income_sources:
        if item['id'] == int(id):
            status, response = 200, item
            break
    return status, response

def add_source(data):
    income_sources.append(data)
    return 201, data

def update_source(item_id, data):
    status, response = 404, {'error': 'Not found'}
    for item in income_sources:
        if item['id'] == int(item_id):
            item.update(data)
            status, response = 200, item
            break
    return status, response

def delete_source(item_id):
    status, response = 404, {'error': 'Not found'}
    for i, item in enumerate(income_sources):
        if item['id'] == int(item_id):
            income_sources.pop(i)
            status, response = 204, None
            break
    return status, response