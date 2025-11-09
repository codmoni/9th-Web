import { useEffect } from "react";
import { getLps, getLpsByUser, getMyLps, getLpsByTag, getLpDetail } from "../../apis/lps/queries";

const Musics = () => {
    useEffect(() => {
        const fetchLps = async () => {
            const lps = await getLpDetail(1, {});

            console.log('Fetched LPs:', lps);
        };

        fetchLps();
    }, []);

    return (
        <>
            <h1>Musics</h1>
        </>
    )
}

export default Musics;