import React, {Component} from 'react'
import PropTypes from 'prop-types';
import sortBy from 'sort-by';
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf';
import { throttle } from "throttle-debounce";

/*
** The search page with a search input field and books that match the query as the user types into the search field. 
** Each book is shown with its title and author(s), along with the correct shelf selected in the shelf control.
*/
class SearchBooks extends Component {
    static propTypes = {
        onBookMoved: PropTypes.func.isRequired
    }

    state = {
        query: '',
        results: []
    }

    updateQuery = (query) => {
        const trimedQuery = query.trim()
        if (trimedQuery) {
            this.setState({query})

            BooksAPI.search(trimedQuery).then((results) => {
                this.setState({results});  
            }).catch((error)=>{
                // Handle invalid queries
                this.setState({results: []});
            })
        }
        else {
            this.setState({query: '', results: []});
        }
    }

    render() {
        let {query, results} = this.state

        // Sort the books by title
        if (results && results.length > 1) {
            results.sort(sortBy('title'))
        }

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                         {
                             /*
                                NOTES: The search from BooksAPI is limited to a particular set of search terms.
                                You can find these search terms here:
                                https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                                 However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                                you don't find a specific author or title. Every search is limited by search terms.
                            */
                        }
                        
                        <input type="text" 
                            placeholder="Search by title or author"
                            value={this.state.query}
                            onChange={throttle(500, (event) => this.updateQuery(event.target.value))}
                        />
                    </div>
                </div>

                {   query !== '' && results && results !== null && results.length > 0 && (
                        <div className="search-books-results">
                            <BookShelf books={results} shelfName="" onBookMoved={this.props.onBookMoved}/>
                        </div>
                    )
                }
                
            </div>
        )
    }
}

export default SearchBooks