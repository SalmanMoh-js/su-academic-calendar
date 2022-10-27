import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {
  GET_ACADEMIC_CALENDAR,
  GET_BUDGET_CALENDAR,
  GET_PLAN_CALENDAR,
  GET_ERRORS,
  LOADING,
  RESET_DATA,
  SET_USER,
  GET_MESSAGES,
  SEND_MESSAGES,
  DATA_UPDATED,
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
} from './types';

// Login
export const userLogin =
  ({ email, password }) =>
  async (dispatch) => {
    dispatch(setLoading());
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ email, password });

    try {
      const res = await axios.post(
        'apisource/api/calendar/login',
        body,
        config
      );
      dispatch(setUser(res.data));
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    }
  };

// Login With Otp
export const otpLogin =
  ({ email, otp }) =>
  async (dispatch) => {
    dispatch(setLoading());
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ email, otp });

    try {
      const res = await axios.post('apisource/api/calendar/otp', body, config);
      dispatch({
        type: OTP_LOGIN,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    }
  };

export const newPassword =
  ({ email, password }) =>
  async (dispatch) => {
    dispatch(setLoading());
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ email, password });

    try {
      const res = await axios.post(
        'apisource/api/calendar/new-password',
        body,
        config
      );
      dispatch({
        type: DATA_UPDATED,
        payload: 'password set',
      });
    } catch (err) {
      console.log(err.response.data);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    }
  };

export const changePassword =
  ({ email, oldPassword, newPassword }) =>
  async (dispatch) => {
    dispatch(setLoading());
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const body = JSON.stringify({ email, oldPassword, newPassword });

    try {
      const res = await axios.post(
        'apisource/api/calendar/change-password',
        body,
        config
      );
      dispatch({
        type: DATA_UPDATED,
        payload: 'password changed',
      });
    } catch (err) {
      console.log(err.response.data);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    }
  };

