import { useEffect } from "react";
import { useLPList } from "../../apis/lps/caching/queryHooks";
import { useNavigate } from "react-router-dom";

const Musics = () => {
    const navigate = useNavigate();
    const { data, isPending, isError, error, isFetching, refetch } = useLPList();

    useEffect(() => {
        refetch();
    }, [refetch]);

    const showLPDetail = (lpId: number) => {
        if (!isFetching && lpId) {
            navigate(`/music/${lpId}`);
        }
    }

    return (
        <>
            <h1>Musics</h1>
            {isPending && <p>Loading...</p>}
            {isError && <p>Error: {error.message}</p>}
            {data && (
                <ul>
                    {data.data.map((music) => (
                        <li 
                            key={music.id}
                            onClick={() => showLPDetail(music.id)}
                        >
                            {music.title}
                        </li>
                    ))}
                </ul>
            )}
        </>
    )
}

export default Musics;