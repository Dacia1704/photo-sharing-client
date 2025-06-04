import { Box, TextField, Button, Typography } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MuiLink from "@mui/material/Link";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Gọi callback truyền từ App
    const response = await fetch(
      "https://8rh2mw-3000.csb.app/api/admin/login",
      {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
      }
    );
    if (response.ok) {
      const data = await response.json();

      localStorage.setItem("authToken", data.token);

      if (onLogin) onLogin(data.user);
      navigate("/users");
    } else setError("Invalid username or password!");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: 300,
        margin: "0 auto",
        mt: 5,
      }}
    >
      <Typography variant="h5" align="center">
        Login
      </Typography>
      <TextField
        label="Username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && (
        <Typography variant="body2" align="center" color="red">
          Wrong username or password
        </Typography>
      )}
      <Button type="submit" variant="contained" color="primary">
        Login
      </Button>
      <Typography variant="body2" align="center">
        Don't have account?{" "}
        <MuiLink component={Link} to="/register" underline="hover">
          Register
        </MuiLink>
      </Typography>
    </Box>
  );
}

export default Login;
