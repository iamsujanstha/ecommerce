/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { FormControlProps } from '@/config'
import { Button } from '@/components/ui/button'


type CommonFormProps<T extends Record<string, any>> = {
  formControls: FormControlProps[];
  formData: T;
  setFormData: React.Dispatch<React.SetStateAction<T>>;
  onSubmit: () => void;
  buttonText: string;
};

const CommonForm = <T extends Record<string, any>>({ formControls, formData, setFormData, onSubmit, buttonText = 'Submit' }: CommonFormProps<T>) => {

  const handleChange = (name: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
            value={formData[field.name] || ''}
            onChange={handleChange(field.name)}
          />
        );

      case 'textarea':
        return (
          <Textarea
            name={field.name}
            placeholder={field.placeholder}
            id={field.name}
            value={formData[field.name] || ''}
            onChange={handleChange(field.name)}
          />
        );

      case 'select':
        return (
          <Select
            onValueChange={(value) => handleChange(field.name)({ target: { value } } as any)}
            value={formData[field.name] || ''}
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
    <form onSubmit={onSubmit}>
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
