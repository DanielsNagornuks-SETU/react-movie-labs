import { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "@tanstack/react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from '../components/spinner'
import RemoveFromWatchlist from "../components/cardIcons/removeFromWatchlist";
import WriteReview from "../components/cardIcons/writeReview";

function MoviesWatchlistPage() {
    const { watchList: movieIds } = useContext(MoviesContext);

    // Create an array of queries and run in parallel.
    const moviesWatchlistQueries = useQueries({
        queries: movieIds.map((movieId) => {
            return {
                queryKey: ['movie', { id: movieId }],
                queryFn: getMovie,
            }
        })
    });

    // Check if any of the parallel queries is still loading.
    const isPending = moviesWatchlistQueries.find((m) => m.isPending === true);

    if (isPending) {
        return <Spinner />;
    }

    const movies = moviesWatchlistQueries.map((q) => {
        q.data.genre_ids = q.data.genres.map(g => g.id)
        return q.data
    });

    const toDo = () => true;

    return (
        <PageTemplate
            title="Movies Watchlist"
            movies={movies}
            action={(movie) => {
                return (
                    <>
                        <RemoveFromWatchlist movie={movie} />
                        <WriteReview movie={movie} />
                    </>
                );
            }}
        />
    );
};

export default MoviesWatchlistPage;
