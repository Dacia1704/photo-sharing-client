import React from "react";
import { Typography } from "@mui/material";
import { Card, CardContent, Grid, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
import models from "../../modelData/models"; // Import models to fetch user data
import { useLocation } from "react-router-dom";
import "./styles.css";
import { useParams } from "react-router-dom";
import UserPhotos from "../UserPhotos";
import { useEffect } from "react";
import { useState } from "react";
import fetchModel from "../../lib/fetchModelData";
/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
    const { userId } = useParams();
    // const user = models.userModel(userId);

    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchModel(`/user/${userId}`)
            .then((data) => {
                setUser(data);
            })
            .catch((error) => {
                console.error("Failed to fetch user data", error);
            });
    }, [userId]);

    if (!user) {
        return <div>Loading user...</div>;
    }

    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="div">
                    {user != null ? user.first_name : ""} {user != null ? user.last_name : ""}
                </Typography>
                <Typography color="text.secondary">Location: {user.location}</Typography>
                <Typography>Description: {user.description}</Typography>
                <Typography>Occupation: {user.occupation}</Typography>
                <Typography variant="h6" component="div" style={{ marginTop: 16 }}>
                    Photos
                </Typography>
                <UserPhotos userId={userId} />
            </CardContent>
        </Card>
    );
}

export default UserDetail;
