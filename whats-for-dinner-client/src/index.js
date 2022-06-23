import React from 'react'
import App from "./App"
import { createRoot } from 'react-dom/client'
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

const root = createRoot(document.getElementById("root"))

const link = createHttpLink({
  uri: 'http://localhost:3030/graphql/',
  credentials: 'include'
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link
});

root.render(
  <React.Fragment>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.Fragment>
)
