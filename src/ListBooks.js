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
    read: [],
    none: []
  }
  componentDidMount = () => {
    BooksAPI.update({id:"bsId"},"none").then(data => {
      for (let [shelf, ids] of Object.entries(data)) {
        ids.map(id =>
          BooksAPI.get(id).then(data=> {
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

  _updateState = (bookId, toShelf, fromShelf) => {
    this.setState((state) => {
      let fromSdata = state[fromShelf]
      let toSdata = state[toShelf]
      let fromSnew = []
      let toSnew = []
      for (let l=0; l < fromSdata.length; l++) {
        let book = fromSdata[l]
        if (book.id === bookId) {
          if (toShelf !== 'none') toSnew = toSdata.concat(book)
          fromSnew = fromSdata.filter(b => b.id !== bookId)
          break
        }
      }
      let stateNew = {}
      stateNew[fromShelf] = fromSnew
      stateNew[toShelf] = toSnew
      return stateNew
    })
  }

  shelfSelect = (bookId, toShelf, fromShelf) => {
    this._updateState(bookId, toShelf, fromShelf)
    BooksAPI.update({id:bookId},toShelf)
      .then(r => console.log(r)) // comment out line when not debugging
      .catch(e => {
        console.log(`Error! Moving book ID {bookId} from {fromShelf} to {toShelf}.`)
        console.log(e)
        this._updateState(bookId, fromShelf, toShelf)
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
            shelf="currentlyReading"
            shelfSelect={this.shelfSelect}
          />
          <BookShelf
            title="Want to Read"
            books={wantToRead}
            shelf="wantToRead"
            shelfSelect={this.shelfSelect}
          />
          <BookShelf
            title="Read"
            books={read}
            shelf="read"
            shelfSelect={this.shelfSelect}
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
