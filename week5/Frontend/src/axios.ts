import axios from "axios";
import { type AxiosRequestConfig, AxiosError, type AxiosInstance } from "axios";
import { auth } from "./auth";

// Axios 인스턴스 생성
export const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
    headers: {
        accept: 'application/json',
    }
})

// reqeuest interceptor
api.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

// race condition 방지용
let refreshPromise: Promise<void> | null = null; // 깃발(1칸 화장실...)

type Task = {
    resolve: (v? : unknown) => void,
    reject: (e?: unknown) => void,
    config: AxiosRequestConfig,
}

const taskQueue: Task[] = []; // 대기열

// refresh token
async function refresh() {
    if (!refreshPromise) {
        refreshPromise = (async  () => {
            try{ // 성공 case
                const { data } = await api.post('/auth/refresh');
                auth.setAT(data.accessToken);
                // flushQueueSuccess();
            } catch (e) {
                // flushQueueError();
                auth.logout();
                throw e;
            } finally {
                refreshPromise = null; // 깃발 내리기
            }
        })();
    }    
    return refreshPromise;
}

// flushQueue
// 배열의 첫 요소를 꺼내고 제거해.(shift)
// 성공 시 resolve, 실패 시 reject

// response interceptor
api.interceptors.response.use(
    (res) => res, // 성공 시 그대로 반환
    async (error: AxiosError) => { // 실패 시
        const original = error.config; // 원본 요청
        const waiter = addToQueue(original); // 줄 세워

        if (error.response?.status === 401) {
            try {
                await refresh();
                const at = auth.getAT();
                if (at) {
                    original.headers = original.headers ?? {};
                    original.headers.Authorization = `Bearer ${at}`;
                }

                return api(original); // 원본 요청 다시 보내
            } catch (e) {
                return Promise.reject(e);
            }
        }
    }
)