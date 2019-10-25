import React from 'react';
import styled from 'styled-components';
import { Form as UnformForm } from '@rocketseat/unform';

import Button from './Button';
import Input from './Input';
import TextArea from './TextArea';
import Select from './Select';

const StyledForm = styled(UnformForm)``;

export default function Form({ onSubmit, schema, ...props }) {
  return <StyledForm onSubmit={onSubmit} schema={schema} {...props} />;
}

export { Button, Input, TextArea, Select };
