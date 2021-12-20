import React from 'react';
import './App.css';
import { useEffect, useState } from 'react';
import { AddTaskContainer } from './components/add-task-container/add-task-container';
import {TaskRendererContainer} from './components/task-renderer-container/task-renderer-container'
import { ApolloProvider } from 'react-apollo';
import {RestLink} from "apollo-link-rest";
import {ApolloClient} from "apollo-client";
import {InMemoryCache} from "apollo-cache-inmemory";
import {GET_ALL_TASKS} from '../src/components/gqlQueries';
import { onError } from 'apollo-link-error';
import { useQuery } from '@apollo/react-hooks';

const link = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});
/*const { ApolloServer, gql } from 'apollo-server-express';
var typeDefs = gql(readFileSync('./typeDefs.graphql', 'UTF-8'))*/

const restLink = new RestLink({ 
  uri: 'http://localhost:3000/list',   // this is your API base url 
});
// Configure the ApolloClient with the default cache and RestLink
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: restLink,
});

function App() {
  
  const [list,setList]=useState([]);
  const [toggle,setToggle]=useState(false);
  const { data,loading,error } = useQuery(GET_ALL_TASKS);

  const newList=useEffect(()=>{
    /*async function fetchTask(){
      await fetch("http://localhost:3000/list")
        .then(response => response.json())
        .then(result => {
          setList(result);
        })
        .catch(error => console.log('error', error));
    }
    fetchTask();*/
    
    /*client.query({
      query: GET_ALL_TASKS
    }).then(response => {
      console.log("Response Data",response.data);
      setList(response.data.tasks)
    })*/
    if(data){
      console.log("Here is data",data);
      setList(data.tasks);
      
    }
    return (data);
  },[data]);
  
  return (
    <div className="App">
      <header className="App-header">
        <AddTaskContainer message="TO DO APP" toggle={toggle} setToggle={setToggle}/>
        <TaskRendererContainer list={list} toggle={toggle} setToggle={setToggle}/>
      </header>
    </div>
  );
}


export default App;
