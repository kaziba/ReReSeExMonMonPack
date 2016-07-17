import React from 'react';
import axios from 'axios';
import CommentList from './CommentList';
import CommentForm from './CommentForm';

export default class CommentBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };

    this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
  }

  loadCommentsFromServer() {
    axios({
      url: this.props.url,
      method: 'get',
      responseType: 'json'
    })
    .then( res => {
      this.setState({data: res.data});
    })
    .catch( err => {
      throw err;
    });
  }

  handleCommentSubmit(comment) {
    var comments = this.state.data;
    comment.id = Date.now();
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});
    axios({
      url: this.props.url,
      method: 'post',
      responseType: 'json',
      data: comment
    })
    .then( res => {
      this.setState({data: res.data});
    })
    .catch( err => {
      this.setState({data: comments});
      throw err;
    });
  }

  // ページを読み込んだときに呼ばれる
  componentDidMount() {
    console.log('==> componentDidMount');
    this.loadCommentsFromServer();
    this.loadCommentsInterval = setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  }

  // ページから離れたときに呼ばれる
  componentWillUnmount() {
    console.log('==> componentWillUnmount');
    clearInterval(this.loadCommentsInterval);
  }

  render() {
    return (
      <div className='commentBox'>
        <h1>Comments</h1>
        <CommentForm onCommentSubmit={this.handleCommentSubmit.bind(this)} />
        <CommentList data={this.state.data}/>
      </div>
    );
  }
}