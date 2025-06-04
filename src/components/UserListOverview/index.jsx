import { Box, Typography } from "@mui/material";

function UserListOverview() {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
      }}
    >
      <Typography variant="h4" align="center">
        Please choose a user in left toolbar to see user's photos
      </Typography>
    </Box>
  );
}
export default UserListOverview;
