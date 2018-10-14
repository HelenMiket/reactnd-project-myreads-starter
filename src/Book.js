import React from 'react'
import './App.css'
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI'

/*
** The book component showing the book cover along with its title and author(s), and a dropdown select control to
** move a book to a different shelf
*/
class Book extends React.Component {
    static propTypes = {
        book: PropTypes.object.isRequired,
        onBookMoved: PropTypes.func.isRequired
    }

    state = {
        value: "none" // default shelf
    }

    componentDidMount() {
        // Get the book shelf and set it to the select value
        if (this.props.book.shelf) {
            this.setState({value: this.props.book.shelf})
        } else {
            BooksAPI.get(this.props.book.id).then((data) => {
                this.setState({value: data.shelf})
            })
        }
    }

    changeBookShelf = (shelf) =>{
        this.setState({value: shelf})

        BooksAPI.update(this.props.book, shelf).then((res) => {
            this.props.onBookMoved(this.props.book, shelf)
        })
    }

    render() {
        const book = this.props.book;
        let authors = book.authors
        if (!authors) {
            authors = []
        }

        let coverUrl = '';
        if (book.imageLinks) {
            coverUrl = `url("` + book.imageLinks.thumbnail + `")`
        }
        
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: coverUrl }}></div>
                    <div className="book-shelf-changer">
                        <select onChange={(event) => this.changeBookShelf(event.target.value)} value={this.state.value}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{this.props.book.title}</div>
                <div className="book-authors">{authors}</div>
            </div>        
        )
    }
}

export default Book