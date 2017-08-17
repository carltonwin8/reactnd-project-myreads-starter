import React, {Component} from 'react';

class Book extends Component {
  render() {
    const {book} = this.props
    const style = {
      width: 128,
      height: 193,
      backgroundImage: book.url
    }
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={style}></div>
          <div className="book-shelf-changer">
            <select
              value={this.props.shelf}
              onChange={(e) => this.props.shelfSelect(e.target.id, e.target.value, this.props.shelf)}
              id={book.id}>
              <option value="disabled" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
    )
  }
}


export default Book;
