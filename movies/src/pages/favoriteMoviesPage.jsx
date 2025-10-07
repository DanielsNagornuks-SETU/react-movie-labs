import React from "react";
import PageTemplate from "../components/templateMovieListPage";

function FavoriteMoviesPage(props) {
    const toDo = () => true;
    const movies = JSON.parse(localStorage.getItem("favorites"));

    return (
        <PageTemplate
            title="Favourite Movies"
            movies={movies}
            selectFavorite={toDo}
        />
    );
};

export default FavoriteMoviesPage;
