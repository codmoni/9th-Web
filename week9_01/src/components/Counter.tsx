import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { increase, decrease, removeItem } from "../store/cartSlice";

type CounterProps = {
    id: string;
};

const Counter = ({ id }: CounterProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const count = useSelector(
        (state: RootState) =>
            state.cart.items.find((item) => item.id === id)?.amount ?? 0
    );

    const handleDecrement = () => {
        if (count <= 1) {
            dispatch(removeItem(id));
            return;
        }
        dispatch(decrease(id));
    };

    const handleIncrement = () => {
        dispatch(increase(id));
    };

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