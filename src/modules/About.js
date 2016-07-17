import React from 'react';

export default class About extends React.Component {
  render() {
    return (
      <div>
        <h1>About</h1>
        <h2>{this.props.params.name}</h2>
      </div>
    );
  }
}
