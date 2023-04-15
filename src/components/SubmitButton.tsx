import { FormEvent } from "react";

interface ISubmitButton {
    label: string;
    handleSubmit?(value:FormEvent): void;
    disabled?: boolean;
}


export function SubmitButton({ label, handleSubmit, disabled = false }: ISubmitButton) {
    return (
        <button
            type="submit"
            disabled={disabled} onClick={handleSubmit}
            className='bg-green-500 disabled:bg-green-300 transition-colors py-2 px-6 rounded-lg'
        >
            {label}
        </button>
    )
}