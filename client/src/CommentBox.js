import React, { Component } from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
// import DATA from './data';
import './CommentBox.css';
import 'whatwg-fetch';

// this is the TOP-LEVEL container for the comments section
// it includes: CommentForm, CommentList, and Comment components
class CommentBox extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      error: null,
      author: '',
      text: ''
    };
    this.pollInterval = null;
  }

  componentDidMount() {
    this.loadCommentsFromServer();
    // poll backend server for comments every 2 seconds
    if (!this.pollInterval) {
      this.pollInterval = setInterval(this.loadCommentsFromServer, 2000);
    }
  }

  componentWillUnmount() {
    if (this.pollInterval) clearInterval(this.pollInterval);
    this.pollInterval = null;
  }

  loadCommentsFromServer = () => {
    // fetch returns a promise. If you are not familiar with promises, see
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
    fetch("/api/comments")
      .then(data => data.json())
      .then((res) => {
        // if didn't succesfully fetch comments
        if (!res.success) this.setState({ error: res.error });
        // update state w/ new comment data
        else this.setState({ data: res.data });
      });
  };

  onChangeText = (e) => {
    // begin setting the newState by setting it to current state
    const newState = { ...this.state };
    // then we modify the state
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  submitComment = (e) => {
    e.preventDefault(); // prevent default event from emitting
    // object destructuring sugar syntax
    const { author, comment } = this.state;
    if (!author || !comment) return;
    fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ author, comment }),
    }).then(res => res.json()).then((res) => {
      // if error in POST
      if (!res.success) this.setState({ error: res.error.message || res.error });
      // if successful POST, then reset form fields to where they are blank
      else this.setState({ author: '', text: '', error: null });
    });
  }

  render() {
    return (
      <div className="container">
        <div className="comments">
          <h2>Comments:</h2>
          <CommentList data={this.state.data} />
        </div>
        <div className="form">
          <CommentForm
            author={this.state.author}
            text={this.state.text}
            handleChangeText={this.onChangeText}
            handleSubmit={this.submitComment}
          />
        </div>
        {/* if there's an error fetching comments, then display below comment form */}
        {this.state.error && <p>{this.state.error}</p>}
      </div>
    );
  }
}

export default CommentBox;