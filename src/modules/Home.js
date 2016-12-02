import React from 'react'
import { Button, Icon } from 'semantic-ui-react';

export default class Home extends React.Component {
  render() {
    return <div>
      <Button icon>
        <Icon name='home' />
      </Button>
    </div>;
  }
}
