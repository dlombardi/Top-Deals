import React from 'react';
import Relay from 'react-relay';

import Deal from "./Deal";

class TopDeals extends React.Component {
  setCurrentLimit(e) {
    var value = e.target.value
    var newLimit = Number(value);

    this.props.relay.setVariables({
      linksToFetch: newLimit
    });

  }
  render() {
    return (
      <div>
        <h1>Relay Bookmarks</h1>
        <input type="number" onChange={this.setCurrentLimit.bind(this)} />
        {this.props.topDeals.deals.edges.map(item => {
          return <Deal key={item.node.id} deal={item.node} />
        })}
      </div>
    );
  }
}

export default Relay.createContainer(TopDeals, {
  initialVariables: {
    linksToFetch: 10
  },
  fragments: {
    topDeals: () => Relay.QL`
      fragment on TopDeals {
        id
        deals(first: $linksToFetch) {
          edges {
            node {
              id,
              ${Deal.getFragment('deal')}
            }
          }
        }
      }
    `,
  },
});
