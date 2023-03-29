


interface IInputForm{
    label:string;
    htmlfor: string | undefined;
    inputType: React.HTMLInputTypeAttribute | undefined;
    placeholder: string | undefined;
}



export function InputForm({...InputProps}:IInputForm) {
    return (
        <div className='flex flex-col gap-2'>
            <label className='text-xl font-bold' htmlFor={InputProps.htmlfor}>{InputProps.label}</label>
            <input
                placeholder={InputProps.placeholder}
                type={InputProps.inputType}
                id={InputProps.htmlfor}
                className='bg-input-DF rounded-md p-2 outline-none border-2 border-input-DF-border/50' />
        </div>
    )
}