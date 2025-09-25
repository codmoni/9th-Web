import type { MovieResponse } from "../types/Movie";
import { request } from "../utils/apiRequest";

export const getPopularMovies = async () => {
    return request<MovieResponse>({
        url: "https://api.themoviedb.org/3/movie/popular",
        method: "GET",
        params: {
            language: "ko-KR",
            page: 1,
        }
    })
}