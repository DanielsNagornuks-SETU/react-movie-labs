import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import ActorPage from "./pages/actorPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MoviesWatchlistPage from "./pages/moviesWatchlistPage";
import MovieReviewPage from "./pages/movieReviewPage";
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import TrendingMoviesPage from "./pages/trendingMoviesPage";
import NowPlayingMoviesPage from "./pages/nowPlayingMoviesPage";
import TopRatedMoviesPage from "./pages/topRatedMoviesPage";
import SiteHeader from './components/siteHeader'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 360000,
            refetchInterval: 360000,
            refetchOnWindowFocus: false
        },
    },
});

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <SiteHeader />
                <MoviesContextProvider>
                    <Routes>
                        <Route path="/reviews/form" element={<AddMovieReviewPage />} />
                        <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
                        <Route path="/movies/watchlist" element={<MoviesWatchlistPage />} />
                        <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
                        <Route path="/movies/trending" element={<TrendingMoviesPage />} />
                        <Route path="/movies/now_playing" element={<NowPlayingMoviesPage />} />
                        <Route path="/movies/top_rated" element={<TopRatedMoviesPage />} />
                        <Route path="/reviews/:id" element={<MovieReviewPage />} />
                        <Route path="/movies/:id" element={<MoviePage />} />
                        <Route path="/actors/:id" element={<ActorPage />} />
                        <Route path="/" element={<HomePage />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </MoviesContextProvider>
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};

const rootElement = createRoot(document.getElementById("root"))
rootElement.render(<App />);
