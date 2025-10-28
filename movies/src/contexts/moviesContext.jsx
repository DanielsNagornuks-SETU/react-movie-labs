import React, { useState } from "react";

export const MoviesContext = React.createContext(null);

function MoviesContextProvider(props) {
    const [favorites, setFavorites] = useState([]);
    const [watchList, setWatchlist] = useState([]);
    const [myReviews, setMyReviews] = useState({});

    function addToFavorites(movie) {
        let newFavorites = [];
        if (!favorites.includes(movie.id)) {
            newFavorites = [...favorites, movie.id];
        }
        else {
            newFavorites = [...favorites];
        }
        setFavorites(newFavorites);
    };

    function addToWatchlist(movie) {
        let newWatchList = [];
        if (!watchList.includes(movie.id)) {
            newWatchList = [...watchList, movie.id];
        }
        else {
            newWatchList = [...watchList];
        }
        setWatchlist(newWatchList);
    };

    // We will use this function in the next step
    function removeFromFavorites(movie) {
        setFavorites(favorites.filter(
            (mId) => mId !== movie.id
        ))
    };

    function removeFromWatchlist(movie) {
        setWatchlist(watchList.filter(
            (mId) => mId !== movie.id
        ))
    };

    function addReview(movie, review) {
        setMyReviews({ ...myReviews, [movie.id]: review })
    };

    return (
        <MoviesContext.Provider
            value={{
                favorites,
                watchList,
                addToFavorites,
                addToWatchlist,
                removeFromFavorites,
                removeFromWatchlist,
                addReview,
            }}
        >
            {props.children}
        </MoviesContext.Provider>
    );
};

export default MoviesContextProvider;
