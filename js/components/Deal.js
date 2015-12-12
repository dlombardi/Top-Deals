import React from 'react';
import Relay from 'react-relay';

class Deal extends React.Component {
  render() {
    return (
      <div>
        <a href={this.props.deal.url}>{this.props.deal.title}</a>
      </div>
    );
  }
}

export default Relay.createContainer(Deal, {
  fragments: {
    deal: () => Relay.QL`
      fragment on Deal {
        picture,
        link,
        title,
        domainLink,
        domain,
        timeStamp,
        authorLink,
        author
      }
    `,
  },
});
