import React, { Component } from "react";
import BooksDisplay from "./BooksDisplay"
import '../styles/Homepage.scss';
import '../styles/reset.scss';

class Homepage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      booksData: [],
      filterBooksData: [],
      isLoaded: false,
      searchInput: '',
      displayFilterData: ''
    }
  }

  componentDidMount() {
    fetch('https://bookshelf.goodideas-studio.com/api')
      .then(response => response.json())
      .then(data => {
        this.setState({
          isLoaded: true,
          booksData: data.list,
          filterBooksData: data.list,
        })
      })
      .catch(error => console.log('Opps', error))
  }

  updateInput() {
    this.setState({
      searchInput: event.target.value
    })
  }

  filterData() {
    const regex = new RegExp(this.state.searchInput, "i");
    let filterBooksData = this.state.booksData.filter((book) => {
      return book.name.match(regex)
    })
    if (filterBooksData.length === 0) {
      this.setState({
        filterBooksData: ['查無資料'],
        displayFilterData: this.state.searchInput
      })
    } else {
      this.setState({
        filterBooksData: filterBooksData
      })
    };
  };

  handleKeyDown(e) {
    // console.log('press')
    if (e.keyCode === 13) {
      this.filterData()
    }
  }

  render() {
    const { booksData, filterBooksData, searchInput } = this.state;
    return (

      <div>
        <div className="header" >
          <div className="header-text">
            <span>天瓏書局書籍查詢</span>
          </div>
        </div>
        <div className="search-container">
          <input className="search-bar" placeholder="請輸入書名" onChange={() => this.updateInput()} onKeyDown={(e) => { this.handleKeyDown(e) }}></input>
          <button onClick={() => this.filterData()}     >搜尋</button>
        </div>
        <BooksDisplay BooksData={this.state.filterBooksData} keyword={this.state.displayFilterData} />
      </div>
    );
  }
}

export default Homepage;