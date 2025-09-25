import { useState, useEffect } from "react";
import type { Movie } from "../types/Movie";
import { getPopularMovies } from "../api/popular";

// 인기 영화 페이지
const Popular = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [error, setError] = useState<string|null>(null);

    useEffect(() => {
        const fetchMovies = async () => {
            const { data, error } = await getPopularMovies();
            
            if (error) {
                setError(error);
            } else if (data) {
                setMovies(data.results);
            }

            console.log(data);
        }
        fetchMovies();
    }, []);

    if (error) return <p>에러 발생: {error}</p>

    return (
        <>
            <h2>Movies의 페이지입니다.</h2>
            <p>영화 데이터를 불러옵니다.</p>
            <div className="grid grid-cols-6 gap-6">
                {movies?.map((movie) => (
                    <div 
                        key={movie.id}
                        className="group relative overflow-hidden rounded-xl bg-white shadow transition hover:shadow-lg"
                    >
                        {movie.poster_path && (
                            <img
                                src = {`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                alt = {movie.title}
                                className="w-full h-full object-cover transition duration-300 group-hover:blur-sm group-hover:scale-105"
                            />
                        )}

                        <div className="pointer-events-none absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/30"/>
                        
                        <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 transition duration-300 group-hover:opacity-100">
                            <h2 className="text-white text-lg font-semibold">{movie.title}</h2>
                            <p className="mt-2 text-white/90 text-sm max-h-24 overflow-hidden">{movie.overview}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Popular;