import clsx from "clsx";

type SubmitButtonProps = {
    value: string;
    disabled?: boolean;
}

// 제출 버튼 
const SubmitButton = ({ value, disabled }: SubmitButtonProps) => {


    return(
        <>
        <button
            type="submit"
            disabled={disabled}
            onClick={() => console.log('disabled:', disabled)}
            className={clsx("w-full bg-gray-900 text-white hover:bg-gray-800 py-2 px-4 rounded transition-colors", {
                "opacity-50 cursor-not-allowed": disabled
            })}
        >
            {value}
        </button>
        </>
    )
}

export default SubmitButton;