import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { lpKeys } from "../../apis/lps/keys";
import { getLps, getLpsByUser, getMyLps, getLpsByTag, getLpDetail } from "../../apis/lps/queries";

const Musics = () => {
    const { data, isPending, isError, error, isFetching, refetch } = useQuery({
        queryKey: lpKeys.list(),
        queryFn: getLps
    });

    return (
        <>
            <h1>Musics</h1>
            {isPending && <p>Loading...</p>}
            {isError && <p>Error: {error.message}</p>}
            {data && (
                <ul>
                    {data.data.map((music) => (
                        <li key={music.id}>{music.title}</li>
                    ))}
                </ul>
            )}
        </>
    )
}

export default Musics;