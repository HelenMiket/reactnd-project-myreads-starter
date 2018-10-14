import React from 'react'
import './App.css'
import BookShelves from './BookShelves';
import SearchBooks from './SearchBooks';
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  state = {
    readBooks: [],
    toReadBooks: [],
    readingBooks: []
  }

  componentDidMount() {
    // Retrieve the books read, want to read, or currently reading
    BooksAPI.getAll().then((books) => {
      let readBooks = []
      let readingBooks = []
      let toReadBooks = []

      books.forEach(book => {
        if (!book.authors) {
          book.authors = []
        }

        let coverUrl = ''
        if (book.imageLinks) {
          coverUrl = `url("` + book.imageLinks.thumbnail + `")`
        }
        book.coverUrl = coverUrl

        if (book.shelf === "currentlyReading") {
          readingBooks.push(book)
        }
        else if (book.shelf === "wantToRead") {
          toReadBooks.push(book)
        } else if (book.shelf === "read") {
          readBooks.push(book)
        }
      });
      
      this.setState({readBooks, readingBooks, toReadBooks});  
    })
  }

  // Move the book to the shelf
  moveBookToShelf = (book, shelf) => {
    book.shelf = shelf

    // Remove the book from the current shelf
    let readBooks = this.state.readBooks.filter((b) => b.id !== book.id)
    let readingBooks = this.state.readingBooks.filter((b) => b.id !== book.id)
    let toReadBooks = this.state.toReadBooks.filter((b) => b.id !== book.id)

    // Put the book to the new shelf
    if (shelf === "currentlyReading") {
      readingBooks.push(book)
    } else if (shelf === "read") {
      readBooks.push(book)
    } else if (shelf === "wantToRead") {
      toReadBooks.push(book)
    }

    this.setState({readBooks, readingBooks, toReadBooks});  
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BookShelves 
          readBooks={this.state.readBooks} 
          readingBooks={this.state.readingBooks}
          toReadBooks={this.state.toReadBooks}
          onBookMoved = {this.moveBookToShelf} 
          />
        )}/>

        <Route path="/search" render={() => (
          <SearchBooks 
            onBookMoved = {this.moveBookToShelf} 
          />
        )}/>
       </div>
    )
  }
}

export default BooksApp
