import { ChangeEvent, useState, FC } from "react";
import '../../scss/form/formInput.scss';

interface InputProps {
  type: 'text' | 'number' | 'email' | 'password',
  label: string,
  value: string,
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void,
}

const FormInput: FC<InputProps> = ({
  label, 
  value,
  onInputChange
}) => {
  let classNames = ['formInput'];
  if (value && value !== '') classNames.push('formInput--filled');

  return (
    <div className={classNames.join(' ')}>
      <input className="formInput__input" type="text" onChange={onInputChange} value={value || ''}/>
      <label className="formInput__label">{label}</label>
    </div>
  )
}

export default FormInput;