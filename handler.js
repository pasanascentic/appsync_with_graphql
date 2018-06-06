'use strict';

// // // module.exports.hello = (event, context, callback) => {
// // //   const response = {
// // //     statusCode: 200,
// // //     body: JSON.stringify({
// // //       message: 'Go Serverless v1.0! Your function executed successfully!',
// // //       input: event,
// // //     }),
// // //   };

// // //   callback(null, response);

// // //   // Use this code if you don't use the http event with the LAMBDA-PROXY integration
// // //   // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
// // // };




// // // const {
// // //   graphql,
// // //   GraphQLSchema,
// // //   GraphQLObjectType,
// // //   GraphQLString,
// // //   GraphQLNonNull
// // // } = require('graphql')

// // // // This method just inserts the user's first name into the greeting message.
// // // const getGreeting = firstName => `Hello, ${firstName}.`

// // // // Here we declare the schema and resolvers for the query
// // // const schema = new GraphQLSchema({
// // //   query: new GraphQLObjectType({
// // //     name: 'RootQueryType', // an arbitrary name
// // //     fields: {
// // //       // the query has a field called 'greeting'
// // //       greeting: {
// // //         // we need to know the user's name to greet them
// // //         args: { firstName: { name: 'firstName', type: new GraphQLNonNull(GraphQLString) } },
// // //         // the greeting message is a string
// // //         type: GraphQLString,
// // //         // resolve to a greeting message
// // //         resolve: (parent, args) => getGreeting(args.firstName)
// // //       }
// // //     }
// // //   }),
// // // })

// // // // We want to make a GET request with ?query=<graphql query>
// // // // The event properties are specific to AWS. Other providers will differ.
// // // module.exports.query = (event, context, callback) => graphql(schema, event.queryStringParameters.query)
// // //   .then(
// // //     result => callback(null, {statusCode: 200, body: JSON.stringify(result)}),
// // //     err => callback(err)
// // //   )




// const {
//   schema
// } = require('schema')
// const {
//   resolvers
// } = require('resolvers')
// const {
//   graphqlLambda, graphiqlLambda
// } = require('apollo-server-lambda')
// const {
//   makeExecutableSchema
// } = require('graphql-tool')

// const myGraphQLSchema = makeExecutableSchema({
//   typeDefs: schema,
//   resolvers,
// });

// module.exports.graphql = function graphqlHandler(event, context, callback) {
//   function callbackWithHeaders(error, output) {
//     // eslint-disable-next-line no-param-reassign
//     output.headers['Access-Control-Allow-Origin'] = '*';
//     callback(error, output);
//   }

//   const handler = graphqlLambda({ schema: myGraphQLSchema });
//   return handler(event, context, callbackWithHeaders);
// };

//import { graphqlLambda, graphiqlLambda } from 'apollo-server-lambda';
//import { makeExecutableSchema } from 'graphql-tools';
//import { schema } from './schema';
//import { resolvers } from './resolvers';

// const myGraphQLSchema = makeExecutableSchema({
//   typeDefs: schema,
//   resolvers,
// });

// exports.graphqlHandler = function graphqlHandler(event, context, callback) {
//   function callbackWithHeaders(error, output) {
//     // eslint-disable-next-line no-param-reassign
//     output.headers['Access-Control-Allow-Origin'] = '*';
//     callback(error, output);
//   }

//   const handler = graphqlLambda({ schema: myGraphQLSchema });
//   return handler(event, context, callbackWithHeaders);
// };

exports.graphqlHandler = (event, context, callback) => {
  console.log('Received event {}', JSON.stringify(event, 3));

  console.log('Got an Invoke Request.');
  switch (event.field) {
    case 'fetchMessage': {
      const response = {
        statusCode: 200,
        body: JSON.stringify({
          message: 'Hello!'
        }),
      };
      

      callback(null, response);

      break;
    }
    default: {
      callback(`Unknown field, unable to resolve ${event.field}`, null);
      break;
    }
  }
};


module.exports.hello = (event, context, callback) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello!'
    }),
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};

// Load the SDK for JavaScript
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'us-east-1'});


module.exports.query = (event, context, callback) => {

  console.log('started.');
    // Create the DynamoDB service object
    var docClient = new AWS.DynamoDB.DocumentClient();
    
  console.log('doc client create. {}', JSON.stringify(docClient));

    var params = {
      TableName: 'Invoice_test',
      Limit: 1
      // Key: {
      //   'id' : {S: '3'},
      // },
      // ProjectionExpression: 'ATTRIBUTE_NAME'
    };
  

  console.log('params. {}', JSON.stringify(params));
  
    // Call DynamoDB to read the item from the table
    docClient.scan(params, function(err, data) {

      console.log('scan. {}', JSON.stringify(data));
      console.log('scan - error. {}', JSON.stringify(err));
      if (err) {
        console.log("Error", err);
        callback(null, {
          statusCode: 200,
          body: JSON.stringify({
            message: 'Hello!',
            data: err
          }),
        });
      } else {
        console.log("Success", data);
        callback(null, {
          statusCode: 200,
          body: JSON.stringify({
            message: 'Hello!',
            data: data
          }),
        });
      }
    });
  
    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};