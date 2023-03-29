
type ISubmitButton = {
    label:string;
}


export function SubmitButton({label}:ISubmitButton) {
    return (
        <button className='bg-green-500 py-2 px-6 rounded-lg'>{label}</button>
    )
}