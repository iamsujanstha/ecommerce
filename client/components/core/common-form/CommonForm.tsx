/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { FormControlProps } from '@/config'
import { Button } from '@/components/ui/button'

export type FormDataType = {
  userName?: string;
  email: string;
  password: string;
  [key: string]: string | undefined;
};


type CommonFormProps<T extends FormDataType> = {
  formControls: FormControlProps[];
  formData: T;
  setFormData: React.Dispatch<React.SetStateAction<T>>;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  buttonText: string;
};

const CommonForm = <T extends FormDataType>({ formControls, formData, setFormData, onSubmit, buttonText = 'Submit' }: CommonFormProps<T>) => {
  const handleChange = (name: keyof T) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  function renderInputs(field: FormControlProps) {
    switch (field.componentType) {
      case 'input':
        return (
          <Input
            name={field.name}
            placeholder={field.placeholder}
            id={field.name}
            type={field.type || 'text'}
            value={formData[field.name as keyof T] || ''}
            onChange={handleChange(field.name as keyof T)}
          />
        );

      case 'textarea':
        return (
          <Textarea
            name={field.name}
            placeholder={field.placeholder}
            id={field.name}
            value={formData[field.name as keyof T] || ''}
            onChange={handleChange(field.name as keyof T)}
          />
        );

      case 'select':
        return (
          <Select
            onValueChange={(value) => handleChange(field.name as keyof T)({ target: { value } } as React.ChangeEvent<HTMLInputElement>)}
            value={formData[field.name as keyof T] || ''}
          >
            <SelectTrigger className='w-full'>
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map(option => (
                <SelectItem key={option.id} value={option.value}>{option.value}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      default:
        return null;
    }
  }

  return (
    <form onSubmit={(event) => {
      event.preventDefault();
      onSubmit(event);
    }}>
      <div className='flex flex-col gap-3'>
        {formControls.map(field => (
          <div className='grid w-full gap-1.5' key={field.name}>
            <Label htmlFor={field.name} className='mb-1'>
              {field.label}
            </Label>
            {renderInputs(field)}
          </div>
        ))}
      </div>
      <Button type='submit' className='w-full mt-4'>{buttonText}</Button>
    </form>
  );
}

export default CommonForm;
