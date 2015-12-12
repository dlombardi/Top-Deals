import React from 'react';
import Relay from 'react-relay';

import Story from "./Story";

class TopNews extends React.Component {
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
        {this.props.news.stories.edges.map(item => {
          return <Story key={item.node.id} story={item.node} />
        })}
      </div>
    );
  }
}

export default Relay.createContainer(TopNews, {
  initialVariables: {
    linksToFetch: 10
  },
  fragments: {
    news: () => Relay.QL`
      fragment on NewsFeed {
        id
        stories(first: $linksToFetch) {
          edges {
            node {
              id,
              ${Story.getFragment('story')}
            }
          }
        }
      }
    `,
  },
});
