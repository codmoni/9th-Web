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
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AuthInput = (
    { id, name, type, value, placeholder, errorMessage, invalid, onChange }: AuthInputProps
) => {

    const showError = invalid === true;

    return (
        <>
            <input 
                id={id}
                name={name}
                value={value}
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                required
            />
            {showError && errorMessage && <span>{errorMessage}</span>}
        </>
    )
}

export default AuthInput;