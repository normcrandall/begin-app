// tslint:disable
// this is an auto generated file. This will be overwritten
import { gql } from "apollo-boost";
export const createUser = gql`
  mutation createUser($objects: [maketime_user_insert_input!]!) {
    insert_maketime_user(objects: $objects) {
      affected_rows
    }
  }
`;

export const createCalendar = gql`
  mutation createCalendar($objects: [maketime_calendar_insert_input!]!) {
    insert_maketime_calendar(objects: $objects) {
      affected_rows
      returning {
        id
        name
      }
    }
  }
`;

export const insertActivity = gql`
  mutation insertActivity($objects: [maketime_activity_insert_input!]!) {
    insert_maketime_activity(objects: $objects) {
      returning {
        id
      }
    }
  }
`;

export const updateActivity = gql`
  mutation updateActivity(
    $set: maketime_activity_set_input
    $where: maketime_activity_bool_exp!
  ) {
    update_maketime_activity(_set: $set, where: $where) {
      returning {
        id
      }
    }
  }
`;
