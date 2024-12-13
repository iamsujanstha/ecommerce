import React from 'react';

type ErrorMessageProps = {
  error?: string;
  id?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error, id }) => {
  if (!error) return null;

  return (
    <span id={id} className="text-red-500 text-xs">
      {error}
    </span>
  );
};

export default ErrorMessage;
