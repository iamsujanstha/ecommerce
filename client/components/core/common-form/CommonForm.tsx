/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useForm, Controller, DefaultValues, Path, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Icons } from '@/utility/icons.config';
import { FormControlProps } from '@/config';
import ErrorMessage from '@/components/core/common-form/ErrorMessage';
import { ZodSchema } from 'zod';


export type CommonFormProps<T extends Record<string, any>> = {
  formControls: FormControlProps<T>[];
  formData: T;
  setFormData: React.Dispatch<React.SetStateAction<T>>;
  onSubmit: (data: T) => void;
  buttonText?: string;
  validationSchema?: ZodSchema<T>;
};

const CommonForm = <T extends Record<string, string>>({
  formControls,
  formData,
  // setFormData,
  onSubmit,
  buttonText = 'Submit',
  validationSchema,
}: CommonFormProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<T>({
    resolver: validationSchema ? zodResolver(validationSchema) : undefined,
    defaultValues: formData as DefaultValues<T> || {},
  });

  const onSubmitHandler: SubmitHandler<T> = (data) => {
    onSubmit(data);
  };

  const renderInputs = (field: FormControlProps<T>) => {
    const fieldError = errors[field.name as Path<T>];
    const errorId = fieldError ? `${field.name}-error` : undefined;

    switch (field.componentType) {
      case 'input':
        return (
          <Controller
            name={field.name}
            control={control}
            render={({ field: controllerField }) => (
              <div className="relative">
                <Input
                  {...controllerField}
                  placeholder={field.placeholder}
                  type={field.type === 'password' && showPassword ? 'text' : field.type || 'text'}
                  aria-invalid={!!fieldError}
                  aria-describedby={errorId}
                />
                {field.type === 'password' && (
                  <span
                    className="absolute top-2.5 right-4 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <Icons.visible /> : <Icons.inVisible />}
                  </span>
                )}
                <ErrorMessage error={fieldError?.message?.toString()} id={errorId} />
              </div>
            )}
          />
        );

      case 'textarea':
        return (
          <Controller
            name={field.name}
            control={control}
            render={({ field: controllerField }) => (
              <div>
                <Textarea
                  {...controllerField}
                  placeholder={field.placeholder}
                  aria-invalid={!!fieldError}
                  aria-describedby={errorId}
                />
                <ErrorMessage error={fieldError?.message?.toString()} id={errorId} />
              </div>
            )}
          />
        );

      case 'select':
        return (
          <Controller
            name={field.name}
            control={control}
            render={({ field: controllerField }) => (
              <Select {...controllerField}>
                <SelectTrigger
                  className="w-full"
                  aria-invalid={!!fieldError}
                  aria-describedby={errorId}
                >
                  <SelectValue placeholder={field.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {field.options?.map((option) => (
                    <SelectItem key={option.id} value={option.id}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
                <ErrorMessage error={fieldError?.message?.toString()} id={errorId} />
              </Select>
            )}
          />
        );

      default:
        return null;
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      aria-label="Dynamic Form"
    >
      <div className="flex flex-col gap-3">
        {formControls.map((field) => (
          <div className="grid w-full gap-1.5" key={String(field.name)}>
            <Label htmlFor={String(field.name)} className="mb-1">
              {field.label}
            </Label>
            {renderInputs(field)}
          </div>
        ))}
      </div>
      <Button type="submit" className="w-full mt-4">
        {buttonText}
      </Button>
    </form>
  );
};

export default CommonForm;
