import React, { useReducer } from 'react';
import UserContext from './userContext';
import userReducer from './userReducer';
import { useAuth0 } from '@auth0/auth0-react';
import { useHistory } from 'react-router-dom';

import axios from 'axios';
import { GET_USER_INFO } from '../types';
const serverUrl = process.env.REACT_APP_SERVER_URL;

const UserState = (props) => {
  const initialState = {
    userId: null,
    userInfo: null,
  };
  const { getAccessTokenSilently } = useAuth0();
  const history = useHistory();
  // eslint-disable-next-line
  const [state, dispatch] = useReducer(userReducer, initialState);

  const getUser = async (email) => {
    try {
      const token = await getAccessTokenSilently();
      const options = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
      };
      const response = await fetch(`${serverUrl}/api/users/`, options);
      if (response.status === 204) {
        return history.push('/create-profile');
        // return response.status;
      } else {
        const data = await response.json();
        dispatch({
          type: GET_USER_INFO,
          payload: data,
        });
        history.push('/');
        return;
      }
    } catch (err) {
      console.error('Error @ UserState getUser', err.message);
    }
  };

  const createUser = async (userObj) => {
    try {
      const token = await getAccessTokenSilently();

      const response = axios({
        method: 'post',
        url: `${serverUrl}/api/users/create`,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: userObj,
      });
      const user = await response;
      await dispatch({
        type: GET_USER_INFO,
        payload: user,
      });
      history.push('/');
      return;
    } catch (err) {
      return console.error('Error @ UserState createUser', err.message);
    }
  };

  return (
    <UserContext.Provider
      value={{
        userInfo: state.userInfo,
        userId: state.userId,
        getUser,
        createUser,
      }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
