// authSaga.js

import { takeLatest, call, put } from 'redux-saga/effects';
import { setUser, setLoading, setError } from '../slice/userauthSlice';
import axios from 'axios';
import Cookies from 'js-cookie';

async function fetchUserInformation() {
  try {
    const token = Cookies.get('authtoken');
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/account`,
      {
        headers: {
          Authorization: `Bearer ${String(token)}`,
        },
      }
    );

    if (!response) {
      console.log('invalid data');
    }
    // const authorizationHeader = response.headers.authorization; // 'Authorization' or 'authorization' (case-sensitive)
    // console.log('Authorization Header:', authorizationHeader);

    let data = response.data.olduser;

    let message = response.data.message;

    // console.log(data);

    // console.log(message);

    return data;
  } catch (error) {
    throw error;
  }
}

function* getUserInformation() {
  try {
    yield put(setLoading());
    const user = yield call(fetchUserInformation);
    yield put(setUser(user));
  } catch (error) {
    yield put(setError(error.message));
  }
}

export function* watchUserSaga() {
  yield takeLatest('userauth/getUserInformation', getUserInformation);
}
