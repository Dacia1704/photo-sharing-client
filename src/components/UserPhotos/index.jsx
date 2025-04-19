import React from "react";
import { Typography, Grid, Card, CardMedia, CardContent, Avatar, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import models from "../../modelData/models";
import "./styles.css";
import { useEffect, useState } from "react";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        // Fetch thông tin user
        fetchModel(`/user/${userId}`)
            .then((data) => {
                setUser(data);
            })
            .catch((error) => {
                console.error("Error fetching user:", error);
            });

        // Fetch danh sách ảnh
        fetchModel(`/photosOfUser/${userId}`)
            .then((data) => {
                setPhotos(data);
                console.log("Fetched photos:", data);
            })
            .catch((error) => {
                console.error("Error fetching photos:", error);
            });
    }, [userId]);

    if (!user) {
        return <Typography>User not found</Typography>;
    }

    return (
        <div>
            <Grid container spacing={2}>
                {photos.map((photo) => (
                    <Grid item xs={12} sm={6} md={4} key={photo._id}>
                        <Card>
                            <CardMedia component="img" height="200" image={require(`../../images/${photo.file_name}`)} alt={`Photo by ${user.first_name}`} />
                            <CardContent>
                                <Typography variant="subtitle2">{photo.date_time}</Typography>
                                {photo.comments &&
                                    photo.comments.map((comment) => (
                                        <Box key={comment._id} display="flex" alignItems="center" marginBottom={1}>
                                            <Avatar alt={comment.user.first_name} src={`/images/${comment.user.file_name}`} style={{ marginRight: 8 }} />
                                            <div>
                                                <Typography variant="caption" color="text.secondary">
                                                    {comment.user.first_name} - {comment.date_time}
                                                </Typography>
                                                <Typography variant="body2">{comment.comment}</Typography>
                                            </div>
                                        </Box>
                                    ))}
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default UserPhotos;
