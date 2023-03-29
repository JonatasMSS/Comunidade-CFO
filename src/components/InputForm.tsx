import { FormikErrors, FormikTouched } from "formik";




interface IInputForm extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>{
    label:string;
    htmlfor: string | undefined;
    inputType: React.HTMLInputTypeAttribute | undefined;
    placeholder: string | undefined;
    error?:string;
    
}



export function InputForm({...InputProps}:IInputForm) {
    return (
        <div className='flex flex-col gap-1 w-full'>
            <label className='text-xl font-bold w-full text-left' htmlFor={InputProps.htmlfor}>{InputProps.label}</label>
            <input
                placeholder={InputProps.placeholder}
                type={InputProps.inputType}
                id={InputProps.htmlfor}
                onChange={InputProps.onChange}
                onBlur={InputProps.onBlur}
                value={InputProps.value}
                className='w-full bg-input-DF/30 rounded-md p-2 outline-none border-2 border-input-DF-border/50 
                focus:bg-input-DF/80 focus:border-input-DF-border/90 transition-colors' />
                
                <span className="text-red-400 font-K2D font-semibold ">{InputProps.error}</span>
                
        </div>
    )
}