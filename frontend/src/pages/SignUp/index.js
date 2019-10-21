import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import api from '~/services/api';

import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('E-mail inválido.')
    .required('E-mail é obrigatório'),
  password: Yup.string()
    .min(6, 'A senha precisa ter no minimo 6 digitos.')
    .required('Senha é obrigatória'),
  confirm_password: Yup.string()
    .required('Confirmar senha é obrigatório')
    .oneOf([Yup.ref('password')], 'Confirmar senha deve ser igual a senha'),
  first_name: Yup.string().required('Primeiro Nome é obrigatório'),
  last_name: Yup.string().required('Último nome é obrigatório'),
  nickname: Yup.string().required('Nickname é obrigatório'),
});

export default function SignUp() {
  async function handleSubmit({
    first_name,
    last_name,
    nickname,
    email,
    password,
  }) {
    const { data } = await api.post('/users', {
      first_name,
      last_name,
      nickname,
      email,
      password,
    });

    console.tron.log(data);
  }

  return (
    <>
      <img src={logo} alt="GoBarber logo" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input
          label="Primeiro Nome:"
          id="first_name"
          name="first_name"
          type="text"
          placeholder="Primeiro nome"
        />

        <Input
          label="Último Nome:"
          name="last_name"
          type="text"
          placeholder="Último nome"
        />

        <Input
          label="Nickname:"
          name="nickname"
          type="text"
          placeholder="Nickname"
        />

        <Input
          label="E-mail:"
          name="email"
          type="email"
          placeholder="Seu e-mail aqui"
        />

        <Input
          label="Senha:"
          name="password"
          type="password"
          placeholder="Sua senha"
        />

        <Input
          label="Confirmar senha:"
          name="confirm_password"
          type="password"
          placeholder="Confirmar senha"
        />

        <button type="submit">Send</button>

        <Link to="/">Already registered?</Link>
      </Form>
    </>
  );
}
