import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
//import PropTypes from 'prop-types';
//import escapeRegExp from 'escape-string-regexp';
//import sortBy from 'sort-by';

class ListBooks extends Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: []
  }
  componentDidMount = () => {
    const {update, get} = BooksAPI
    update({id:"bsId"},"none").then(data => {
      for (let [shelf, ids] of Object.entries(data)) {
        ids.map(id =>
          get(id).then(data=> {
            this.setState((state) => {
              let book = {
                id,
                title: data.title,
                authors: data.authors.join(" & "),
                url: `url("${data.imageLinks.thumbnail}'")`
              }
              return new(function () { this[shelf] = state[shelf].concat(book) })()
            })
          })
        )
      }
    })
  }

  render() {
    const {currentlyReading, read, wantToRead} = this.state
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <BookShelf
            title="Currently Reading"
            books={currentlyReading}
          />
          <BookShelf
            title="Want to Read"
            books={wantToRead}
          />
          <BookShelf
            title="Read"
            books={read}
          />
          </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}


export default ListBooks;
