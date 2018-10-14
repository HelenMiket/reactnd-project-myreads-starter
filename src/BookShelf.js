import React from 'react'
import './App.css'
import PropTypes from 'prop-types';
import Book from './Book'

/*
** BookShelf component to display books in grid with BookShelf name if it is provided
*/
class BookShelf extends React.Component {
    static propTypes = {
        shelfName: PropTypes.string.isRequired,
        books: PropTypes.array.isRequired,
        onBookMoved: PropTypes.func.isRequired
    }

    render() {
        return (
            <div className="bookshelf">
                {this.props.shelfName !== "" && <h2 className="bookshelf-title">{this.props.shelfName}</h2>}
                <div className="bookshelf-books">
                    <ol className="books-grid">
                    {
                        this.props.books.map((book) => (
                            <li key={book.id}>
                                <Book book={book} onBookMoved={this.props.onBookMoved}/> 
                            </li>
                        ))
                    }
                    </ol>
                </div>
            </div>
              
        )
    }
}

export default BookShelf