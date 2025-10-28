import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import LanguageIcon from '@mui/icons-material/Language';
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import MovieReviews from "../movieReviews";
import ActorPaper from "../actorPaper";
import Grid from "@mui/material/Grid";

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

const chip = { margin: 0.5 };

function MovieDetails({ movie }) {
    const [drawerOpen, setDrawerOpen] = useState(false);
    return (
        <>
            <Paper sx={{ ...root }}>
                <Typography variant="h5" component="h3" sx={{ fontWeight: "bold" }}>
                    Overview
                </Typography>
                <Typography variant="h6" component="p">
                    {movie.overview}
                </Typography>
            </Paper>
            <Paper sx={{ padding: 1.5, margin: 1 }}>
                <Typography variant="h5" component="h3" sx={{ fontWeight: "bold", textAlign: "center" }}>
                    Details
                </Typography>
                <Typography component="ul" sx={{ ...root, padding: 0.5 }} >
                    <li>
                        <Chip label="Genres" sx={{ ...chip }} color="primary" />
                    </li>
                    {movie.genres.map((g) => (
                        <li key={g.name}>
                            <Chip label={g.name} sx={{ ...chip }} />
                        </li>
                    ))}
                </Typography>
                <Typography component="ul" sx={{ ...root, padding: 0.5 }}>
                    <Chip icon={<AccessTimeIcon />} label={`${movie.runtime} min.`} />
                    <Chip
                        icon={<MonetizationIcon />}
                        label={`${movie.revenue.toLocaleString()}`}
                    />
                    <Chip
                        icon={<StarRate />}
                        label={`${movie.vote_average} (${movie.vote_count})`}
                    />
                    <Chip label={`Released: ${movie.release_date}`} />
                    <Chip icon={<LanguageIcon />} label={`Original Language: ${movie.original_language}`} />
                </Typography>
                <Typography component="ul" sx={{ ...root, padding: 0.5 }} >
                    <li>
                        <Chip label="Production Countries" sx={{ ...chip }} color="primary" />
                    </li>
                    {movie.production_countries.map((pc) => (
                        <li key={pc.name}>
                            <Chip label={pc.name} sx={{ ...chip }} />
                        </li>
                    ))}
                </Typography>
            </Paper>
            <Fab
                color="secondary"
                variant="extended"
                onClick={() => setDrawerOpen(true)}
                sx={{
                    position: 'fixed',
                    bottom: '1em',
                    right: '1em'
                }}
            >
                <NavigationIcon />
                Reviews
            </Fab>
            <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <MovieReviews movie={movie} />
            </Drawer>

            <Paper sx={{ ...papers }}>
                <Typography variant="h5" component="h3" sx={{ fontWeight: "bold", textAlign: "center" }}>
                    Cast
                </Typography>
                <Grid container >
                    {movie.credits.cast.map((actor) => (
                        <Grid key={actor.id} size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}>
                            <ActorPaper actor={actor} />
                        </Grid>
                    ))}
                </Grid>
            </Paper>


        </>
    );
};

export default MovieDetails;
