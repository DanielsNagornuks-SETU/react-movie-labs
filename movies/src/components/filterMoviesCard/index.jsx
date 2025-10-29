import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import img from '../../images/pexels-dziana-hasanbekava-5480827.jpg';
import { getGenres } from "../../api/tmdb-api";
import { useQuery } from '@tanstack/react-query';
import Spinner from '../spinner';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Slider from '@mui/material/Slider';
import Box from '@mui/material/Box'
import StarRateIcon from "@mui/icons-material/StarRate";

const formControl = {
    margin: 1,
    minWidth: "90%",
    backgroundColor: "rgb(255, 255, 255)"
};

export default function FilterMoviesCard(props) {

    const { data, error, isPending, isError } = useQuery({
        queryKey: ['genres'],
        queryFn: getGenres,
    });

    if (isPending) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    const genres = data.genres;
    if (genres[0].name !== "All") {
        genres.unshift({ id: "0", name: "All" });
    }

    const sortOptions = ["Alphabetically", "Release Date", "Rating"];

    let marks = []
    for (let i = 0; i <= 10; i++)
        marks[i] = { value: i, label: i }

    function handleChange(e, type, value) {
        props.onUserInput(type, value);
    };

    function handleTextChange(e) {
        handleChange(e, "name", e.target.value);
    };

    function handleGenreChange(e) {
        handleChange(e, "genre", e.target.value);
    };

    function handleSortChange(e) {
        handleChange(e, "sort", e.target.value);
    }

    function handleOrderChange(e) {
        handleChange(e, "order", e.target.checked);
    };

    function handleRatingChange(e) {
        handleChange(e, "rating", e.target.value);
    }

    return (
        <Card
            sx={{
                backgroundColor: "#1976d2",
                color: "#fbf3f5"
            }}
            variant="outlined">
            <CardContent>
                <Typography variant="h5" component="h1">
                    <SearchIcon fontSize="large" />
                    Filter the movies.
                </Typography>
                <TextField
                    sx={{ ...formControl }}
                    id="filled-search"
                    label="Search field"
                    type="search"
                    variant="filled"
                    value={props.titleFilter}
                    onChange={handleTextChange}
                />
                <TextField
                    sx={{ ...formControl }}
                    label="Genre"
                    labelId="genre-label"
                    defaultValue=""
                    select
                    value={props.genreFilter}
                    onChange={handleGenreChange}
                    variant="filled"
                >
                    {genres.map((genre) => {
                        return (
                            <MenuItem key={genre.id} value={genre.id}>
                                {genre.name}
                            </MenuItem>
                        );
                    })}
                </TextField>
                <TextField
                    sx={{ ...formControl }}
                    label="Sort"
                    labelId="sort-label"
                    defaultValue=""
                    select
                    value={props.sortOption}
                    onChange={handleSortChange}
                    variant="filled"
                >
                    {sortOptions.map((sortOption) => {
                        return (
                            <MenuItem key={sortOptions.indexOf(sortOption)} value={sortOptions.indexOf(sortOption)}>
                                {sortOption}
                            </MenuItem>
                        );
                    })}
                </TextField>
                <FormControlLabel
                    sx={{ ...formControl, color: "black" }}
                    control={<Checkbox
                        checked={props.sortOrder}
                        onChange={handleOrderChange} />}
                    label="Ascending Order"
                />
                <Box sx={{ ...formControl }}>
                    <Typography sx={{ color: "black", paddingTop: 0.5, paddingLeft: 1 }}>Rating <StarRateIcon sx={{fontSize: 15}}/></Typography>
                    <Box sx={{ paddingX: 2 }}>
                        <Slider
                            disableSwap
                            marks={marks}
                            step={1}
                            min={0}
                            max={10}
                            value={props.ratingRange}
                            onChange={handleRatingChange}
                        />
                    </Box>
                </Box>
            </CardContent>
            <CardMedia
                sx={{ height: 300 }}
                image={img}
                title="Filter"
            />
        </Card>
    );
}
