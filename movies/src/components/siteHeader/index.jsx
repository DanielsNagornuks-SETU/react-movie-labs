import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router";
import { styled } from '@mui/material/styles';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import MovieIcon from '@mui/icons-material/Movie';

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

function SiteHeader() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const navigate = useNavigate();

    const mainMenuOptions = [
        { label: "Home", path: "/" },
        { label: "Upcoming", path: "/movies/upcoming" },
        { label: "Trending", path: "/movies/trending" },
        { label: "Now Playing", path: "/movies/now_playing" },
        { label: "Top Rated", path: "/movies/top_rated" },
    ];

    const additionalMenuOptions = [
        { label: "Favorites", path: "/movies/favorites" },
        { label: "Playlist", path: "/movies/watchlist" }
    ];

    function handleMenuSelect(pageURL) {
        setAnchorEl(null);
        navigate(pageURL);
    };

    function handleMenu(event) {
        setAnchorEl(event.currentTarget);
    };

    return (
        <>
            <AppBar position="fixed">
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', padding: 0.5 }}>
                        TMDB Client
                    </Typography>
                    <Typography sx={{ flexGrow: 1 }}>
                        {isMobile ? (
                            <>
                                <IconButton
                                    aria-label="menu"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
                                    }}
                                    open={open}
                                    onClose={() => setAnchorEl(null)}
                                >
                                    {mainMenuOptions.map((opt) => (
                                        <MenuItem
                                            key={opt.label}
                                            onClick={() => handleMenuSelect(opt.path)}
                                        >
                                            {opt.label}
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </>
                        ) : (
                            <>
                                {mainMenuOptions.map((opt) => (
                                    <Button
                                        key={opt.label}
                                        color="inherit"
                                        onClick={() => handleMenuSelect(opt.path)}
                                    >
                                        {opt.label}
                                    </Button>
                                ))}
                            </>
                        )}
                    </Typography>
                    <Typography>
                        {additionalMenuOptions.map((opt) => (
                            <Button
                                key={opt.label}
                                color="inherit"
                                onClick={() => handleMenuSelect(opt.path)}
                            >
                                {opt.label}
                            </Button>
                        ))}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Offset />
        </>
    );
};

export default SiteHeader;
