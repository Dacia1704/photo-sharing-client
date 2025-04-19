import React from "react";
import { Divider, List, ListItem, ListItemText, Typography } from "@mui/material";

import "./styles.css";
import models from "../../modelData/models";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import fetchModel from "../../lib/fetchModelData";

/**
 * Define UserList, a React component of Project 4.
 */
function UserList() {
    // const users = models.userListModel();

    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetchModel("/user/list")
            .then((data) => {
                setUsers(data);
            })
            .catch((error) => {
                console.error("Error fetching user list:", error);
            });
    }, []);
    if (!users) {
        return <div>Loading user...</div>;
    }
    return (
        <div>
            <Typography variant="body1">
                This is the user list, which takes up 3/12 of the window. You might choose to use <a href="https://mui.com/components/lists/">Lists</a> and <a href="https://mui.com/components/dividers/">Dividers</a> to display your users like so:
            </Typography>
            <List component="nav">
                {users.map((item) => (
                    <React.Fragment key={item._id}>
                        <ListItem
                            button
                            component={Link}
                            to={`/users/${item._id}`} // Create the link to user detail
                        >
                            <ListItemText primary={item.first_name} />
                        </ListItem>
                        <Divider />
                    </React.Fragment>
                ))}
            </List>
            <Typography variant="body1">The model comes in from models.userListModel()</Typography>
        </div>
    );
}

export default UserList;