export const getAcademicCalendar = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    const headers = {
      'Content-Type': 'application/json',
    };
    const res = await axios.get('apisource/api/calendar/academic-calendar', {
      headers,
    });
    dispatch({
      type: GET_ACADEMIC_CALENDAR,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const getBudgetCalendar = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    const headers = {
      'Content-Type': 'application/json',
    };
    const res = await axios.get('apisource/api/calendar/budget-calendar', {
      headers,
    });
    dispatch({
      type: GET_BUDGET_CALENDAR,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const getPlanCalendar = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    const headers = {
      'Content-Type': 'application/json',
    };
    const res = await axios.get('apisource/api/calendar/plan-calendar', {
      headers,
    });
    dispatch({
      type: GET_PLAN_CALENDAR,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const getMessages = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    const headers = {
      'Content-Type': 'application/json',
    };
    const res = await axios.get('apisource/api/calendar/messages', { headers });
    res.data.map((message) => (message.reciever = message.reciever.split(',')));
    res.data.map((message) => {
      if (message.additionalReciever) {
        message.additionalReciever = message.additionalReciever.split(',');
      }
    });
    dispatch({
      type: GET_MESSAGES,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const getAccounts = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    const headers = {
      'Content-Type': 'application/json',
    };
    const res = await axios.get('apisource/api/calendar/get-accounts', {
      headers,
    });
    const accountEmails = res.data.map(({ email }) => email);
    dispatch({
      type: GET_ACCOUNTS,
      payload: accountEmails,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const updateAcademicCalendar = (newDate) => async (dispatch) => {
  dispatch(setAddDataLoading());
  try {
    const headers = {
      'Content-Type': 'application/json',
    };

    const body = JSON.stringify(newDate);
    const res = await axios.post(
      'apisource/api/calendar/update-academic-calendar',
      body,
      { headers }
    );
    dispatch({
      type: DATA_UPDATED,
      payload: 'date updated',
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const updateBudgetCalendar = (newDate) => async (dispatch) => {
  dispatch(setAddDataLoading());
  try {
    const headers = {
      'Content-Type': 'application/json',
    };

    const body = JSON.stringify(newDate);
    const res = await axios.post(
      'apisource/api/calendar/update-budget-calendar',
      body,
      { headers }
    );
    dispatch({
      type: DATA_UPDATED,
      payload: 'date updated',
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const updatePlanCalendar = (newDate) => async (dispatch) => {
  dispatch(setAddDataLoading());
  try {
    const headers = {
      'Content-Type': 'application/json',
    };

    const body = JSON.stringify(newDate);
    const res = await axios.post(
      'apisource/api/calendar/update-plan-calendar',
      body,
      { headers }
    );
    dispatch({
      type: DATA_UPDATED,
      payload: 'date updated',
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const sendMessage = (message) => async (dispatch) => {
  dispatch(setAddDataLoading());
  try {
    const headers = {
      'Content-Type': 'application/json',
    };

    const body = JSON.stringify(message);
    const res = await axios.post('apisource/api/calendar/send-message', body, {
      headers,
    });
    message.reciever = message.reciever.split(',');
    dispatch({
      type: SEND_MESSAGES,
      payload: message,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const updateMessage = (message) => async (dispatch) => {
  dispatch(setAddDataLoading());
  try {
    const headers = {
      'Content-Type': 'application/json',
    };
    dispatch({
      type: UPDATE_MESSAGE,
      payload: message,
    });
    const body = JSON.stringify(message);
    const res = await axios.post(
      'apisource/api/calendar/update-message',
      body,
      { headers }
    );
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const deleteMessage = (message) => async (dispatch) => {
  dispatch(setAddDataLoading());
  try {
    const headers = {
      'Content-Type': 'application/json',
    };
    dispatch({
      type: DELETE_MESSAGE,
      payload: message.id,
    });
    const body = JSON.stringify(message);
    const res = await axios.post(
      'apisource/api/calendar/delete-message',
      body,
      { headers }
    );
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const sendRequest = (request) => async (dispatch) => {
  dispatch(setAddDataLoading());
  try {
    const headers = {
      'Content-Type': 'application/json',
    };
    const body = JSON.stringify(request);
    const res = await axios.post('apisource/api/calendar/send-request', body, {
      headers,
    });
    dispatch({
      type: DATA_UPDATED,
      payload: 'request sent',
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const resetPasswordRequest = (request) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const headers = {
      'Content-Type': 'application/json',
    };
    const body = JSON.stringify(request);
    const res = await axios.post(
      'apisource/api/calendar/forgot-password',
      body,
      { headers }
    );
    dispatch({
      type: DATA_UPDATED,
      payload: 'password reset',
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const setUser = (userData) => (dispatch) => {
  dispatch({
    type: SET_USER,
    payload: userData,
  });
};
export const resetData = () => (dispatch) => {
  dispatch({
    type: RESET_DATA,
  });
};
export const resetUpdate = () => (dispatch) => {
  dispatch({
    type: RESET_UPDATE,
  });
};

export const resetErrors = () => (dispatch) => {
  dispatch({
    type: RESET_ERRORS,
  });
};
const setLoading = () => async (dispatch) => {
  dispatch({
    type: LOADING,
  });
};

const setAddDataLoading = () => async (dispatch) => {
  dispatch({
    type: ADD_DATA_LOADING,
  });
};

export const setLastMessageCheck = (time) => async (dispatch) => {
  dispatch({
    type: SET_LAST_MESSAGE_CHECK,
    payload: time,
  });
};

export const setNotif = (notif) => async (dispatch) => {
  notif.map((notification) => {
    dispatch({
      type: SET_NOTIFICATIONS,
      payload: notification,
    });
  });
};

export const clearNotifications = () => async (dispatch) => {
  dispatch({
    type: CLEAR_NOTIFICATIONS,
  });
};
