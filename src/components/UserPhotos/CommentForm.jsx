import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";

const CommentForm = ({ photoId, onSubmit }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(photoId, comment);
    setComment("");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        margin: "0 auto",
        mt: 5,
        marginBottom: 3,
      }}
    >
      <Typography variant="h6">Comment</Typography>
      <TextField
        fullWidth
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
        sx={{ mb: 2 }}
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
};

// const CommentForm = ({ photoId, onSubmit }) => {
//   const [comment, setComment] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await onSubmit(photoId, comment);
//     setComment("");
//   };
//   return (
//     <Box component="form" onSubmit={handleSubmit}>
//       <Typography>Comment</Typography>
//       <TextField
//         value={comment}
//         onChange={(e) => setComment(e.target.value)}
//         required
//       />
//       <Button type="submit">Submit</Button>
//     </Box>
//   );
// };

export default CommentForm;
