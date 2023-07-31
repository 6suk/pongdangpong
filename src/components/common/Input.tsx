import styled from 'styled-components';

type InputFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  pattern?: string;
};

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #4b5563;
`;

const Field = styled.input`
  border: 1px solid #e5e7eb;
  color: #1f2937;
  font-size: 0.875rem;
  border-radius: 0.375rem;
  width: 100%;
  padding: 0.625rem;
  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 1px #3b82f6;
  }
`;

const Input: React.FC<InputFieldProps> = ({ id, label, value, onChange, type = 'text', placeholder, pattern }) => {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Field id={id} pattern={pattern} placeholder={placeholder} type={type} value={value} onChange={onChange} />
    </div>
  );
};

export default Input;
