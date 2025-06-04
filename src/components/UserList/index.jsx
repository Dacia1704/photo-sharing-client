import React from "react";
import {
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Box } from "@mui/material";
import "./styles.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserList, a React component of Project 4.
 */
function UserList() {
  // const users = models.userListModel();
  const [selectedFile, setSelectedFile] = useState();

  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchModel("/user/list")
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error fetching user list:", error);
      });
  }, []);

  const handleUpload = () => {
    navigate("/upload")
  };
  if (!users) {
    return <div>Loading user...</div>;
  }
  return (
    <div>
      <Box sx={{ width: "100%" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          sx={{ marginBottom: 2, width: "100%" }}
        >
          Upload File
        </Button>
      </Box>
      <Typography variant="h5" fontWeight="bold">
        User List
      </Typography>
      <List component="nav">
        {users.map((item) => (
          <React.Fragment key={item._id}>
            <ListItem button component={Link} to={`/users/${item._id}`}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <ListItemText primary={item.first_name} />
                {/* <Box sx={{ display: "flex", gap: 1 }}>
                  <Box
                    sx={{
                      position: "relative",
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      bgcolor: "green",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      fontSize: "16px",
                      userSelect: "none",
                    }}
                  >
                    {item.photo_number}
                  </Box>
                  <Box
                    sx={{
                      position: "relative",
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      bgcolor: "red",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      fontSize: "16px",
                      userSelect: "none",
                    }}
                  >
                    {item.comment_number}
                  </Box>
                </Box> */}
              </Box>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}

export default UserList;
