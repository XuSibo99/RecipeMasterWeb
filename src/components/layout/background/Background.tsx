import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";
import bgImage from "../../../assets/background.jpg";

function Background() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        minWidth: "100vw",
        background: `
          linear-gradient(rgba(255,255,255,0.4), rgba(255,255,255,0.4)),
          url(${bgImage}) center / cover no-repeat
        `,
        display: "flex",
      }}
    >
      <Sidebar />

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Header title="Recipe Master" />

        <Box sx={{ flex: 1, overflow: "auto" }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default Background;
