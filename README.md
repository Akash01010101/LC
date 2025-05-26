# Book Store REST API

A simple REST API for a Book Store with basic CRUD operations.

## Features

- Get all books
- Create a new book
- Update an existing book
- Delete a book
- Data persistence using JSON file

## Book Schema

- **id**: Unique identifier (auto-generated)
- **title**: Book title
- **author**: Book author
- **price**: Book price
- **publishedDate**: Date when the book was published

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /books | Get all books |
| POST | /books | Create a new book |
| GET | /books/:id | Get a specific book |
| PUT | /books/:id | Update a book |
| DELETE | /books/:id | Delete a book |

## Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the server:
   ```
   npm start
   ```
   For development with auto-restart:
   ```
   npm run dev
   ```

## API Usage

### Get all books
```
GET /books
```

### Create a new book
```
POST /books
Content-Type: application/json

{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "price": 12.99,
  "publishedDate": "1925-04-10"
}
```

### Get a specific book
```
GET /books/:id
```

### Update a book
```
PUT /books/:id
Content-Type: application/json

{
  "price": 14.99
}
```

### Delete a book
```
DELETE /books/:id
```

## Postman Collection

A Postman collection is included in the repository for testing the API. Import the `BookStore_API.postman_collection.json` file into Postman to use it.

## Data Storage

The API uses a JSON file (`data/books.json`) for data storage. The file is automatically created when the server starts if it doesn't exist.