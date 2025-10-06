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
            className={clsx(
                "w-full h-11 rounded-md text-sm font-semibold transition-colors duration-200",
                disabled
                    ? "bg-neutral-800 text-neutral-500 cursor-not-allowed border border-neutral-700"
                    : "bg-pink-500 hover:bg-pink-600 active:bg-pink-700 text-white shadow-[0_0_10px_rgba(236,72,153,0.4)]"
            )}
        >
            {value}
        </button>
        </>
    )
}

export default SubmitButton;