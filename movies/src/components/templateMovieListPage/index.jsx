import { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid";

function MovieListPageTemplate({ movies, title, action }) {
    const [nameFilter, setNameFilter] = useState("");
    const [genreFilter, setGenreFilter] = useState("0");
    const [sortOption, setSortOption] = useState(0);
    const [sortOrder, setSortOrder] = useState(true);
    const [ratingRange, setRatingRange] = useState([0, 10]);
    const genreId = Number(genreFilter);

    let displayedMovies = movies
        .filter((m) => {
            return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
        })
        .filter((m) => {
            return genreId > 0 ? m.genre_ids.includes(genreId) : true;
        })
        .filter((m) => {
            return m.vote_average > ratingRange[0] && m.vote_average < ratingRange[1];
        });

    displayedMovies.sort((movie1, movie2) => {
        if (sortOption === 0) return movie1.title.localeCompare(movie2.title);
        else if (sortOption === 1) return new Date(movie1.release_date) - new Date(movie2.release_date);
        else return movie1.vote_average - movie2.vote_average;
    })

    if (!sortOrder) displayedMovies.reverse();

    function handleChange(type, value) {
        switch (type) {
            case "name":
                setNameFilter(value);
                break;
            case "sort":
                setSortOption(value);
                break;
            case "order":
                setSortOrder(value);
                break;
            case "rating":
                setRatingRange(value);
                break;
            default:
                setGenreFilter(value);
        }
    };

    return (
        <Grid container>
            <Grid size={12}>
                <Header title={title} />
            </Grid>
            <Grid container sx={{ flex: "1 1 500px" }}>
                <Grid
                    key="find"
                    size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
                    sx={{ padding: "20px" }}
                >
                    <FilterCard
                        onUserInput={handleChange}
                        titleFilter={nameFilter}
                        genreFilter={genreFilter}
                        sortOption={sortOption}
                        sortOrder={sortOrder}
                        ratingRange={ratingRange}
                    />
                </Grid>
                <MovieList action={action} movies={displayedMovies}></MovieList>
            </Grid>
        </Grid>
    );
}

export default MovieListPageTemplate;
