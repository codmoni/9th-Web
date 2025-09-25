import { request } from "../utils/apiRequest";
import type { UpcomingResponse } from "../types/Movie";

export const getUpcomingMovies = async (page: number) => {
    return request<UpcomingResponse>({
        url: "https://api.themoviedb.org/3/movie/upcoming",
        method: "GET",
        params: {
            language: "ko-KR",
            page: page,
        }
    });
};
