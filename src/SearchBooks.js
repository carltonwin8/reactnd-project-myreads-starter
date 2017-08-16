import React, {Component} from 'react';
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchBooks extends Component {
  state = {
    query: '',
    books: []
  }

  goBack = (e) => {
    e.preventDefault()
    if (this.props.goBack) this.props.goBack()
  }

  updateQuery = (s) => {
    console.log(s);
    this.setState({query: s.trim()}, this.updateBooks);
  }

  updateBooks = () => {
    if (this.state.query.length <= 0) {
      this.setState({books: []})
      return
    }
    BooksAPI.search(this.state.query,100)
      .then(rs => {
        let books = rs.map(r => {
          let authors = ''
          if (r.authors) authors = r.authors.join(" & ");
          else authors = r.publisher;
          return {
            id: r.id,
            title: r.title,
            authors: authors,
            url: `url("${r.imageLinks.thumbnail}'")`
          }})
          this.setState({books: books})
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
          {this.state.books.map(book =>
            <li key={book.id}>
            <Book
              book={book}
              shelf="None"
              shelfSelect={this.shelfSelect}
            />
            </li>
          )}
          </ol>
        </div>
        <p>{this.state.query}</p>
      </div>
    )
  }
}


export default SearchBooks;
