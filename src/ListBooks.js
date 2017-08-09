import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
//import PropTypes from 'prop-types';
//import escapeRegExp from 'escape-string-regexp';
//import sortBy from 'sort-by';

class ListBooks extends Component {
  state = {
    currentlyReading: [{
      title: "To Kill a Mockingbird",
      authors: "Harper Lee",
      url: 'url("http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api")'
    }, {
      title: "Ender's Game",
      authors: "Orson Scott Card",
      url: 'url("http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api")'
    }],
    wantToRead: [{
      title: "1776",
      authors: "David McCullough",
      url: 'url("http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api")'
    }, {
      title: "Harry Potter and the Sorcerer's Stone",
      authors: "J.K. Rowling",
      url: 'url("http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api")'
    }],
    read: [{
      title: "The Hobbit",
      authors: "J.R.R. Tolkien",
      url: 'url("http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api")'
    }, {
      title: "Oh, the Places You'll Go!",
      authors: "Seuss",
      url: 'url("http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api")'
    }, {
      title: "The Adventures of Tom Sawyer",
      authors: "Mark Twain",
      url: 'url("http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api")'
    }]
  }
  componentDidMount = () => {
    console.log(this.state.read)
    const {update, get} = BooksAPI
    update({id:"bsId"},"none").then(data => {
      for (let [shelf, ids] of Object.entries(data)) {
        ids.map(id => {
          get(id).then(data=> {
          console.log(data)
          console.log(shelf)
          this.setState((state) => {
            let book = {
              id,
              title: data.title,
              authors: data.authors.join(" & "),
              url: `url("${data.imageLinks.thumbnail}'")`
            }
            console.log(book)
            let ret = state[shelf].concat(book)
            console.log(state[shelf])
            console.log(ret)
            return ret
          })
        })
        return 1;
      })}
      return 1;
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
