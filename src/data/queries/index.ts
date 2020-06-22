// tslint:disable
// this is an auto generated file. This will be overwritten
import { gql } from "apollo-boost";

export const getCalendars = gql`
  query getCalendar($where: maketime_calendar_bool_exp) {
    calendarQuery(where: $where) {
      id
      name
      isDefault
    }
  }
`;

export const getActivities = gql`
  query getActivities($where: maketime_activity_bool_exp, $id: Int!) {
    calendar(id: $id) {
      activities(where: $where) {
        id
        start
        end
        description
        title
        activityType
        title
      }
    }
  }
`;
