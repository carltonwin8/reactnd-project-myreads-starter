import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import BookShelf from './BookShelf'

class ListBooks extends Component {
  render() {
    const {currentlyReading, read, wantToRead} = this.props.books
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
            shelfSelect={this.props.shelfSelect}
          />
          <BookShelf
            title="Want to Read"
            books={wantToRead}
            shelf="wantToRead"
            shelfSelect={this.props.shelfSelect}
          />
          <BookShelf
            title="Read"
            books={read}
            shelf="read"
            shelfSelect={this.props.shelfSelect}
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
