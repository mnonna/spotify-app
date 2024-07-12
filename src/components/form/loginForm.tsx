'use client';

import { ChangeEvent, useState } from 'react';
import { useRouter } from "next/navigation";
import FormRow from './formRow';
import FormField from './formField';
import FormInput from './formInput';
import AppButton from '../button/AppButton';
import "../../scss/form/loginForm.scss";
import Box from '../box/box';

export default function LoginForm() {
  const router = useRouter();
  const [clientID, setClientID] = useState('');
  const [clientSecret, setClientSecret] = useState('');

  const onIDChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const { value } = target;
    setClientID(value);
  }
  
  const onSecretChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const { value } = target;
    setClientSecret(value);
  }

  const onSubmit = async () => {
    const data = {
      clientID,
      clientSecret
    }

    const req = await fetch(`/api/authorize`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const res = await req.json();
    const { auth_url } = res;
    
    if (auth_url && auth_url !== '') {
      window.location.assign(auth_url);
    }
  }

  return (
    <div className="form loginForm">
      <Box>
        <FormRow>
          <FormField>
            <FormInput type="text" label={'Client ID'} value={clientID} onInputChange={(event) => onIDChange(event)}></FormInput>
          </FormField>
        </FormRow>
        <FormRow>
          <FormField>
            <FormInput type="text" label={'Client secret'} value={clientSecret} onInputChange={(event) => onSecretChange(event)}></FormInput>
          </FormField>
        </FormRow>
        <FormRow className='justify-center'>
          <FormField>
            <AppButton label={'Proceed'} onClickEvent={onSubmit}></AppButton>
          </FormField>
        </FormRow>
      </Box>
    </div>
  )
}