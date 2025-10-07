export function getMovies() {
    return fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&page=1`
    )
        .then(res => res.json())
        .then(json => json.results);
};

export function getMovie(id) {
    return fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then(res => res.json());
};

export function getGenres() {
    return fetch(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
        import.meta.env.VITE_TMDB_KEY +
        "&language=en-US"
    )
        .then(res => res.json())
        .then(json => json.genres);
};

export function getMovieImages(id) {
    return fetch(
        `https://api.themoviedb.org/3/movie/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`
    )
        .then((res) => res.json())
        .then((json) => json.posters);
};
