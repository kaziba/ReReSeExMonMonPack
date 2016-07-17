import React from 'react';
import CommentBox from '../CommentBox';


export default class Comment extends React.Component {
  render() {
    return <CommentBox url='http://localhost:3000/api/comments' pollInterval={2000}/>;
  }
};