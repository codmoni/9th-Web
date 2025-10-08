import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod/v3";
import SubmitButton from "../Components/buttons/SubmitButton";
import GoogleLoginButton from "../Components/buttons/GoogleLoginButton";
import { api } from "../axios";
import type { AxiosResponse } from "axios";
import type { SignupPayload, SignupResponse } from "../types/user";

const schema = z.object({
    email: z.string().email({ message: "올바른 이메일 형식을 입력해주세요." }),
    password: z.string().min(6, { message: "비밀번호는 6자 이상이어야 합니다." }),
    checkPassword: z.string().min(6, { message: "비밀번호 확인은 6자 이상이어야 합니다." }),
    name: z.string().max(20, { message: "이름은 최대 20자까지 가능합니다." }),
}).refine((data) => data.password === data.checkPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["checkPassword"],
})

const Signup = () => {
    const navigate = useNavigate();
    const [signupStep, setSignupStep] = useState(1); // 1: 이메일, 2: 비밀번호, 3: 프로필
    const profileSrc = "/src/assets/profile-icon.png";

    const { register, handleSubmit, formState: { errors }, trigger } = useForm({
        resolver: zodResolver(schema),
        mode: "onChange",
    });

    // 단계 별 유효성 검증 실행 
    const goNextStep = async (step: number) => {
        let ok;
        switch (step) {
            case 1:
                ok = await trigger("email");
                if (ok) setSignupStep((prev) => prev + 1);
                break;
            case 2:
                ok = await trigger("password");
                ok = ok && await trigger("checkPassword");
                if (ok) setSignupStep((prev) => prev + 1);
                break;
            default:
                break;
        }
    }

    // 전체 제출 함수
    const onSubmit = (data: any) => {
        console.log(data);
    };

    const renderStep = () => {
        switch(signupStep) {
            case 1:
                return (
                    <>
                    <input
                        id="email"
                        type="email"
                        placeholder="이메일을 입력해주세요!"
                        {...register("email", {
                            required: "이메일은 필수 입력 항목입니다.",
                            pattern: { value: /\S+@\S+\.\S+/, message: "올바른 이메일 형식을 입력해주세요." }
                        })}
                    />
                    {errors.email && <p>{errors.email.message}</p>}
                    <button type="button" onClick={() => goNextStep(1)}>다음</button>
                    </>
                )
            case 2:
                return (
                    <>
                    <input
                        id="password"
                        type="password"
                        placeholder="비밀번호를 입력해주세요!"
                        {...register("password", {
                            required: "비밀번호는 필수 입력 항목입니다.",
                            minLength: { value: 6, message: "비밀번호는 6자 이상이어야 합니다." }
                        })}
                    />
                    {errors.password && <p>{errors.password.message}</p>}
                    <input
                        id="checkPassword"
                        type="password"
                        placeholder="비밀번호를 다시 입력해주세요!"
                        {...register("checkPassword", {
                            required: "비밀번호 확인은 필수 입력 항목입니다.",
                            minLength: { value: 6, message: "비밀번호 확인은 6자 이상이어야 합니다." }
                        })}
                    />
                    {errors.checkPassword && <p>{errors.checkPassword.message}</p>}
                    <button type="button" onClick={() => goNextStep(2)}>다음</button>
                    </>
                )
            case 3:
                return (
                    <>
                        <img src={profileSrc} alt="프로필"></img>
                        <button type="button" onClick={onSubmit}>제출</button>
                    </>
                )
            default:
                return null;
        }
    }

    return(
        <>
        <section className="mt-6">
            {/* Header */}
            <div className='mb-6 flex items-center justify-center relative'>
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="absolute left-0 grid place-items-center rounded-full p-2 hover:bg-gray-200 text-gray-600"
                >
                    <span className="material-icons">뒤로가기</span>
                </button>
                <h2 className='text-lg font-semibold'>회원가입</h2>
            </div>

            {/* Google Login */}
            <GoogleLoginButton />

            {/* Divider */}
            <div className="my-5 flex items-center gap-2">
                <span className="h-px flex-1 bg-white/25"/>
                <span className="text-xs text-white/70">OR</span>
                <span className="h-px flex-1 bg-white/25"/>
            </div>

            {/* Signup Form */}
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                {renderStep()}
            </form>
        </section>
        </>
    )
}

export default Signup;