import { useEffect, useState } from "react";
import { useLPList } from "../../apis/lps/caching/queryHooks";
import { useNavigate } from "react-router-dom";
import MusicCard from "../../Components/MusicCard";

const Musics = () => {
    const navigate = useNavigate();
    const { data: musics, isPending, isError, error, isFetching, refetch } = useLPList();

    useEffect(() => {
        refetch();
    }, [refetch]);

    const showLPDetail = (lpId: number) => {
        if (!isFetching && lpId) {
            navigate(`/music/${lpId}`);
        }
    }

    if (isFetching) {
        return <p>Refreshing music list...</p>;
    }

    if (isPending) {
        return <p>Loading music list...</p>;
    }

    if (isError) {
        return <p>Error loading music list: {error.message}</p>;
    }

    return (
        <>
        <div className="w-full">
            {/* toggle */}
            <div className="flex ">
                <div className="rounded-2xl">
                    <span>오래된 순</span>
                    <span>최신 순</span>
                </div>
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