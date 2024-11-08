export type OptionType = {
  id: number;
  value: string;
}

export type FormControlProps = {
  name: string;
  label: string;
  placeholder: string;
  componentType: 'input' | 'textarea' | 'select';
  type?: 'text' | 'email' | 'password' | 'number' | 'date';
  options?: OptionType[];
}

export const registerFormControls: FormControlProps[] = [
  {
    name: 'userName',
    label: 'User Name',
    placeholder: 'Enter your user name',
    componentType: 'input',
    type: 'text'
  },
  {
    name: 'email',
    label: 'Email',
    placeholder: 'Enter your email',
    componentType: 'input',
    type: 'email'
  },
  {
    name: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
    componentType: 'input',
    type: 'password'
  },
  // {
  //   name: 'select',
  //   label: 'select',
  //   placeholder: 'Please select',
  //   componentType: 'select',
  //   options: [{ id: 1, value: 'Value1' }, { id: 2, value: 'Value2' }]
  // }
]

export const loginFromControls: FormControlProps[] = [
  {
    name: 'email',
    label: 'Email',
    placeholder: 'Enter your email',
    componentType: 'input',
    type: 'email'
  },
  {
    name: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
    componentType: 'input',
    type: 'password'
  }
]