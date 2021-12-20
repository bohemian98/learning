import { RestLink } from "apollo-link-rest";
import { DocumentNode } from "graphql";
import gql from "graphql-tag";

export const GET_ALL_TASKS = gql `
    query GET_ALL_TASK{
        tasks @rest(type:"[Task]",path:"/") {
           id
           task
        }
    }
`;
 /*gql `
    query {
        todos @rest(type: "Task", paths:"/"){
            id
            task
        }
    }
`;*/
    
export interface Task {
    id: number;
    task: string;
}

export interface Tasks{
    tasks: Task[];
}
 
export interface AddTask {
    addTask: Task;
}