import React from 'react'
import './App.css'
import BookShelf from './BookShelf'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

/*
** The main page shows 3 shelves for books. 
** Each book is shown on the correct shelf, along with its title and author(s).
*/
class BookShelves extends React.Component {
    static propTypes = {
        readBooks: PropTypes.array.isRequired,
        readingBooks: PropTypes.array.isRequired,
        toReadBooks: PropTypes.array.isRequired,
        onBookMoved: PropTypes.func.isRequired
    }
    render() {
  
    return (
        <div className="book-shelves">
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <BookShelf books={this.props.readingBooks} shelfName="Currently Reading" onBookMoved={this.props.onBookMoved}/>
                        <BookShelf books={this.props.toReadBooks} shelfName="Want to Read" onBookMoved={this.props.onBookMoved}/>
                        <BookShelf books={this.props.readBooks} shelfName="Read" onBookMoved={this.props.onBookMoved}/>    
                    </div>
                </div>
                
                <div className="open-search">
                     <Link to="/search" className="open-search">Add a book</Link>
                </div>
            </div>
            )}
        </div>
        )
    }
}

export default BookShelves