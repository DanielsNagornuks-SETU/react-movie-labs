import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import img from "../../images/actor-image-placeholder.png"
import { Link } from "react-router";
import Button from "@mui/material/Button";

export default function MoviePaper({ movie }) {

    return (
        <Card sx={{ margin: 1 }}>
            <CardMedia
                component="img"
                height="350"
                image={
                    movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                        : img
                }
            />
            <CardContent>
                <Grid container>
                    <Typography sx={{ fontSize: 20 }}>{movie.title}</Typography>
                </Grid>
                <Link to={`/movies/${movie.id}`}>
                    <Button variant="outlined" size="medium" color="primary" sx={{alignContent: "center"}}>
                        More Info ...
                    </Button>
                </Link>
            </CardContent>
        </Card>
    );
};
