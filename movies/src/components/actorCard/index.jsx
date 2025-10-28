import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import img from "../../images/actor-image-placeholder.png"
import { Link } from "react-router";
import Button from "@mui/material/Button";

export default function ActorCard({ actor }) {

    return (
        <Card sx={{ margin: 1 }}>
            <CardMedia
                component="img"
                height="210"
                image={
                    actor.profile_path
                        ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                        : img
                }
            />
            <CardContent>
                <Grid container>
                    <Typography sx={{ fontSize: 20 }}>{actor.name}</Typography>
                </Grid>
                <Link to={`/actors/${actor.id}`}>
                    <Button variant="outlined" size="medium" color="primary" sx={{alignContent: "center"}}>
                        More Info ...
                    </Button>
                </Link>
            </CardContent>
        </Card>
    );
};
