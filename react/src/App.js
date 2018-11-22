import React, { Component } from 'react';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Root from './components/root';

// App state
import defaults from './state/default';
import resolvers from './state/resolvers';

import { iq7FlyersURL } from './assets/js/functions-vars';



const client = new ApolloClient({
  uri: `${iq7FlyersURL}/post/grafql`,
  dataIdFromObject: o => o.id,
  clientState: {
    resolvers: resolvers,
    defaults: defaults,
  }
});

class App extends Component {

  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <Route path="/" component={Root} />
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
