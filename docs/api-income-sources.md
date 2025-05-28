# API: income-sources

The **'/income-sources'** endpoint is used to create, update, and delete income source records.

### Get the list of all existing income sources.
- Method: GET
- Endpoint: /income-sources
- Response:
```JSON
  [
    {
      "id": 1,
      "name": "Company #1",
      "currency": "USD",
      "type": "Monthly payment",
      "start_date": "2024-06-01",
      "end_date": null,
      "description": "Simple description string"
    },
    {
      "id": 2,
      "name": "Customer #1",
      "currency": "USDT",
      "type": "Onetime payment",
      "start_date": "2025-01-10",
      "end_date": "2025-01-20",
      "description": "One time corporate system support contract"
    }
  ]
```
- Status:
```JSON
  200 OK
```

### Get the income source by ID.
- Method: GET
- Endpoint: /income-sources/{id}
- Response:
```JSON
  {
    "id": 1,
    "name": "Company #1",
    "currency": "USD",
    "type": "Monthly payment",
    "start_date": "2024-06-01",
    "end_date": null,
    "description": "Simple description string"
  }
```
- Status:
```JSON
  200 OK
```

### Create a new income source.
- Method: POST
- Endpoint: /income-sources
- Request
```JSON
  {
    "name": "Company #3",
    "currency": "USDT",
    "type": "Onetime payment",
    "start_date": "2025-01-10",
    "end_date": "2025-01-20",
    "description": "One time corporate system support contract"
  }
```
- Response:
```JSON
  {
    "id": 3,
    "name": "Company #3",
    "currency": "USDT",
    "type": "Onetime payment",
    "start_date": "2025-01-10",
    "end_date": "2025-01-20",
    "description": "One time corporate system support contract"
  }
```
  - Status:
```JSON
  201 Created
```

### Edit the income source.
- Method: PUT
- Endpoint: /income-sources/{id}
- Request
```JSON
  {
    "name": "New Company #1",
    "currency": "USD",
    "type": "Onetime payment",
    "start_date": "2025-05-01",
    "end_date": "2025-05-10",
    "description": "new description string"
  }
```
- Response:
```JSON
  {
    "id": 1,
    "name": "New Company #1",
    "currency": "USD",
    "type": "Onetime payment",
    "start_date": "2025-05-01",
    "end_date": "2025-05-10",
    "description": "new description string"
  }
```
- Status:
```JSON
  200 OK
```

### Delete the income source.
- Method: DELETE
- Endpoint: /income-sources/{id}
- Status:
```JSON
  204 No Content
```