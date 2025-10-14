import { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";

function AddToFavoritesIcon({ movie }) {
    const context = useContext(MoviesContext);

    function handleAddToFavorites(e) {
        e.preventDefault();
        context.addToFavorites(movie);
    };

    return (
        <IconButton aria-label="add to favorites" onClick={handleAddToFavorites}>
            <FavoriteIcon color="primary" fontSize="large" />
        </IconButton>
    );
};

export default AddToFavoritesIcon;
