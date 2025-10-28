import AddToWatchlistIcon from "../components/cardIcons/addToWatchlist";
import { getNowPlayingMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';

function NowPlayingMoviesPage(props) {

    const { data, error, isPending, isError } = useQuery({
        queryKey: ['playing'],
        queryFn: getNowPlayingMovies,
    })

    if (isPending) {
        return <Spinner />
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }

    const movies = data.results;

    return (
        <PageTemplate
            title="Now Playing Movies"
            movies={movies}
            action={(movie) => {
                return <AddToWatchlistIcon movie={movie} />
            }}
        />
    );
};
export default NowPlayingMoviesPage;
