import React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';

import Spinner from '~/components/Spinner';

const StyledButton = styled.button.attrs(props => ({
  disabled: props.loading || 0,
}))`
  margin: 0 0 10px;
  height: 44px;
  background: #3b9eff;
  font-weight: bold;
  color: #fff;
  border: 0;
  border-radius: 4px;
  font-size: 16px;
  transition: background 0.2s;

  &:hover {
    background: ${darken(0.03, '#3b9eff')};
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export default function Button({
  text = 'Send',
  type = 'submit',
  spinnerSize = 20,
  loading = 0,
  color,
  onClick,
  ...props
}) {
  return (
    <StyledButton
      type={type}
      onClick={onClick}
      color={color}
      spinnerSize={spinnerSize}
      loading={loading}
      {...props}
    >
      {loading === 1 ? <Spinner size={spinnerSize} /> : text}
    </StyledButton>
  );
}
