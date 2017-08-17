import React, {Component} from 'react';
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import sortBy from 'sort-by'

class SearchBooks extends Component {
  state = {
    query: ''
  }

  goBack = (e) => {
    e.preventDefault()
    if (this.props.goBack) this.props.goBack()
  }

  updateQuery = (s) => {
    this.setState({query: s.trim()}, this.updateBooks);
  }

  updateBooks = () => {
    if (this.state.query.length <= 0) {
      this.props.updateSearchBooks([])
      return
    }
    BooksAPI.search(this.state.query, 100)
      .then(rs => {
        if (!Array.isArray(rs)) { // expect result array, error otherwise
          this.props.updateSearchBooks([])
          return
        }
        let books = rs.map(r => {
          let authors = r.authors ? r.authors.join(" & ") : r.publisher
          let image = r.imageLinks ? r.imageLinks.thumbnail :
            "https://dummyimage.com/128x193/000/fff.png&text=Image+Unavailable"
          return {
            id: r.id,
            title: r.title,
            authors: authors,
            url: `url("${image}")`,
            shelf: this.props.getShelf(r.id)
          }})
          this.props.updateSearchBooks(books.sort(sortBy('title')))
      })
      .catch(e => console.log(e))
  }
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" onClick={this.goBack}>Close</a>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(e) => this.updateQuery(e.target.value)}
              />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {this.props.books.map(book =>
            <li key={book.id}>
            <Book
              book={book}
              shelf={book.shelf}
              shelfSelect={this.props.shelfSelect}
            />
            </li>
          )}
          </ol>
        </div>
      </div>
    )
  }
}


export default SearchBooks;
