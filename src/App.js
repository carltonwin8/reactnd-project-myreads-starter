import React from 'react'
import {Route} from 'react-router-dom'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI'
import sortBy from 'sort-by'
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
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
            let book = {
              id,
              title: data.title,
              authors: data.authors.join(" & "),
              url: `url("${data.imageLinks.thumbnail}'")`
            }
            this.setState((state) => {
              let books = state[shelf].concat(book)
              books.sort(sortBy('title'))
              return new(function () { this[shelf] = books })()
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
      stateNew[fromShelf] = fromSnew.sort(sortBy('title'))
      stateNew[toShelf] = toSnew.sort(sortBy('title'))
      return stateNew
    })
  }

  shelfSelect = (bookId, toShelf, fromShelf) => {
    this._updateState(bookId, toShelf, fromShelf)
    BooksAPI.update({id:bookId},toShelf)
      //.then(r => console.log(r)) // comment out line when not debugging
      .catch(e => {
        console.log(`Error! Moving book ID {bookId} from {fromShelf} to {toShelf}.`)
        console.log(e)
        this._updateState(bookId, fromShelf, toShelf)
      })
  }


  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks
            books={this.state}
            shelfSelect={this.shelfSelect}
            />
        )}/>
        <Route path="/search" render={({history}) => (
           <SearchBooks
             books={this.state}
             shelfSelect={this.shelfSelect}
             goBack={() => history.push('/')}
           />
         )}/>
      </div>
    )
  }
}

export default BooksApp
