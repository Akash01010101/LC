const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const app = express();
app.use(express.json());
const dataPath = path.join(__dirname, 'data', 'books.json');

// Ensure data directory exists
if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'));
}
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, JSON.stringify([]), 'utf8');
}

const getBooksData = () => {
  const jsonData = fs.readFileSync(dataPath, 'utf8');
  return JSON.parse(jsonData);
};

const saveBooksData = (data) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
};

// GET /books - Get all books
app.get('/books', (req, res) => {
  try {
    const books = getBooksData();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving books', error: error.message });
  }
});

// POST /books Create a new book
app.post('/books', (req, res) => {
  try {
    const { title, author, price, publishedDate } = req.body;
    
    // Validate required fields
    if (!title || !author || !price) {
      return res.status(400).json({ message: 'Title, author, and price are required' });
    }
    
    const books = getBooksData();
    
    const newBook = {
      id: uuidv4(),
      title,
      author,
      price,
      publishedDate: publishedDate || new Date().toISOString().split('T')[0]
    };
    
    books.push(newBook);
    saveBooksData(books);
    
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: 'Error creating book', error: error.message });
  }
});


// PUT /books/:id 
app.put('/books/:id', (req, res) => {
  try {
    const { title, author, price, publishedDate } = req.body;
    const books = getBooksData();
    
    const index = books.findIndex(b => b.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ message: 'Book not found' });
    }
    books[index] = {
      ...books[index],
      title: title || books[index].title,
      author: author || books[index].author,
      price: price || books[index].price,
      publishedDate: publishedDate || books[index].publishedDate
    };
    saveBooksData(books);
    res.json(books[index]);
  } catch (error) {
    res.status(500).json({ message: 'Error updating book', error: error.message });
  }
});

// DELETE /books/:id Delete a book
app.delete('/books/:id', (req, res) => {
  try {
    const books = getBooksData();
    const filteredBooks = books.filter(b => b.id !== req.params.id);
    
    if (books.length === filteredBooks.length) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    saveBooksData(filteredBooks);
    
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting book', error: error.message });
  }
});

// Set port and start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});