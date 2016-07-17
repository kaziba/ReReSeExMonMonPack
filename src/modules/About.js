import React from 'react';

export default React.createClass({
  render() {
    return (
      <div>
        <h1>About</h1>
        <h2>{this.props.params.name}</h2>
      </div>
    );
  }
});
