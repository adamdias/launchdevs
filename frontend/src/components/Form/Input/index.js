import React from 'react';
import styled from 'styled-components';
import { Input as UnformInput } from '@rocketseat/unform';

const StyledInput = styled(UnformInput)`
  input {
  }

  label {
  }
`;

export default function Input({ label, name, placeholder, ...props }) {
  return (
    <StyledInput
      label={label}
      name={name}
      placeholder={placeholder}
      {...props}
    />
  );
}
