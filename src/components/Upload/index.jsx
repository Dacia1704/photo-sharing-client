import { Box, TextField, Button, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MuiLink from "@mui/material/Link";

function Upload() {
  const [selectedFile, setSelectedFile] = useState();
  const [log, setLog] = useState();
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);
    const token = localStorage.getItem("authToken");
    const response = await fetch(
      "https://8rh2mw-3000.csb.app/api/photosOfUser/new",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    if (response.ok) {
      console.log("Uploaded successfully");
    } else {
      const errorText = await response.text();
      console.error("Upload failed:", response.status, errorText);
    }
  };
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // justifyContent: "center",
        flex: 1,
        height: "100vh",
      }}
    >
      <input
        type="file"
        onChange={handleFileChange}
        style={{ marginBottom: 8, color: "primary" }}
      />
      <br />
      {log && (
        <Typography variant="h5" color={log.status ? "green" : "red"}>
          log.log
        </Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        disabled={!selectedFile}
        sx={{ marginBottom: 2, width: "200px" }}
      >
        Upload
      </Button>
    </Box>
  );
}

export default Upload;
