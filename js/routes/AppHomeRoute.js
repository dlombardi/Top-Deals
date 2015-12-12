import Relay from 'react-relay';

export default class extends Relay.Route {
  static path = '/';
  static queries = {
    topDeals: () => Relay.QL`query { topDeals }`,
  };
  static routeName = 'AppHomeRoute';
}
