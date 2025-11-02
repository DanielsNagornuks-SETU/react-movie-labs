import { useState } from "react";
import Header from "../headerMovieList";
import ActorList from "../actorList";
import Grid from "@mui/material/Grid";

function ActorsPageTemplate({ actors, title }) {
    return (
        <Grid container>
            <Grid size={12}>
                <Header title={title} />
            </Grid>
            <Grid container sx={{ flex: "1 1 500px" }}>
                <ActorList actors={actors}></ActorList>
            </Grid>
        </Grid>
    );
}

export default ActorsPageTemplate;
