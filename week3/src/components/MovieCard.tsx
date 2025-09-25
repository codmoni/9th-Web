type MovieCardProps = {
    title: string;
    overview: string;
    posterPath: string | null;
}

const MovieCard = ({title, overview, posterPath}: MovieCardProps) => {
    return (
        <>
        <div className="group relative overflow-hidden rounded-xl bg-white shadow transition hover:shadow-lg">
            {posterPath && (
                <img
                    src = {`https://image.tmdb.org/t/p/w200${posterPath}`}
                    alt = {title}
                    className="w-full h-full object-cover transition duration-300 group-hover:blur-sm group-hover:scale-105"
                />
            )}
        

            <div className="pointer-events-none absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/30"/>

            <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 transition duration-300 group-hover:opacity-100">
                <h2 className="text-white text-lg font-semibold">{title}</h2>
                <p className="mt-2 text-white/90 text-sm max-h-24 overflow-hidden">{overview}</p>
            </div>
        </div>
        </>
    )
}

export default MovieCard;