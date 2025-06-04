import React, { useEffect, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  colors,
  Toolbar,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import fetchModel from "../../lib/fetchModelData";
import "./styles.css";

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar({ user, setUser }) {
  const location = useLocation();
  const [photosUser, setPhotosUser] = useState(null);
  const navigate = useNavigate();
  const getUserIdFromPath = (pathname) => {
    const userDetailMatch = pathname.match(/\/users\/([^\/]+)/);
    const userPhotosMatch = pathname.match(/\/photos\/([^\/]+)/);
    if (userDetailMatch) return userDetailMatch[1];
    if (userPhotosMatch) return userPhotosMatch[1];
    return null;
  };

  const onLogout = async () => {
    const response = await fetch(
      "https://8rh2mw-3000.csb.app/api/admin/logout",
      {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      localStorage.removeItem("authToken");
      setUser(null);
      navigate("/login");
    }
  };

  useEffect(() => {
    const userId = getUserIdFromPath(location.pathname);
    if (userId) {
      fetchModel(`/user/${userId}`)
        .then((data) => {
          setPhotosUser(data);
        })
        .catch((err) => {
          console.error("Error fetching user in TopBar:", err);
          setPhotosUser(null);
        });
    } else {
      setPhotosUser(null);
    }
  }, [location]);
  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar style={{ display: "flex", alignItems: "center" }}>
        {user && (
          <Typography variant="h10" color="inherit">
            {/* Trần Trọng Dương - B22DCCN173 */}
            Hello {user.first_name} {user.last_name}
          </Typography>
        )}
        <div style={{ flexGrow: 1 }} />
        <Typography variant="h5" color={colors.orange[700]}>
          Photo Sharing Site{" "}
          {photosUser ? `${photosUser.first_name} ${photosUser.last_name}` : ""}
        </Typography>
        <div style={{ flexGrow: 1 }} />
        {user && (
          <Box>
            <Button variant="contained" color="primary" onClick={onLogout}>
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
