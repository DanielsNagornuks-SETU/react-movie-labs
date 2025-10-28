import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { getActor } from "../api/tmdb-api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from 'react-router';
import Spinner from '../components/spinner'
import ActorHeader from "../components/headerActor";
import img from "../images/actor-image-placeholder.png"
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import MoviePaper from "../components/moviePaper";

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

    const root = {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        listStyle: "none",
        padding: 1.5,
        margin: 1,
    };

    const papers = {
        justifyContent: "center",
        flexWrap: "wrap",
        listStyle: "none",
        padding: 1.5,
        margin: 1,
    }

    const detail = {
        ...root,
        margin: 0,
        padding: 0,
        justifyContent: "left"
    }

    function getGender(num) {
        switch (num) {
            case 0: return "Not specified"
            case 1: return "Female"
            case 2: return "Male"
            case 3: return "Non-binary"
        }
    }

    console.log(actor);
    return (
        <>
            <ActorHeader actor={actor} />

            <Grid container spacing={5} style={{ padding: "15px" }}>
                <Grid size={{ xs: 3 }}>
                    <Card>
                        <CardMedia
                            sx={{ height: 700 }}
                            image={
                                actor.profile_path
                                    ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                                    : img
                            }
                        />
                        <CardContent>
                            <Typography variant="h6" component="p" sx={{ ...detail }}>
                                Gender: {getGender(actor.gender)}
                            </Typography>
                            <Typography variant="h6" component="p" sx={{ ...detail }}>
                                Birthday: {actor.birthday}
                            </Typography>
                            {actor.deathday !== null ?
                                <Typography variant="h6" component="p" sx={{ ...detail }}>
                                    Deathday: {actor.deathday}
                                </Typography>
                                : null}
                            <Typography variant="h6" component="p" sx={{ ...detail }}>
                                Known for: {actor.known_for_department}
                            </Typography>
                            <Typography variant="h6" component="p" sx={{ ...detail }}>
                                Place of birth: {actor.place_of_birth}
                            </Typography>
                            <Typography variant="h6" component="p" sx={{ ...detail }}>
                                Popularity: {actor.popularity}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 9 }}>
                    {actor.biography !== "" ?
                        <Paper sx={{ ...root }}>
                            <Typography variant="h5" component="h3" sx={{ fontWeight: "bold" }}>
                                Biography
                            </Typography>
                            <Typography variant="h6" component="p" >
                                {actor.biography}
                            </Typography>
                        </Paper>
                        : null}
                    <Paper sx={{ ...papers }}>
                        <Typography variant="h5" component="h3" sx={{ fontWeight: "bold", textAlign: "center" }}>
                            Movies Cast In
                        </Typography>
                        <Grid container >
                            {actor.movie_credits.cast.map((movie) => (
                                <Grid key={movie.id} size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}>
                                    <MoviePaper movie={movie}></MoviePaper>
                                </Grid>
                            ))}
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
};

export default ActorPage;
