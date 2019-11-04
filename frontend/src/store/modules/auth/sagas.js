import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import {
  SIGN_IN_REQUEST,
  SIGN_UP_REQUEST,
  signInSuccess,
  signFailure,
} from './actions';

import api from '~/services/api';
import history from '~/services/history';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, '/sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    yield put(signInSuccess(token, user));

    history.push('/dashboard');
  } catch (err) {
    toast.error('Falha na autenticaçao, verifique seus dados!');
  }
}

export function* signUp({ payload }) {
  try {
    const { first_name, last_name, nickname, email, password } = payload;

    yield call(api.post, '/users', {
      first_name,
      last_name,
      nickname,
      email,
      password,
    });

    history.push('/');
  } catch (err) {
    toast.error('Falha no cadastro, verifique seus dados!');

    yield put(signFailure());
  }
}

export default all([
  takeLatest(SIGN_IN_REQUEST, signIn),
  takeLatest(SIGN_UP_REQUEST, signUp),
]);
