import { getPopularActors } from "../api/tmdb-api";
import PageTemplate from '../components/templateActorsPage';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../components/spinner';

function PopularActorsPage(props) {

    const { data, error, isPending, isError } = useQuery({
        queryKey: ['actors'],
        queryFn: getPopularActors,
    })

    if (isPending) {
        return <Spinner />
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }

    const actors = data.results;

    return (
        <PageTemplate
            title="Popular Actors"
            actors={actors}
        />
    );
};
export default PopularActorsPage;
