import * as ReactDOM from 'react-dom';
import App from "./App";
import {RestLink} from "apollo-link-rest";
import {ApolloClient} from "apollo-client";
import {InMemoryCache} from "apollo-cache-inmemory"
import { ApolloProvider } from '@apollo/react-common';

const restLink = new RestLink({ 
    uri: 'http://localhost:3000/list',   // this is your API base url  
});
  
  // Configure the ApolloClient with the default cache and RestLink
  const client = new ApolloClient({
    link: restLink , 
    cache: new InMemoryCache(),
  });

  const ApolloApp = () =>  (
    <ApolloProvider client={client}>
    <App/>
  </ApolloProvider>
  )

  const rootElement = document.getElementById('root');
  ReactDOM.render(<ApolloApp/>, rootElement);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals