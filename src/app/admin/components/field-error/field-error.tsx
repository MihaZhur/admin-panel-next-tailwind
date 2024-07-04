import { FormState } from '@/utils/from-to-error-to-form-state';

interface FieldErrorProps {
    formState: FormState;
    name: string;
}

export const FieldError = ({ formState, name }: FieldErrorProps) => {
    return <span className="text-xs text-red-400">{formState.fieldErrors[name]?.[0]}</span>;
};
