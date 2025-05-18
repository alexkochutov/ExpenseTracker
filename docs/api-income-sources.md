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
      "description": "Monthly payment",
      "createdAt": "2025-03-24T12:00:00Z"
    },
    {
      "id": 2,
      "name": "Customer #1",
      "currency": "USDT",
      "description": "One-time payment",
      "createdAt": "2025-03-24T13:00:00Z"
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
    "currency": "USDT",
    "description": "Monthly payment",
    "createdAt": "2025-03-24T12:00:00Z"
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
    "currency": "EUR",
    "description": "Monthly payment"
  }
```
- Response:
```JSON
  {
    "id": 1,
    "name": "Company #1",
    "currency": "USDT",
    "description": "Monthly payment",
    "createdAt": "2025-03-24T12:00:00Z"
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
    "name": "New Company name",
    "currency": "EUR",
    "description": "Monthly payment"
  }
```
- Response:
```JSON
  {
    "id": 1,
    "name": "New Company name",
    "currency": "EUR",
    "description": "Monthly payment",
    "createdAt": "2025-03-24T12:00:00Z"
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