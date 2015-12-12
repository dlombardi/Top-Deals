import Relay from 'react-relay';

export default class extends Relay.Route {
  static path = '/';
  static queries = {
    news: () => Relay.QL`query { news }`,
  };
  static routeName = 'AppHomeRoute';
}
