import { useRef, useEffect } from "react";

interface DebounceProps {
    function: (...args: any[]) => void;
    delay: number;
}

const useDebounce = ({ function: func, delay }: DebounceProps) => {
    const timeRef = useRef<number | null>(null);

    const debouncedFunction = (...args: any[]) => {
        if (timeRef.current) {
            clearTimeout(timeRef.current);
        }

        timeRef.current = setTimeout(() => {
            func(...args);
        }, delay);
    }

    useEffect(() => {
        return () => {
            if (timeRef.current) {
                clearTimeout(timeRef.current);
            }
        };
    }, []);

    return debouncedFunction;
}

export default useDebounce;