import { Box } from "@mui/material";

import bgImage from "../../../assets/background.jpg";
import Header from "../header/Header";
import Sidebar from "../sidebar/Sidebar";

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
      }}
    >
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        <Sidebar />

        <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <Header title="Recipe Master" />
          <Box sx={{ flex: 1, overflow: "auto" }}>
            {"Content will display here"}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Background;
