import React from 'react'
import {Route} from 'react-router-dom'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI'
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
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks
            books={this.state}
            shelfSelect={this.shelfSelect}
            />
        )}/>
        <Route path="/search" render={({history}) => ( <SearchBooks /> )}/>
      </div>
    )
  }
}

export default BooksApp
