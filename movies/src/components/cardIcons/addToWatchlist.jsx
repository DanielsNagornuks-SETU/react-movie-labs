import { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

function AddToWatchlistIcon({ movie }) {
    const context = useContext(MoviesContext);

    function handleAddToWatchlist(e) {
        e.preventDefault();
        context.addToWatchlist(movie);
    };

    return (
        <IconButton aria-label="add to watchlist" onClick={handleAddToWatchlist}>
            <PlaylistAddIcon color="primary" fontSize="large" />
        </IconButton>
    );
};

export default AddToWatchlistIcon;
