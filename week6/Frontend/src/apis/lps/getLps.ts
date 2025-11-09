import { type ApiResponse, handleApiError, apiPrivate } from "../../shared/apiConfig/apiExport";
// lps 목록 조회 관련 api

// LP 목록 조회

// 특정 유저가 생성한 LP 목록 조회

// 내가 생성한 LP 목록 조회

// 특정 태그 관련 LP 목록 조회

import type { User } from "../../types/user";

export const getUserInfo = async (): Promise<User> => {
    try {
        const { data } = await apiPrivate.get<ApiResponse<User>>(
            '/users/me'
        );

        console.log('getUserInfo api response:', data);

        if (!data.status || !data.data) {
            throw new Error(data.message);
        }

        return data.data;
    } catch (error) {
        handleApiError(error);
        throw error;
    }
}