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
