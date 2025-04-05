import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

function Home() {
  return (
    <div style={homePageStyle}>
      <h1>Welcome to Our Recipe App!</h1>
      <p>Your one-stop shop for meal planning, recipe discovery, and more.</p>
    </div>
  );
  //   return (
  //     <Box
  //       sx={{
  //         minHeight: "100vh",
  //         minWidth: "100vw",
  //         display: "flex",
  //       }}
  //     >
  //       <Box sx={{ flex: 1, overflow: "auto" }}>
  //         <Outlet />
  //       </Box>
  //     </Box>
  //   );
}

export default Home;

const homePageStyle = {
  marginTop: "50px",
  minHeight: "100vh",
  minWidth: "100vw",
  display: "flex",
};
