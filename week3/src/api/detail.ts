import { request } from "../utils/apiRequest";
import type { MovieDetailWithCredits } from "../types/MovieDetail";

export const getMovieDetail = async (movieId: number) => {
    return request<MovieDetailWithCredits>({
        url: `https://api.themoviedb.org/3/movie/${movieId}`,
        method: "GET",
        params: {
            append_to_response: "credits",
            language: "ko-KR"
        }
    });
}
