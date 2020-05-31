// tslint:disable
// this is an auto generated file. This will be overwritten
import { gql } from "apollo-boost";
export const createUser = gql`
  mutation CreateUser($objects: [maketime_user_insert_input!]!) {
    insert_maketime_user(objects: $objects) {
      affected_rows
    }
  }
`;

export const createCalendar = gql`
  mutation CreateCalendar($bojects: [maketime_calendar_insert_input!]!) {
    insert_maketime_calendar(objects: $objects) {
      affected_rows
      returning {
        id
        name
      }
    }
  }
`;
