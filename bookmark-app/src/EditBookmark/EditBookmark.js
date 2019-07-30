import React, { Component } from 'react'
import BookmarksContext from '../BookmarksContext';
import config from '../config'

export default class EditBookmarkForm extends Component {

    state = {
        error: null,
        bookmark: {}
    }

    handleSubmit = e => {
        e.preventDefault()
        // get the form fields from the event
        const bookmark = {
            ...this.state.bookmark
        }
        this.setState({ error: null })
        fetch(`${config.API_ENDPOINT}/${this.props.match.params.bookmarkId}`, {
          method: 'POST',
          body: JSON.stringify(bookmark),
          headers: {
            'content-type': 'application/json',
            'authorization': `bearer ${config.API_KEY}`
          }
        })
          .then(res => {
            if (!res.ok) {
              // get the error message from the response,
              return res.json().then(error => {
                // then throw it
                throw error
              })
            }
            return res.json()
          })
          .then(data => {
            this.context.updateBookmark(data)
          })
          .catch(error => {
            console.log(error)
            this.setState({ error })
          })
      }

      componentDidMount(){
        const bookmarkId = this.props.match.params.bookmarkId
        fetch(`${config.API_ENDPOINT}/${bookmarkId}`, {
            method: 'GET'
        })
        .then(res => {
            if(!res.ok){
                return res.json().then(error =>{
                    throw error
                })
            }
            return res.json()
        })
        .then(data =>{
            this.setState({
                bookmark: data
            })
        })
        .catch(error =>{
            console.log(error)
            this.setState({ error })
        })
      }

    
      handleClickCancel = () => {
        this.props.history.push('/')
      };

    render() {
        const { title, url, description, rating } = this.state.bookmark;
        return(
            <section className='EditBookmarkForm'>
                <section className='EditBookmark'>
        <h2>Edit a bookmark</h2>
        <form
          className='EditBookmark__form'
          onSubmit={this.handleSubmit}
        >
          <div className='EditBookmark__error' role='alert'>
            {error && <p>{error.message}</p>}
          </div>
          <div>
            <label htmlFor='title'>
              Title
              {' '}
              <Required />
            </label>
            <input
              type='text'
              name='title'
              id='title'
              placeholder={title}
              value={title}
              required
            />
          </div>
          <div>
            <label htmlFor='url'>
              URL
              {' '}
              <Required />
            </label>
            <input
              type='url'
              name='url'
              id='url'
              placeholder={url}
              value={url}
              required
            />
          </div>
          <div>
            <label htmlFor='description'>
              Description
            </label>
            <textarea
              name='description'
              id='description'
              placeholder={description}
              value={description}
            />
          </div>
          <div>
            <label htmlFor='rating'>
              Rating
              {' '}
              <Required />
            </label>
            <input
              type='number'
              name='rating'
              id='rating'
              defaultValue={rating}
              value={rating}
              min='1'
              max='5'
              required
            />
          </div>
          <div className='EditBookmark__buttons'>
            <button type='button' onClick={this.handleClickCancel}>
              Cancel
            </button>
            {' '}
            <button type='submit'>
              Save
            </button>
          </div>
        </form>
      </section>
            </section>
        )
    }
}