import React from 'react';
import PropTypes from 'prop-types';

// component that contains the author and comment text fields, and submit button
const CommentForm = props => (
  <form onSubmit={props.submitComment}>
    <input
      type="text"
      name="author"
      placeholder="Your name…"
      value={props.author}
      onChange={props.handleChangeText}
    />
    <input
      type="text"
      name="text"
      placeholder="Say something..."
      value={props.text}
      onChange={props.handleChangeText /* this originally was: props.handleTextChange (i believe this was a typo) */}
    />
    <button type="submit">Submit</button>
  </form>
);

CommentForm.propTypes = {
  submitComment: PropTypes.func.isRequired,
  handleChangeText: PropTypes.func.isRequired,
  text: PropTypes.string,
  author: PropTypes.string,
};

CommentForm.defaultProps = {
  text: '',
  author: '',
};

export default CommentForm;