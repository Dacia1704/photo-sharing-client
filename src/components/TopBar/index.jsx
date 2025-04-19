import React, { useEffect, useState } from "react";
import { AppBar, colors, Toolbar, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar() {
    const location = useLocation();
    const [user, setUser] = useState(null);

    const getUserIdFromPath = (pathname) => {
        const userDetailMatch = pathname.match(/\/users\/([^\/]+)/);
        const userPhotosMatch = pathname.match(/\/photos\/([^\/]+)/);
        if (userDetailMatch) return userDetailMatch[1];
        if (userPhotosMatch) return userPhotosMatch[1];
        return null;
    };

    useEffect(() => {
        const userId = getUserIdFromPath(location.pathname);
        if (userId) {
            fetchModel(`/user/${userId}`)
                .then((data) => {
                    setUser(data);
                })
                .catch((err) => {
                    console.error("Error fetching user in TopBar:", err);
                    setUser(null);
                });
        } else {
            setUser(null);
        }
    }, [location]);

    return (
        <AppBar className="topbar-appBar" position="absolute">
            <Toolbar style={{ display: "flex", alignItems: "center" }}>
                <Typography variant="h10" color="inherit">
                    Trần Trọng Dương - B22DCCN173
                </Typography>
                <div style={{ flexGrow: 1 }} />
                <Typography variant="h5" color={colors.orange[700]}>
                    Photo Sharing Site {user ? `${user.first_name} ${user.last_name}` : ""}
                </Typography>
                <div style={{ flexGrow: 1 }} />
            </Toolbar>
        </AppBar>
    );
}

export default TopBar;
