import React, { useState } from 'react';
import useInputValidation from '../../Hooks/useInputValidation';

type AuthInputProps = {
    id: string;
    name: string;
    type: string;
    value: string;
    placeholder?: string;
    errorMessage?: string;
    invalid?: boolean;
}

const AuthInput = (
    { id, name, type, value, placeholder, errorMessage, invalid }: AuthInputProps
) => {
    const [inputValue, setInputValue] = useState<string>(value);

    const showError = invalid === true;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const returnInputTagByType = (type: string): any => {
        switch (type) {
            case 'email':
                return (
                    <input 
                        id={id}
                        name={name}
                        value={inputValue}
                        type="email" 
                        placeholder={placeholder}
                        onChange={handleInputChange}
                        // required
                    />
                );
            case 'password':
                return (
                    <input
                        id={id}
                        name={name}
                        value={inputValue}
                        type="password"
                        placeholder={placeholder}
                        onChange={handleInputChange}
                        // minLength={6}
                        required
                    />
                );
        }
    }

    return (
        <>
            {returnInputTagByType(type)}
            {showError && errorMessage && <span>{errorMessage}</span>}
        </>
    )
}

export default AuthInput;