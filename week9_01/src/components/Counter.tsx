import { useState } from "react";

const Counter = () => {
    const [count, setCount] = useState(0);

    const handleDecrement = () => {
        if (count < 1) return;
        setCount(count - 1);
        return;
    }

    const handleIncrement = () => {
        setCount(count + 1);
        return;
    }

    const buttonStyle = "w-6 h-6 rounded-md bg-gray-200 text-gray-500 hover:bg-gray-300 transition-colors duration-200 ease-in-out";
    
    return (
        <>
        <div className="flex items-center gap-2">
            <button onClick={handleDecrement} className={buttonStyle}>-</button>
            <span>{count}</span>
            <button onClick={handleIncrement} className={buttonStyle}>+</button>
        </div>
        </>
    )
}

export default Counter;