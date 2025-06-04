import "./App.css";

import React, { useState } from "react";
import { Grid, Typography, Paper, Box } from "@mui/material";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  Navigate,
} from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";
import Register from "./components/Register";
import LoginToolBar from "./components/LoginToolBar";
import RegisterToolBar from "./components/RegisterToolBar";
import UserListOverview from "./components/UserListOverview";
import Upload from "./components/Upload";
const App = (props) => {
  const [user, setUser] = useState();
  return (
    <Router>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TopBar user={user} setUser={setUser} />
          </Grid>
          <div className="main-topbar-buffer" />
          <Grid item sm={3}>
            <Paper className="main-grid-item">
              <Routes>
                <Route
                  path="*"
                  element={
                    user ? (
                      <ProtectedRoute user={user}>
                        <UserList />
                      </ProtectedRoute>
                    ) : (
                      <Navigate to="/login" replace />
                    )
                  }
                />
                <Route
                  path="/login"
                  element={
                    <Box
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <LoginToolBar />
                    </Box>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <Box
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <RegisterToolBar />
                    </Box>
                  }
                />
                {/* <Route
                  path="/users"
                  element={
                    <ProtectedRoute user={user}>
                      <UserList />
                    </ProtectedRoute>
                  }
                /> */}
              </Routes>
            </Paper>
          </Grid>
          <Grid item sm={9}>
            <Paper className="main-grid-item">
              <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route
                  path="/users/:userId"
                  element={
                    <ProtectedRoute user={user}>
                      <UserDetail />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/photos/:userId"
                  element={
                    <ProtectedRoute user={user}>
                      <UserPhotos />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/users"
                  element={
                    <ProtectedRoute user={user}>
                      <UserListOverview />
                    </ProtectedRoute>
                  }
                />
                <Route path="/login" element={<Login onLogin={setUser} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/upload" element={<Upload />} />
              </Routes>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Router>
  );
};

export default App;
