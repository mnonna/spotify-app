import { ChangeEvent, FC } from "react";
import '../../scss/form/formInput.scss';

interface InputProps {
  type: 'text' | 'number' | 'email' | 'password',
  label: string,
  value?: string | '' | 0,
  classes?: Array<string>,
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void, // Change the return type of the function to void
}

const FormInput: FC<InputProps> = ({
  label, 
  value = '',
  classes = [],
  onInputChange
}) => {
  let classNames = ['formInput'];
  if (value && value !== '') classNames.push('formInput--filled');

  if (classes) classNames = [...classNames, ...classes];

  return (
    <div className={classNames.join(' ')}>
      <input className="formInput__input" type="text" onChange={onInputChange} value={value || ''} />
      <label className="formInput__label">{label}</label>
    </div>
  )
}

export default FormInput;
