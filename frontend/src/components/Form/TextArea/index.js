import React from 'react';
import styled from 'styled-components';
import { Textarea as UnformTextArea } from '@rocketseat/unform';

const StyledTextArea = styled(UnformTextArea)`
  input {
  }

  label {
  }
`;

export default function Textarea({ label, name, placeholder, ...props }) {
  return (
    <StyledTextArea
      label={label}
      name={name}
      placeholder={placeholder}
      {...props}
    />
  );
}
