import React, { useState, useEffect } from 'react';
import AuthInput from '../Components/forms/AuthInput';
import SubmitButton from '../Components/buttons/SubmitButton';
import useInputValidation from '../Hooks/useInputValidation';

// 각 input의 유효성 검사 결과를 저장하는 객체 타입
type InvalidMap = Record<string, boolean>;

const Login = () => {
    const [invalid, setInvalid] = useState<InvalidMap>({});

    // 폼 제출 핸들러
    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;

        // 기본 HTML5 유효성 검사
        if(!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const formData = new FormData(form); // 폼 데이터 수집
        const nextInvalid: InvalidMap = {};

        // 각 입력값에 대해 유효성 검사 실시
        formData.forEach((value, key) => {
            const isValid = useInputValidation({ value: String(value), name: String(key) }); // 커스텀 훅 사용
            if (!isValid) nextInvalid[key] = true; // 유효하지 않으면 invalid 객체에 기록
        })

        setInvalid(nextInvalid);

        // 모두 통과 시 api 요청 넣기
        const payload = Object.fromEntries(formData.entries()); // 폼 데이터를 객체로 변환
        console.log(payload);
        // 로그인 요청 보내기
    }

    return(
        <>
        <form name="login-form" onSubmit={handleFormSubmit}>
            <AuthInput
                id="email"
                name="email"
                type="email"
                value=""
                placeholder="이메일을 입력해주세요!"
                errorMessage="올바른 이메일 형식을 입력해주세요."
                invalid={!!invalid.email}
            />
            <br></br>
            <AuthInput
                id="password"
                name="password"
                type="password"
                value=""
                placeholder="비밀번호를 입력해주세요!"
                errorMessage="비밀번호는 6자 이상이어야 합니다."
                invalid={!!invalid.password}
            />
            <SubmitButton value="로그인" disabled={Object.keys(invalid).length > 0}/>
        </form>
        </>
    )
}

export default Login;