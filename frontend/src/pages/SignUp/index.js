import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';
import api from '~/services/api';

import Form, { Button, Input } from '~/components/Form';
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
  const dispatch = useDispatch();
  const [buttonLoading, setButtonLoading] = useState(false);

  async function handleSubmit(data) {
    try {
      setButtonLoading(true);

      const { first_name, last_name, nickname, email, password } = data;

      await api.post('/users', {
        first_name,
        last_name,
        nickname,
        email,
        password,
      });

      dispatch(signInRequest(email, password));
    } catch (error) {
      setButtonLoading(false);

      toast.error(
        error.response.data.fields
          ? error.response.data.fields[0].message
          : error.response.data.message
      );
    }
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

        <Button type="submit" loading={buttonLoading ? 1 : 0}>
          Send
        </Button>

        <Link to="/">Already registered?</Link>
      </Form>
    </>
  );
}
