import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  GET_ACADEMIC_CALENDAR,
  GET_BUDGET_CALENDAR,
  GET_PLAN_CALENDAR,
  DATA_UPDATED,
  GET_ERRORS,
  LOADING,
  SET_USER,
  RESET_DATA,
  GET_MESSAGES,
  SEND_MESSAGES,
  ADD_DATA_LOADING,
  SET_LAST_MESSAGE_CHECK,
  RESET_UPDATE,
  SET_NOTIFICATIONS,
  CLEAR_NOTIFICATIONS,
  OTP_LOGIN,
  RESET_ERRORS,
  GET_ACCOUNTS,
  UPDATE_MESSAGE,
  DELETE_MESSAGE,
} from "../Actions/types";

const initialState = {
  user: null,
  otpUser: null,
  academicCalendar: [],
  budgetCalendar: [],
  planCalendar: [],
  messages: [],
  accounts: [],
  notifications: [],
  lastMessageCheckTime: 0,
  dataUpdated: "",
  addDataLoading: false,
  loading: false,
  errors: {},
};

const updateMessage = (payload, messages) => {
  messages.map((message) => {
    if (message.id === payload.id) {
      message.message = payload.message;
    }
  });
  return messages;
};
function checkNotif(notifications, newNotification) {
  const isFound = notifications.some((element) => {
    if (element.id === newNotification.id) {
      return notifications;
    } else {
      return [payload, ...notifications];
    }
  });
  return isFound;
}
export const dataReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case ADD_DATA_LOADING:
      return {
        ...state,
        addDataLoading: true,
      };
    case SET_LAST_MESSAGE_CHECK:
      return {
        ...state,
        lastMessageCheckTime: payload,
      };
    case SET_NOTIFICATIONS:
      return {
        ...state,
        notifications: [payload, ...state.notifications],
      };
    case CLEAR_NOTIFICATIONS:
      return {
        ...state,
        notifications: [],
      };
    case GET_ACADEMIC_CALENDAR:
      return {
        ...state,
        academicCalendar: payload,
        loading: false,
      };
    case GET_BUDGET_CALENDAR:
      return {
        ...state,
        budgetCalendar: payload,
        loading: false,
      };
    case GET_PLAN_CALENDAR:
      return {
        ...state,
        planCalendar: payload,
        loading: false,
      };
    case GET_MESSAGES:
      return {
        ...state,
        messages: payload,
        loading: false,
      };
    case GET_ACCOUNTS:
      return {
        ...state,
        accounts: payload,
        loading: false,
      };
    case SEND_MESSAGES:
      return {
        ...state,
        messages: [...state.messages, payload],
        loading: false,
        addDataLoading: false,
      };
    case UPDATE_MESSAGE:
      return {
        ...state,
        messages: updateMessage(payload, state.messages),
        loading: false,
        addDataLoading: false,
      };
    case DELETE_MESSAGE:
      return {
        ...state,
        messages: state.messages.filter((message) => message.id !== payload),
        loading: false,
        addDataLoading: false,
      };
    case DATA_UPDATED:
      return {
        ...state,
        dataUpdated: payload,
        loading: false,
        addDataLoading: false,
      };
    case OTP_LOGIN:
      return {
        ...state,
        otpUser: payload,
        loading: false,
      };
    case GET_ERRORS:
      return {
        ...state,
        loading: false,
        errors: payload,
      };
    case RESET_UPDATE:
      return {
        ...state,
        dataUpdated: "",
      };
    case RESET_ERRORS:
      return {
        ...state,
        errors: {},
      };
    case RESET_DATA:
      return {
        ...state,
        loading: false,
        addDataLoading: false,
        errors: {},
        academicCalendar: [],
        budgetCalendar: [],
        planCalendar: [],
        messages: [],
        accounts: [],
        notifications: [],
        dataUpdated: "",
        user: null,
        otpUser: null,
      };
    case SET_USER:
      return {
        ...state,
        user: payload,
        loading: false,
      };
    default:
      return state;
  }
};
