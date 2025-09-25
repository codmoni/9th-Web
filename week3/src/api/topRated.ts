import { request } from "../utils/apiRequest";
import type { TopRatedResponse } from "../types/Movie";

export const getTopRatedMovies = async () => {
    return request<TopRatedResponse>({
        url: "https://api.themoviedb.org/3/movie/top_rated",
        method: "GET",
        params: {
            language: "ko-KR",
            page: 1,
        }
    });
};