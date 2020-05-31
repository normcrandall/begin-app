// tslint:disable
// this is an auto generated file. This will be overwritten
import { gql } from "apollo-boost";
export const createUser = gql`mutation CreateUser($object:[make_time_user_insert_input!]! ) {
  insert_maketime_user(objects: $object){
    affected_rows
  }
		
 )`;
