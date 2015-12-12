import React from 'react';
import Relay from 'react-relay';

class Story extends React.Component {
  render() {
    return (
      <div><a href={this.props.story.url}>{this.props.story.title}</a></div>
    );
  }
}

export default Relay.createContainer(Story, {
  fragments: {
    story: () => Relay.QL`
      fragment on Story {
        title,
        author
      }
    `,
  },
});
