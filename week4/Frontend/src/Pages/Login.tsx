import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthInput from '../Components/forms/AuthInput';
import SubmitButton from '../Components/buttons/SubmitButton';
import useInputValidation from '../Hooks/useInputValidation';
import { api } from '../axios';
import clsx from 'clsx';

// 각 input의 유효성 검사 결과를 저장하는 객체 타입
type InvalidMap = Record<string, boolean>;

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [invalid, setInvalid] = useState<InvalidMap>({});

    const isDisabled = Object.keys(invalid).length > 0 || !formData.email || !formData.password;

    // 디버깅용
    useEffect(() => {
        console.log('invalid:', invalid);
    }, [invalid]);

    // 실시간 유효성 검사
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        const isValid = useInputValidation({ value, name }); // 커스텀 훅 사용
        setInvalid(prev => {
            if(isValid) {
                const { [name]: _, ...rest } = prev; // 유효하면 해당 필드 제거
                return rest;
            }
            else {
                return { ...prev, [name]: true }; // 유효하지 않으면 추가
            }
        });
    }

    // 폼 제출 핸들러
    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;

        // 브라우저 기본 검사
        if(!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        // 커스텀 훅 검사
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
        api.post('/auth/signin', payload, { withCredentials: true })
            .then(response => {
                console.log('Login successful:', response.data);
                const accessToken = response.data.accessToken;
                const refreshToken = response.data.refreshToken;

                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);

                navigate('/'); 
            })
            .catch(error => {
                console.error('Login failed:', error);
                alert('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.');
            });
    }

    return(
        <>
        <section className="mt-6">
            {/* 헤더 */}
            <div className='mb-6 flex items-center justify-center relative'>
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="absolute left-0 grid place-items-center rounded-full p-2 hover:bg-gray-200 text-gray-600"
                >
                    <span className="material-icons">뒤로가기</span>
                </button>
                <h2 className='text-lg font-semibold'>로그인</h2>
            </div>

            {/* Google Login */}
            <button
                type="button"
                className="w-full h-11 rounded-md border border-white/40 text-white flex items-center justify-center gap-2 bg-transparent hover:bg-white/5 active:bg-white/10 transition"
            >
                <span className="text-base">G</span>
                <span className="text-sm">Google로 로그인</span>
            </button>

            {/* Divider */}
            <div className="my-5 flex items-center gap-2">
                <span className="h-px flex-1 bg-white/25"/>
                <span className="text-xs text-white/70">OR</span>
                <span className="h-px flex-1 bg-white/25"/>
            </div>

            <form name="login-form" onSubmit={handleFormSubmit} noValidate>
                <div className="space-y-4">
                    <AuthInput
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        placeholder="이메일을 입력해주세요!"
                        errorMessage="올바른 이메일 형식을 입력해주세요."
                        invalid={!!invalid.email}
                        onChange={handleInputChange}
                    />
                    
                    <AuthInput
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        placeholder="비밀번호를 입력해주세요!"
                        errorMessage="비밀번호는 6자 이상이어야 합니다."
                        invalid={!!invalid.password}
                        onChange={handleInputChange}
                    />
                </div>

                {/* Submit Button */}
                <div className="mt-5">
                    <SubmitButton value="로그인" disabled={isDisabled}/>
                </div>
            </form>
        </section>
        </>
    )
}

export default Login;