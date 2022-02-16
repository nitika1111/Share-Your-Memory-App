import * as api from '../api/index.js';
import { AUTH } from '../constants/actionTypes.js';

export const signin = (formData, history) => async (dispatch) => {
  try {
    console.log('Inside Sign In Action');
    const { data } = await api.signin(formData);
    console.log('Inside Sign In Action... After API Call');

    dispatch({ type: AUTH, data });
    console.log('Inside Sign In Action... After AUTH Dispatch');

    history.push('/');
  } catch (error) {
    console.error(error);
  }
};

export const signup = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signup(formData);

    dispatch({ type: AUTH, data });

    history.push('/');
  } catch (error) {
    console.error(error);
  }
};
