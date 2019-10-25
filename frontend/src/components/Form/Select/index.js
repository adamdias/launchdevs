import React from 'react';
import styled from 'styled-components';
import { Select as SelectForm } from '@rocketseat/unform';

const StyledSelect = styled(SelectForm)`
  input {
  }

  label {
  }
`;
const options = [{ id: '', title: '' }];
export default function Select({ label, name, ...props }) {
  return (
    <StyledSelect label={label} name={name} options={options} {...props} />
  );
}
