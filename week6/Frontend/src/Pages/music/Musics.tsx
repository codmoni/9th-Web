import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLPList } from "../../apis/lps/caching/queryHooks";
import MusicCard from "../../Components/MusicCard";
import SortToggle from "../../Components/buttons/SortToggle";

const Musics = () => {
    const navigate = useNavigate();
    const [order, setOrder] = useState<"asc" | "desc">("asc");

    const { 
        data: musics, 
        isPending, 
        isError, 
        error, 
        isFetching
     } = useLPList({cursor: 0, limit: 15, order});
    
    const showLPDetail = (lpId: number) => {
        if (!isFetching && lpId) navigate(`/music/${lpId}`);
    }

    if (isFetching) return <p>Refreshing music list...</p>;

    if (isPending) return <p>Loading music list...</p>;

    if (isError) return <p>Error loading music list: {error.message}</p>;

    return (
        <>
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
            {/* toggle */}
            <div className="mt-4 flex items-center justify-end gap-3">
                <SortToggle sort={order} onChange={setOrder} />
            </div>

            {/* Grid */}
            <section className="p-3 sm:p-4">
                <ul className="grid grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
                    {musics.data.map((music) => (
                        <MusicCard
                            key={music.id}
                            title={music.title}
                            createdAt={music.createdAt}
                            likes={music.likes}
                            thumbnail={music.thumbnail}
                            onClick={() => showLPDetail(music.id)}
                        />
                    ))}
                </ul>
            </section>
        </div>
        </>
    )
}

export default Musics;