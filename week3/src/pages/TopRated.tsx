import { useState, useEffect } from "react";
import type { Movie, TopRatedResponse } from "../types/Movie";
import useCustomFetch from "../hooks/useCustomFetch";
import MovieCard from "../components/MovieCard";
import LoadingSpinner from "../components/LoadingSpinner";
import PageNavigator from "../components/PageNavigator";

// 평점 높은 순 영화 페이지
const TopRated = () => {
    const [page, setCurrentPage] = useState<number>(1);

    const { data, error, loading } = useCustomFetch<TopRatedResponse>(
        {
            url: "/movie/top_rated",
            method: "GET",
            params: {
                language: "ko-KR",
                page: page,
            }
        },
        [page]
    );

    const movies: Movie[] = data?.results || [];
    const currentPage = data?.page || 1;
    const totalPages = data?.total_pages || 1;

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    }

    if (error) return <p>에러 발생: {error.message}</p>
    if (loading) return <LoadingSpinner />;

    return (
        <>
        <PageNavigator currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        <div className="grid grid-cols-6 gap-6">
            {movies?.map((movie) => (
                <MovieCard
                    key = {movie.id}
                    movieId = {movie.id}
                    title = {movie.title}
                    overview = {movie.overview}
                    posterPath = {movie.poster_path}
                />
            ))}
        </div>
        </>
    )
}

export default TopRated;