import React, {Component} from 'react';
import Book from './Book'

class BookShelf extends Component {
  constructor(props) {
    super(props)
    this.shelfSelect = this.shelfSelect.bind(this);
  }
  shelfSelect = (bookId, shelf) => {
    this.props.shelfSelect(bookId, shelf, this.props.shelf)
  }
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
          {this.props.books.map(book =>
            <li key={book.id}>
              <Book
                book={book}
                shelf={this.props.shelf}
                shelfSelect={this.shelfSelect}
              />
            </li>
          )}
          </ol>
        </div>
      </div>
    )
  }
}


export default BookShelf;
