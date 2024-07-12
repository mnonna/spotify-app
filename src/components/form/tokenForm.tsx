'use client';

import { FC, useState} from 'react';
import FormRow from './formRow';
import AppButton from '../button/AppButton';
import Box from '../box/box';

interface TokenFormProps {
  code?: string,
  error?: string,
}

const TokenForm: FC<TokenFormProps> = ({code, error}) => {
  const [errorMessage, setErrorMessage] = useState('');

  async function getSpotifyToken(code: string, error: string) {
    const data = {
      code
    }
  
    const req = await fetch(`/api/authorize/token`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  
    const res = await req.json();
    const { error_description } = res;
    const tokenError = res.error;
  
    if (tokenError || error_description) {
      setErrorMessage(error_description);
    } else {
      window.location.assign('/dashboard');
    }
  }

  return (
    <form className="form">
      <Box className='-auth-form'>
        <FormRow>
          <h1 className="text-2xl">Please click button below to proceed further authorization</h1>
        </FormRow>
        <FormRow>
          <AppButton label={'Proceed'} onClickEvent={() => getSpotifyToken(code, error)}></AppButton>
        </FormRow>
        {errorMessage &&
          <FormRow>
            <p className="form__error">{ errorMessage }</p>
          </FormRow>
        }
      </Box>
    </form>
  )
}

export default TokenForm;