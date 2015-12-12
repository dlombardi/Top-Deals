import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
  GraphQLBoolean
} from 'graphql';

import {
  connectionArgs,
  connectionDefinitions,
  connectionFromArray,
  fromGlobalId,
  globalIdField,
  connectionFromPromisedArray,
  mutationWithClientMutationId,
  nodeDefinitions,
} from 'graphql-relay';

import {
  retreiveStories
} from './database';


var {nodeInterface, nodeField} = nodeDefinitions(
  (globalId) => {
    var {type, id} = fromGlobalId(globalId);

  },
  (obj) => {

  }
);

var NEWS = {};

NEWS.stories = [
  {_id: 1, title: "this is a 1new story", author: "1Darien Lombardi"},
  {_id: 2, title: "this is a 2new story", author: "2Darien Lombardi"},
  {_id: 4, title: "this is a 3new story", author: "3Darien Lombardi"},
  {_id: 5, title: "this is a 3new story", author: "3Darien Lombardi"},
  {_id: 6, title: "this is a 3new story", author: "3Darien Lombardi"},
  {_id: 7, title: "this is a 3new story", author: "3Darien Lombardi"},
  {_id: 8, title: "this is a 3new story", author: "3Darien Lombardi"},
  {_id: 9, title: "this is a 3new story", author: "3Darien Lombardi"},
]



let storyType = new GraphQLObjectType({
  name: 'Story',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: (obj) => obj._id
    },
    picture: { type: GraphQLString },
    link: { type: GraphQLString },
    title: { type: GraphQLString },
    domainLink: { type: GraphQLString },
    domain: { type: GraphQLString },
    timeStamp: { type: GraphQLString },
    authorLink: { type: GraphQLString },
    author: { type: GraphQLString },
  }),
  interfaces: [nodeInterface]
})

var {connectionType: storyConnection} =
  connectionDefinitions({name: 'Story', nodeType: storyType});

let newsFeedType = new GraphQLObjectType({
  name: "NewsFeed",
  fields: () => ({
    id: globalIdField('NewsFeed'),
    stories: {
      type: storyConnection,
      description: "Stories in the newsFeed",
      args: connectionArgs,
      resolve: (obj, args) => {
        return connectionFromPromisedArray(retreiveStories(), args)
      }
    },
  }),
  interfaces: [nodeInterface]
})

let queryType = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    node: nodeField,
    news: {
      type: newsFeedType,
      resolve: () => NEWS
    }
  })
})


export var Schema = new GraphQLSchema({
  query: queryType,
  // Uncomment the following after adding some mutation fields:
  // mutation: mutationType
});
