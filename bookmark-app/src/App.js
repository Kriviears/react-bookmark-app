import React from 'react';
import './App.css';

import AddBookmark from './addBookmark/addBookmark';
import BookmarkApp from './BookmarkApp/BookmarkApp';

const bookmarks = [
  {
  title:"Google",
  url:"http://www.google.com", 
  rating:"3", 
  description:"No evil"
  },
  {
    title:"Google",
    url:"http://www.google.com", 
    rating:"3", 
    description:"No evil"
  }
];

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      bookmarks: [],
      showAddFrom: false
    }
  }

  setShowAddForm(show){
    this.setState({
      showAddFrom: show
    })
  }

  addBookmark(bookmark){
    this.setState({
      bookmarks:[...this.state.bookmarks, bookmark],
      showAddForm: false
    })
  }

  componentDidMount(){
    const url = 'https://tf-ed-bookmarks-api.herokuapp.com/v3/bookmarks';
    const options = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer $2a$10$aIQdZSqT19TgJ8i0TtJNbeCRkPsUbWn1t19Yhmp1Do9RV5Mp1YDyu',
        'Content-Type': 'application/json'
      }
    };

    fetch(url, options)
      .then(res =>{
        if(!res.ok){
          throw new Error('Something went wrong please try again later');
        }
        return res;
      })
      .then(res => res.json())
      .then(data =>{
        this.setState({
          bookmarks: data,
          error: null
        });
      })
      .catch(err=>{
        this.setState({
          error: err.message
        });
      });
  }

  render() {
    const page = this.state.showAddFrom
    ? <AddBookmark addBookmark={bookmark => this.addBookmark(bookmark)} showAddForm={show => this.setShowAddForm(show)}/>
    : <BookmarkApp bookmarks={this.state.bookmarks} showAddForm={show => this.setShowAddForm(show)}/>;


    return (
      <div className="App">
        { page }
        
      </div>
    );
  }
}
