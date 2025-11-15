import { useState } from "react";

type ValidateFn = (value: string) => string | null;

interface UseFormProps {
  inputName: string;
  inputType: string;
  validate: ValidateFn;
}

interface UseFormReturn {
  value: string;
  error: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputProps: {
    name: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
}

export function useForm({
  inputName,
  inputType,
  validate,
}: UseFormProps): UseFormReturn {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    setError(validate(newValue));
  };

  return {
    value,
    error,
    onChange,
    inputProps: {
      name: inputName,
      type: inputType,
      value,
      onChange,
    },
  };
}
