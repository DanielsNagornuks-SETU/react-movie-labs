import Grid from "@mui/material/Grid";
import { getActor } from "../api/tmdb-api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from 'react-router';
import Spinner from '../components/spinner'
import ActorHeader from "../components/headerActor";

function ActorPage(props) {
    const { id } = useParams();

    const { data: actor, error, isPending, isError } = useQuery({
        queryKey: ['actor', { id: id }],
        queryFn: getActor,
    });

    if (isPending) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    console.log(actor);
    return (
        <>
            <ActorHeader actor={actor} />

            <Grid container spacing={5} style={{ padding: "15px" }}>
                <Grid size={{ xs: 3 }}>
                    
                </Grid>

                <Grid size={{ xs: 9 }}>
                    
                </Grid>
            </Grid>
        </>
    );
};

export default ActorPage;
