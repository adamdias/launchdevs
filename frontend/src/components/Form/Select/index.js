import React from 'react';
import styled from 'styled-components';
import { Select as SelectForm } from '@rocketseat/unform';

const StyledSelect = styled(SelectForm)`
  input {
  }

  label {
  }
`;
export default function Select({ label, name, options = [], ...props }) {
  return (
    <StyledSelect label={label} name={name} options={options} {...props} />
  );
}
