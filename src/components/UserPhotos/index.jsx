import React from "react";
import {
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Avatar,
  Box,
  TextField,
  Button,
} from "@mui/material";
import { useParams } from "react-router-dom";
import "./styles.css";
import { useEffect, useState } from "react";
import fetchModel from "../../lib/fetchModelData";
import CommentForm from "./CommentForm";

/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [resetPage, setResetPage] = useState(true);
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
  }, [userId, resetPage]);

  if (!user) {
    return <Typography>User not found</Typography>;
  }

  const handleSubmit = async (photoId, commentText) => {
    const token = localStorage.getItem("authToken");
    const response = await fetch(
      `https://8rh2mw-3000.csb.app/api/photosOfUser/commentsOfPhoto/${photoId}`,
      {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ comment: commentText }),
      }
    );
    if (response.ok) {
      setResetPage((prev) => !prev);
    }

    // console.log(photoId + " " + commentText);
  };

  const onLikeClick = async () => {
    const token = localStorage.getItem("authToken");
  };

  return (
    <div>
      <Grid container spacing={2}>
        {photos.map((photo) => (
          <Grid item xs={12} sm={6} md={4} key={photo._id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                // image={require(`../../images/${photo.file_name}`)}
                image={`https://8rh2mw-3000.csb.app/api/images/${photo.file_name}`}
                alt={`Photo by ${user.first_name}`}
              />
              <CardContent>
                <Typography variant="subtitle2">
                  {new Date(photo.date_time).toLocaleString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Typography>
                <CommentForm photoId={photo._id} onSubmit={handleSubmit} />
                {photo.comments &&
                  photo.comments.map((comment) => (
                    <Box
                      key={comment._id}
                      display="flex"
                      // alignItems="center"
                      marginBottom={1}
                      sx={{
                        border: "1px solid",
                        borderColor: "grey.400",
                        borderRadius: 2,
                        padding: 1,
                      }}
                    >
                      <Avatar
                        alt={comment.user.first_name}
                        // src={`/images/${comment.user.file_name}`}
                        src={`https://8rh2mw-3000.csb.app/api/images/${comment.user.file_name}`}
                        style={{ margin: 8 }}
                      />
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          {comment.user.first_name} -{" "}
                          {new Date(comment.date_time).toLocaleString("vi-VN", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </Typography>
                        <Typography variant="body2">
                          {comment.comment}
                        </Typography>
                        <Button
                          fullWidth
                          variant="contained"
                          color="primary"
                          // onClick={onLikeClick(comment._id)}
                        >
                          Like
                        </Button>
                      </Box>
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
